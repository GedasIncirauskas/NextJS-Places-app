import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const client = await MongoClient.connect(process.env.REACT_APP_DATABASE);
      const db = client.db();
      const meetupsCollections = db.collection("meetups");
      const result = await meetupsCollections.insertOne(data);
      console.log(result);
      client.close();

      res.status(201).json({ message: "Meetup inserted" });
    } catch (error) {
      console.warn(error);
      res.status(500).json({ message: "Meetup failed" });
    }
  }
};

export default handler;
