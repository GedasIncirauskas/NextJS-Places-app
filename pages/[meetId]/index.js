import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupsDetails from "../../components/meetups/MeetupDetails";

const MeetupsDetail = ({ meetups }) => {
  const { image, title, address, description } = meetups;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupsDetails
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  try {
    const client = await MongoClient.connect(process.env.REACT_APP_DATABASE);
    const db = client.db();
    const meetupsCollections = db.collection("meetups");
    const results = await meetupsCollections.find({}, { _id: 1 }).toArray();
    client.close();
    return {
      fallback: "blocking",
      paths: results.map(({ _id }) => ({
        params: { meetId: _id.toString() },
      })),
    };
  } catch (error) {
    console.warn(error);
  }
};

export const getStaticProps = async (context) => {
  const id = context.params.meetId;

  try {
    const client = await MongoClient.connect(process.env.REACT_APP_DATABASE);
    const db = client.db();
    const meetupsCollections = db.collection("meetups");
    const { _id, title, description, address, image } =
      await meetupsCollections.findOne({ _id: ObjectId(id) });
    client.close();

    return {
      props: {
        meetups: {
          id: _id.toString(),
          title,
          description,
          address,
          image,
        },
      },
      revalidate: 10,
    };
  } catch (error) {
    console.warn(error);
  }
};

export default MeetupsDetail;
