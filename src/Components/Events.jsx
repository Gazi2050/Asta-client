import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import EventCard from "./EventCard";


const Events = () => {
    const events = useLoaderData();
    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Events</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">Explore Our Events</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {
                    events.map(eventItem => <EventCard
                        key={eventItem._id}
                        eventItem={eventItem}
                    ></EventCard>)
                }

            </div>
        </div>
    );
};

export default Events;