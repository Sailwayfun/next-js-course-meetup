import MeetupList from "../components/meetups/MeetupList";
import DBConnection from "./api/DBConnection";
import Head from "next/head";
// import {useEffect, useState} from "react";

function Homepage(props) {
    // const [loadedMeetups, SetLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     ///sending request to the backend
    //     SetLoadedMeetups(dummyMeetupData);
    // },[])
    return <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" 
            content="Browse a huge list of highly active React meetups!"/>
        </Head>
        <MeetupList meetups={props.meetups} />

    </>
}

export async function getStaticProps() {
    const { meetupsCollection, client } = await DBConnection();
    console.log(meetupsCollection);
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    //fetch data from some API
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}

// export function getServerSideProps (context) {
//     const req = context.req;
//     const res = context.res;
//     ///fetch data from some API
//     return {
//         props: {
//             meetups: dummyMeetupData
//         }
//     }
// }

export default Homepage;