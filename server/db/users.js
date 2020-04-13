const { v4: uuid } = require('uuid');
const users = doc => {
  const getUserByEmail = email => {
    const findExistingEmail = {
      TableName: 'users',
      Key: { email }
    };
    return doc.get(findExistingEmail).promise()
      .then(resp => {
        if (resp.Item && resp.Item.email === email) {
          return resp.Item;
        }
        return false;
      })
      .catch(err => new Error(`[DB/Users/getUserByEmail]: ${err}`));
  };
  const createUser = userData => {
    const id = uuid();
    const newUser = {
      TableName: 'users',
      Item: {
        ...userData,
        id
      }
    }
    return doc.put(newUser).promise()
      .then(() => newUser.Item)
      .catch(err => {
        throw new Error(`[DB/Users/getUserByEmail]: ${err}`);
      });
  };

  return ({
    getUserByEmail,
    createUser,
  });
}

module.exports = users;