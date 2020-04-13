const schema = {
  AttributeDefinitions: [
    {
      AttributeName: 'email',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'email',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'users',
  StreamSpecification: {
    StreamEnabled: false
  }
};

module.exports = schema;