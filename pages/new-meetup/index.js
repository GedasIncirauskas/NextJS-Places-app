import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (data) => {
    try {
      await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.warn(error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Add new place</title>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
