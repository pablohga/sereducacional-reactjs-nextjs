import dbConnect from './db';

async function login(email, password) {
  const { db } = await dbConnect();

  const user = {
    email: email,
    password: password
  };
  const collection = db.collection('clients');
  const response = collection.findOne(user);

  return response;
}

export default login();
