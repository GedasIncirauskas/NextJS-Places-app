import ConnectDataBase from "../../utils/connectDataBase";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { collection, client } = await ConnectDataBase("meetups");
      await collection.insertOne(data);
      client.close();

      res.status(201).json({ message: "Meetup inserted" });
    } catch (error) {
      console.warn(error);
      res.status(500).json({ message: "Meetup failed" });
    }
  }
};

export default handler;
