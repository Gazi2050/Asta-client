import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllpaymentDetails = () => {
    const payment = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
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

                </div>
            </div>
        </div>
    );
};

export default AllpaymentDetails;