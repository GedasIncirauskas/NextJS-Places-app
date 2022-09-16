import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Spinner from "../components/spinner/Spinner";

const HomePage = ({ meetups }) => {
  if (!meetups) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const client = await MongoClient.connect(process.env.REACT_APP_DATABASE);
    const db = client.db();
    const meetupsCollections = db.collection("meetups");
    const results = await meetupsCollections.find().toArray();
    client.close();

    return {
      props: {
        meetups: results.map(({ image, title, address, _id }) => ({
          id: _id.toString(),
          image,
          title,
          address,
        })),
      },
      revalidate: 1,
    };
  } catch (error) {
    console.warn(error);
  }
};
export default HomePage;
