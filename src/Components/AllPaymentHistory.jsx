import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllPaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], isLoading, isError } = useQuery({
        queryKey: ['allPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allPayments');
            return res.data;
        }
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    // Filter payments that have the 'fee' property, and then calculate the total fee
    const totalFee = payments.filter(payment => payment.fee !== undefined).reduce((acc, payment) => acc + payment.fee, 0);

    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | All Payments</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">All Payments</h1>
                <p className="text-center text-lg font-semibold">Total Payments: {payments.length}</p>
                <p className="text-lg font-bold text-center">Total Amount: $ {totalFee.toFixed(2)}</p>
            </div>
            <div className="grid-cols-1 p-2 lg:p-10">
                {isLoading && <p className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', color: 'orange', animation: 'pulse 1.5s infinite' }}>Loading...</p>}
                {isError && <p className="text-red-600 font-bold text-center">Error fetching payments</p>}
                {payments.map((payment) => (
                    <div key={payment._id} className="card card-side bg-orange-100 shadow-xl my-5 h-56">
                        <div className="card-body">
                            <h2 className="card-title">Transaction Id : <span className="text-violet-600">{payment.transactionId}</span></h2>
                            <div className="badge badge-outline">{formatDate(payment.date)}</div>
                            <p><span className="font-bold">Email :</span> {payment.email}</p>
                            <p><span className="font-bold">Total Fee :</span> <span className="font-bold">$</span> {payment.fee}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/allPayments/${payment._id}`}>
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

export default AllPaymentHistory;
