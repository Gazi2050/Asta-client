import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllEvents = () => {
    const axiosSecure = useAxiosSecure();
    const { data: events = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['allEvents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allEvents');
            return res.data;
        }
    });

    const handleDeleteEvent = async (event) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/allEvents/${event}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Event has been deleted.",
                        icon: "success",
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting event", error);
            // Handle error as needed
        }
    };

    return (
        <div>
            <Helmet>
                <title>Asta | All Events</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">All Events</h1>
            </div>
            <div className="grid-cols-1 p-2 lg:p-10">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching events</p>}
                {events.map((event) => (
                    <div key={event._id} className="card card-side bg-orange-100 shadow-xl my-5 h-56">
                        <figure><img className="hidden lg:block" src={event.img} alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{event.eventName}</h2>
                            <div className="badge badge-outline">{event.eventType}</div>
                            <p>Fee : {event.eventFee}</p>
                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => handleDeleteEvent(event._id)}
                                    className="btn btn-sm md:btn-md lg:btn-md  text-white bg-red-600 hover:text-red-600 hover:bg-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;
