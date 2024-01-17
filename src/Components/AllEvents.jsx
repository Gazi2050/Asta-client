import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
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
        <div className="pt-20">
            <Helmet>
                <title>Asta | All Events</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">All Events</h1>
                <p className="text-center text-lg font-semibold">Total Events : {events.length}</p>
            </div>
            <div className="grid-cols-1 p-2 lg:p-10">
                {isLoading && <p className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', color: 'orange', animation: 'pulse 1.5s infinite' }}>Loading...</p>}
                {isError && <p className="text-red-600 font-bold text-center">Error fetching events</p>}
                {events.map((event) => (
                    <div key={event._id} className="card card-side bg-orange-100 shadow-xl my-5 h-56">
                        <figure><img className="hidden lg:block w-[500px]" src={event.img} alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{event.eventName}</h2>
                            <div className="badge badge-outline">{event.eventType}</div>
                            <p><span className="font-bold">Event Fee :</span> {event.eventFee}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/allEvents/${event._id}`}>
                                    <button
                                        className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white"
                                    >
                                        Update
                                    </button>
                                </Link>
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
