import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { data: bookings = [], isLoading, isError } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allBookings');
            return res.data;
        }
    });


    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | All Bookings</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">All Bookings</h1>
                <p className="text-center text-lg font-semibold">Total Bookings : {bookings.length}</p>
            </div>
            <div className="grid-cols-1 p-2 lg:p-10">
                {isLoading && <p className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', color: 'orange', animation: 'pulse 1.5s infinite' }}>Loading...</p>}
                {isError && <p className="text-red-600 font-bold text-center">Error fetching bookings</p>}
                {bookings.map((booking) => (
                    <div key={booking._id} className="card card-side bg-orange-100 shadow-xl my-5 h-56">
                        <figure><img className="hidden lg:block w-[500px]" src={booking.img} alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{booking.eventName}</h2>
                            <div className="badge badge-outline">{booking.eventType}</div>
                            <p><span className="font-bold">Email :</span> {booking.email}</p>
                            <p><span className="font-bold">Event Fee :</span> <span className="font-bold">$</span> {booking.eventFee}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/allBookings/${booking._id}`}>
                                    <button
                                        className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white"
                                    >
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBookings;