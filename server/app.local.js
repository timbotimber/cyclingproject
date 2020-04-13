require('dotenv').config();
const util             = require('util');
const AWS              = require('aws-sdk');
const { createServer } = require('dynamodb-admin');
const { db }           = require('./db');
const app              = require('./app');
const models           = require('./models');

// Have to bind otherwise this isn't point to active dynamodb
const asyncGetTableList = util.promisify(db.listTables.bind(db));

const dynClient = new AWS.DynamoDB.DocumentClient({ service: db });
const dynsAdminApp = createServer(db, dynClient);
const dynaAdminServer = dynsAdminApp.listen(process.env.DYNA_ADMIN_PORT);


asyncGetTableList()
  .then(async resp => {
    const table_schemas = Object.values(models);
    for (ts of table_schemas) {
      if (!resp.TableNames.includes(ts.TableName)) {
        db.createTable(ts, (err, data) => {
          if (err) {
            return console.log(err);
          }
          console.log(`Created table: ${data.TableDescription.TableName}`);
        })
      }
    }
  });


dynaAdminServer.on('listening', () => {
  const address = dynaAdminServer.address();
  console.log(`Dyna Admin listening on http://0.0.0.0:${address.port}`);
});
app.listen(process.env.PORT, () => {
  console.log(`Express server listening to: http://127.0.0.1:${process.env.PORT}`);
});