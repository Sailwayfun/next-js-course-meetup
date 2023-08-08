//our-domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
function NewMeetup() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch("/api/new-meetup",
            {
                method: "POST",
                body: JSON.stringify(enteredMeetupData),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        const data = await response.json();
        console.log(data);
        router.push("/");
        
        // console.log(enteredMeetupData);

    }
    return <>
        <Head>
            <title>Add a Meetup</title>
            <meta name="description" content="Add your favorite new React meetups!"/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
}
export default NewMeetup;