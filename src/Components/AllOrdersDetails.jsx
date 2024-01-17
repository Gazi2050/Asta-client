import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserFriends } from "react-icons/fa";

const AllOrdersDetails = () => {
    const order = useLoaderData();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allOrders');
            return res.data;
        }
    });
    const { _id, eventName, eventFee, img, eventType, email, photographer, caterer, hotel, photographerType, catererType, hotelType, photographerFee, catererFee, hotelFee, guests, total, orderDate, orderTime, eventDate } = order;

    //console.log(order);
    const handleDeleteEvent = async (order) => {
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
                const res = await axiosSecure.delete(`/allOrders/${order}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Booking has been deleted.",
                        icon: "success",
                    });
                    navigate('/allOrders');
                }
            }
        } catch (error) {
            console.error("Error deleting event", error);
            // Handle error as needed
        }
    };
    return (
        <div>
            <div className="pt-20">
                <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
                    <div className="flex flex-col max-w-3xl mx-auto overflow-hidden">
                        <img src={img} alt="img" className="w-auto h-60 sm:h-96 dark:bg-gray-500 rounded-lg" />
                        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-orange-50 dark:bg-gray-900">
                            <div className="space-y-2">
                                <p className="text-2xl font-semibold sm:text-3xl">{eventName}</p>
                                <p className="text-xs dark:text-gray-400 badge">{eventType}</p>
                                <p className="font-bold">Email : {email}</p>
                                <p className="font-bold">Event Fee : <span className="font-bold">$</span> {eventFee}</p>
                                <p className="font-bold">Photographer Fee : <span className="font-bold">$</span> {photographerFee}</p>
                                <p className="font-bold">Caterer Fee : <span className="font-bold">$</span> {catererFee}</p>
                                <p className="font-bold">Hotel Fee : <span className="font-bold">$</span> {hotelFee}</p>
                                <p className="font-bold">Total Fee : <span className="font-bold">$</span> {total}</p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className="font-semibold mr-1">Guest : {guests}</span><FaUserFriends className="mx-1 text-xl" />
                                </div>
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Service Providers</h1>
                                <p className="font-medium"><span className="font-bold">Photographer :</span> {photographer}</p>
                                <p className="font-medium"><span className="font-bold">Caterer :</span> {caterer}</p>
                                <p className="font-medium"><span className="font-bold">Hotel :</span> {hotel}</p>
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Service Types</h1>
                                <p className="font-medium"><span className="font-bold">Photographer Type :</span> {photographerType}</p>
                                <p className="font-medium"><span className="font-bold">Caterer Type :</span> {catererType}</p>
                                <p className="font-medium"><span className="font-bold">Hotel Type :</span> {hotelType}</p>
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Order Summary</h1>
                                <p className="font-medium"><span className="font-bold">Order Date :</span> {orderDate}</p>
                                <p className="font-medium"><span className="font-bold">Order Time :</span> {orderTime}</p>
                                <p className="font-medium"><span className="font-bold">Event Date :</span> {eventDate}</p>
                            </div>


                        </div>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button onClick={() => handleDeleteEvent(order._id)} className="btn btn-sm md:btn-md lg:btn-md text-white bg-red-600 hover:text-red-600 hover:bg-white">Cancel Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllOrdersDetails;