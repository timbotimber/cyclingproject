require('dotenv').config();
const util = require('util');
const AWS = require('aws-sdk');
const { createServer } = require('dynamodb-admin');
const dynamodb = require('./db');
const app = require('./app');
const models = require('./models');

// Have to bind otherwise this isn't point to active dynamodb
const asyncGetTableList = util.promisify(dynamodb.listTables.bind(dynamodb));

const dynClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });
const dynsAdminApp = createServer(dynamodb, dynClient);
const dynaAdminServer = dynsAdminApp.listen(process.env.DYNA_ADMIN_PORT);


asyncGetTableList()
  .then(async resp => {
    if (resp.TableNames.length <= 0) {
      const table_schemas = Object.values(models);
      for (ts of table_schemas) {
        dynamodb.createTable(ts, (err) => {
          if (err) {
            return console.log(err);
          }
          console.log(ts.TableName);
        })
      }
    }
  });



dynaAdminServer.on('listening', () => {
  const address = dynaAdminServer.address();
  console.log(`Dyna Admin listening on http://0.0.0.0:${address.port}\n`);
});
app.listen(process.env.PORT, () => {
  console.log(`Express server listening to: ${process.env.PORT}`);
});