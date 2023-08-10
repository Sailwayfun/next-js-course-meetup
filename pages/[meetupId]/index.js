import MeetUpDetail from "../../components/meetups/MeetupDetail";
import DBConnection from "../api/DBConnection";
import { ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
    return <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description} />
        </Head>
        <MeetUpDetail image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </>
}

export async function getStaticPaths() {
    const { meetupsCollection, client } = await DBConnection();
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: "blocking",
        paths: (meetups).map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))

    }
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;
    const { meetupsCollection, client } = await DBConnection();
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
                address: selectedMeetup.address
            }
        }
    }
}

export default MeetupDetails;
