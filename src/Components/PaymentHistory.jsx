import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], isLoading, isError } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Payment History</title>
            </Helmet>
            <div>
                <div>
                    <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">Payment History</h1>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-gray-100 text-black">
                                <th className="md:w-1/4 lg:w-1/4">No.</th>
                                <th className="md:w-1/4 lg:w-1/4">Email</th>
                                <th className="md:w-1/4 lg:w-1/4">Transaction Id</th>
                                <th className="md:w-1/4 lg:w-1/4">Total fee</th>
                                <th className="md:w-1/4 lg:w-1/4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan="4" className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', color: 'orange', animation: 'pulse 1.5s infinite' }}>
                                        Loading...
                                    </td>
                                </tr>
                            )}
                            {isError && (
                                <tr>
                                    <td colSpan="4" className="text-red-600 font-bold text-center">
                                        Error fetching payments
                                    </td>
                                </tr>
                            )}
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td className="md:w-1/4 lg:w-1/4">{index + 1}</td>
                                    <td className="md:w-1/4 lg:w-1/4">{payment.email}</td>
                                    <td className="md:w-1/4 lg:w-1/4">{payment.transactionId}</td>
                                    <td className="md:w-1/4 lg:w-1/4"><span className="font-semibold">$</span><span>{payment.fee}</span></td>
                                    <td className="md:w-1/4 lg:w-1/4">{formatDate(payment.date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;