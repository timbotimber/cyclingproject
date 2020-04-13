# Sykkel

The app is split in to 2 parts.  
The frontend client and the server part.  

## Server
The server is an express app that has a lambda wrapper to run in AWS lambda and talk to DynamoDB.  

### To run
1. `cd server`
2. `npm i`
3. `npm run dev`

This will run the express app and the local dynamodb server.  
The express app is exposed on port 5000, to access the dynamodb admin page go to `http://127.0.0.1:8001`
