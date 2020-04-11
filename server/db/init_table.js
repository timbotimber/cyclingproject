const db = require('.')

db.createTable(params, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});