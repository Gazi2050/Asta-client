import { Helmet } from "react-helmet-async";
import OrderCard from "./OrderCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const url = `https://asta-server-three.vercel.app/orders?email=${user?.email}`;

    useEffect(() => {
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [url])


    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Orders</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">Your Orders</h1>
                <p className="text-lg font-bold text-center pb-5">Orders: {orders.length}</p>
                <div className="flex justify-center space-x-4">
                    <div>
                        <p className="text-lg font-bold text-center">Total Fee: $ {orders.total}</p>
                    </div>
                    <div className="flex justify-center mb-2 lg:-mt-3 md:-mt-3">
                        {orders.length ?
                            <Link to={'/payment'}>
                                <button className="btn btn-sm md:btn-md lg:btn-md text-white bg-orange-600 hover:text-orange-600 hover:bg-white">Pay</button>
                            </Link>
                            :
                            <button disabled className="btn btn-sm md:btn-md lg:btn-md text-white bg-orange-600 hover:text-orange-600 hover:bg-white">Pay</button>
                        }
                    </div>
                </div>
            </div>
            <div className="lg:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    orders.map(orderItem => <OrderCard
                        key={orderItem._id}
                        orderItem={orderItem}
                    ></OrderCard>)
                }

            </div>
        </div>
    );
};

export default Orders;