const dynalite = require('dynalite');
const connDetails = new URL(process.env.DYNALITE_ADDRESS)
dynalite({
  path: './.db'
}).listen(connDetails.port, connDetails.hostname, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Dynalite listening on ${process.env.DYNALITE_ADDRESS}`);
});

