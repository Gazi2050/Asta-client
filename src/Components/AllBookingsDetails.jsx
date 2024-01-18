import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllBookingsDetails = () => {
    const booking = useLoaderData();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allBookings');
            return res.data;
        }
    });
    const { _id, eventName, eventFee, img, eventType, serviceData, email } = booking;


    const handleDeleteEvent = async (booking) => {
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
                const res = await axiosSecure.delete(`/allBookings/${booking}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Booking has been deleted.",
                        icon: "success",
                    });
                    navigate('/allBookings');
                }
            }
        } catch (error) {
            console.error("Error deleting booking", error);
            // Handle error as needed
        }
    };


    return (
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
                        </div>
                        <div className="dark:text-gray-100">
                            <h1 className="text-xl font-bold">Service Providers</h1>
                            <p className="font-medium"><span className="font-bold">Photographer :</span> {serviceData.serviceProvider_P}</p>
                            <p className="font-medium"><span className="font-bold">Caterer :</span> {serviceData.serviceProvider_C}</p>
                            <p className="font-medium"><span className="font-bold">Hotel :</span> {serviceData.serviceProvider_H}</p>
                        </div>
                        <div className="dark:text-gray-100">
                            <h1 className="text-xl font-bold">Service Types</h1>
                            <p className="font-medium"><span className="font-bold">Photographer Type :</span> {serviceData.type_P}</p>
                            <p className="font-medium"><span className="font-bold">Caterer Type :</span> {serviceData.type_C}</p>
                            <p className="font-medium"><span className="font-bold">Hotel Type :</span> {serviceData.type_H}</p>
                        </div>


                    </div>
                </div>
                <div className="flex justify-center mt-2">
                    <button onClick={() => handleDeleteEvent(booking._id)} className="btn btn-sm md:btn-md lg:btn-md text-white bg-red-600 hover:text-red-600 hover:bg-white">Cancel Booking</button>
                </div>
            </div>
        </div>
    );
};

export default AllBookingsDetails;