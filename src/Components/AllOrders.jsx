import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const AllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: orders = [], isLoading, isError } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allOrders');
            return res.data;
        }
    });


    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | All Orders</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">All Orders</h1>
                <p className="text-center text-lg font-semibold">Total Orders : {orders.length}</p>
            </div>
            <div className="grid-cols-1 p-2 lg:p-10">
                {isLoading && <p className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', color: 'orange', animation: 'pulse 1.5s infinite' }}>Loading...</p>}
                {isError && <p className="text-red-600 font-bold text-center">Error fetching orders</p>}
                {orders.map((order) => (
                    <div key={order._id} className="card card-side bg-orange-100 shadow-xl my-5 h-56">
                        <figure><img className="hidden lg:block w-[500px]" src={order.img} alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{order.eventName}</h2>
                            <div className="badge badge-outline">{order.eventType}</div>
                            <p><span className="font-bold">Email :</span> {order.email}</p>
                            <p><span className="font-bold">Total Fee :</span> <span className="font-bold">$</span> {order.total}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/allOrders/${order._id}`}>
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

export default AllOrders;