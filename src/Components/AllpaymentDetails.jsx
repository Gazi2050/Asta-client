import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllpaymentDetails = () => {
    const payment = useLoaderData();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['allPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allPayments');
            return res.data;
        }
    });
    const { _id, email, fee, transactionId, date, orderIds, eventIds, status } = payment;

    //console.log(payments);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const handleDeletePaymentHistory = async (payment) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!",
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/allPayments/${payment}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Payment History has been removed.",
                        icon: "success",
                    });
                    navigate('/allPayments');
                }
            }
        } catch (error) {
            console.error("Error deleting payment history", error);
            // Handle error as needed
        }
    };

    return (
        <div>
            <div className="pt-20">
                <div className=" mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
                    <div className="flex flex-col max-w-3xl mx-auto ">
                        <div className="p-5 mx-auto  lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-orange-50 dark:bg-gray-900">
                            <div className="space-y-4 p-5">
                                <div className="flex justify-end w-auto">
                                    <span className="border-2 rounded-md text-green-600 font-semibold border-green-600 px-1 py-1/2">{status}</span>
                                </div>
                                <p className="text-xs dark:text-gray-400 badge">{formatDate(date)}</p>
                                <p className="font-bold">Email : {email}</p>
                                <p className="font-bold">Total Fee : <span className="font-bold">$</span> {fee}</p>
                                <p className="font-bold">Transaction Id : <span className="text-violet-600 text-sm lg:text-base">{transactionId}</span></p>
                                <ul className="font-bold">
                                    <p>Order Id:</p>
                                    {orderIds.map((orderId) => (
                                        <li key={orderId} className="text-violet-600">{orderId}</li>
                                    ))}
                                </ul>
                                <ul className="font-bold">
                                    <p>Event Id:</p>
                                    {eventIds.map((eventId) => (
                                        <li key={eventId} className="text-violet-600">{eventId}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button onClick={() => handleDeletePaymentHistory(payment._id)} className="btn btn-sm md:btn-md lg:btn-md text-white bg-red-600 hover:text-red-600 hover:bg-white">Event completed</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllpaymentDetails;