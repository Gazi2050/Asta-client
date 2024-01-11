import { Helmet } from "react-helmet-async";
import OrderCard from "./OrderCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const url = `http://localhost:5000/orders?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
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