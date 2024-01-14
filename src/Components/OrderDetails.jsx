import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
const OrderDetails = () => {
    const order = useLoaderData();
    const { _id, img, eventName, eventType, email, photographer, hotel, caterer, photographerType, hotelType, catererType, eventFee, photographerFee, catererFee, hotelFee, guests, total, orderDate, orderTime, eventDate } = order;
    console.log(order);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cancel Order!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/orders/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire('Canceled!', 'Your order has been canceled.', 'success');
                            const remaining = orders.filter((order) => order._id !== id);
                            setOrders(remaining);
                            navigate('/bookings');
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting:', error);
                        Swal.fire('Error', 'An error occurred while deleting.', 'error');
                    });
            }
        });
    };

    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Order Details</title>
            </Helmet>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-5 mx-auto lg:-mt-44">
                    <div className="lg:-mx-6 lg:flex lg:items-center">
                        <img className="hidden md:block lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]" src={img} alt="" />

                        <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-60">
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                                {eventName}
                            </h1>
                            <p className="badge badge-outline mt-2">{eventType}</p>

                            <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 mt-2">
                                Email : <span className="font-normal">{email}</span>
                            </p>
                            <p className="max-w-lg  text-gray-500 dark:text-gray-400 mt-2">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className="font-semibold mr-1">Guest :</span>{guests}<FaUserFriends className="mx-1 text-xl" />
                                </div>
                            </p>
                            <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 mt-2">
                                EventDate : <span className="font-normal">{eventDate}</span>
                            </p>
                            <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 mt-2">
                                OrderDate : <span className="font-normal">{orderDate}</span>
                            </p>
                            <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 mt-2">
                                OrderTime : <span className="font-normal">{orderTime}</span>
                            </p>

                            <div className="space-y-1">
                                <p className="max-w-lg text-xl font-semibold mt-6 text-black dark:text-gray-400 " >Service Providers:</p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Photographer : <span className="font-normal">{photographer}</span>
                                </p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Hotel : <span className="font-normal">{hotel}</span>
                                </p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Caterer : <span className="font-normal">{caterer}</span>
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="max-w-lg text-xl font-semibold mt-6 text-black dark:text-gray-400 " >Service Type:</p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Photographer Type : <span className="font-normal">{photographerType}</span>
                                </p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Hotel Type : <span className="font-normal">{hotelType}</span>
                                </p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Caterer Type : <span className="font-normal">{catererType}</span>
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="max-w-lg text-xl font-semibold mt-6 text-black dark:text-gray-400 " >Service Fee:</p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Event Fee : <span className="font-normal">$ {eventFee}</span>
                                </p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Photographer Fee : <span className="font-normal">$ {photographerFee}</span>
                                </p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Hotel Fee : <span className="font-normal">$ {hotelFee}</span>
                                </p>
                                <p className="max-w-lg font-semibold text-gray-500 dark:text-gray-400 ">
                                    Caterer Fee : <span className="font-normal">$ {catererFee}</span>
                                </p>
                            </div>
                            <div className="divider my-2"></div>
                            <p className="max-w-lg text-xl font-semibold text-gray-500 dark:text-gray-400 ">
                                Total : <span className="font-normal">$ {total}</span>
                            </p>
                            <div className="flex items-center justify-between mt-12 lg:justify-start">

                                <button onClick={() => handleDelete(_id)} className="btn btn-sm md:btn-md lg:btn-md text-white bg-red-600 hover:text-red-600 hover:bg-white">
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderDetails;