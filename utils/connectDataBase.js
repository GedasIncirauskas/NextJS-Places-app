import { MongoClient } from "mongodb";

const ConnectDataBase = async (table) => {
  const client = await MongoClient.connect(process.env.REACT_APP_DATABASE);
  const db = client.db();
  const collection = db.collection(table);
  return { collection, client };
};

export default ConnectDataBase;
