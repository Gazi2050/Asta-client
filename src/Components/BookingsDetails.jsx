import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const BookingsDetails = () => {
    const booking = useLoaderData();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const { _id, eventName, eventFee, img, eventType, serviceData, email } = booking;
    const [inputValue, setInputValue] = useState(0);
    const [eventDate, setEventDate] = useState(null);
    const [orderDate, setOrderDate] = useState(null);

    const cateringFee = Math.max(0, inputValue * serviceData.serviceFee_C);
    const hotelFee = Math.max(0, Math.ceil(inputValue / 2) * serviceData.serviceFee_H);
    const total = eventFee + serviceData.serviceFee_P + cateringFee + hotelFee;

    const isOrderButtonDisabled = inputValue <= 0 || !eventDate;

    const handleOrderSubmit = (e) => {
        e.preventDefault();

        // Check if the event date is selected
        if (!eventDate) {
            toast.error('Please select an event date');
            return;
        }

        // Get the current date and time
        const currentDate = new Date();

        // Manually format the date as MM/DD/YY
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = String(currentDate.getFullYear());

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = currentDate.toLocaleTimeString();

        // Calculate event date as 10 days after the current date
        const eventDateTime = new Date(currentDate);
        eventDateTime.setDate(currentDate.getDate() + 10);

        // Check if the selected event date is more than 10 days in the future
        if (new Date(eventDate) <= eventDateTime) {
            toast.error('Event date should be at least 11 days from the current date');
            return;
        }
        // Update state to store both input, event date, and order date
        setInputValue((prevInputValue) => Math.max(0, prevInputValue));
        setEventDate(eventDate);
        setOrderDate({
            date: formattedDate,
            time: formattedTime,
        });

        // Check if the same date already exists in the database
        fetch(`http://localhost:5000/orders?orderDate=${formattedDate}&email=${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.length > 0) {
                    // Date already exists, show a toast message
                    toast.error('You cannot order more than 1 in 24 hours');
                    navigate('/orders');
                } else {
                    // Date does not exist, proceed with order submission
                    const orderDetails = {
                        eventId: _id,
                        img: img,
                        eventName: eventName,
                        eventType: eventType,
                        email: email,
                        photographer: serviceData.serviceProvider_P,
                        hotel: serviceData.serviceProvider_H,
                        caterer: serviceData.serviceProvider_C,
                        photographerType: serviceData.type_P,
                        hotelType: serviceData.type_H,
                        catererType: serviceData.type_C,
                        eventFee: eventFee,
                        photographerFee: serviceData.serviceFee_P,
                        catererFee: cateringFee,
                        hotelFee: hotelFee,
                        guests: inputValue,
                        total: total,
                        orderDate: formattedDate,
                        orderTime: formattedTime,
                        eventDate: eventDate, // Keep the user-selected event date
                    };

                    console.log("Order Details:", orderDetails);

                    // Perform both POST and DELETE requests concurrently
                    Promise.all([
                        // POST request to add the order
                        fetch('http://localhost:5000/orders', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(orderDetails)
                        }),
                        // DELETE request to remove the booking
                        fetch(`http://localhost:5000/bookings/${_id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                    ])
                        .then(([orderRes, cancelRes]) => {
                            // Check the response of both requests
                            if (orderRes.ok && cancelRes.ok) {
                                return Promise.all([orderRes.json(), cancelRes.json()]);
                            } else {
                                throw new Error('Failed to process order or cancel booking');
                            }
                        })
                        .then(([orderData, cancelData]) => {
                            // Check the data returned from both requests
                            if (orderData.insertedId && cancelData.success) {
                                toast.success('Ordered successfully and booking canceled');
                                navigate('/bookings');
                            } else {
                                throw new Error('Failed to process order or cancel booking');
                            }
                        })
                        .catch((error) => {
                            console.error('Error processing order and canceling booking:', error);
                            toast.success('Ordered successfully');
                            navigate('/bookings');
                        });
                }
            })
            .catch((error) => {
                // Handle error fetching data from the server
                console.error('Error checking existing orders:', error);
            });
    };




    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cancel Booking!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
                            const remaining = bookings.filter((booking) => booking._id !== id);
                            setBookings(remaining);
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
                <title>Asta | Bookings</title>
            </Helmet>

            <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
                <form onSubmit={handleOrderSubmit}>
                    <div className="flex flex-col max-w-3xl mx-auto overflow-hidden">
                        <img src={img} alt="img" className="w-auto h-60 sm:h-96 dark:bg-gray-500 rounded-lg" />
                        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-orange-50 dark:bg-gray-900">
                            <div className="space-y-2">
                                <p className="text-2xl font-semibold sm:text-3xl">{eventName}</p>
                                <p className="text-xs dark:text-gray-400 badge">{eventType}</p>
                                <p className="font-bold">email : {email}</p>
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Service Providers</h1>
                                <p className="font-medium">Photographer: {serviceData.serviceProvider_P}</p>
                                <p className="font-medium">Hotel: {serviceData.serviceProvider_H}</p>
                                <p className="font-medium">Caterer: {serviceData.serviceProvider_C}</p>
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Service Types</h1>
                                <p className="font-medium">Photographer Type: {serviceData.type_P}</p>
                                <p className="font-medium">Hotel Type: {serviceData.type_H}</p>
                                <p className="font-medium">Caterer Type: {serviceData.type_C}</p>
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Service Fee</h1>
                                <p className="font-medium">Event Fee: ${eventFee}</p>
                                <p className="font-medium">Photographer Fee: ${serviceData.serviceFee_P}</p>
                                <p className="font-medium">
                                    Caterer Fee: ${cateringFee}{" "}
                                    <span className="m-2 text-gray-400 font-bold text-sm lg:text-base">Per Plate {serviceData.serviceFee_C}</span>
                                </p>
                                <p className="font-medium">
                                    Hotel Fee: ${hotelFee}{" "}
                                    <span className="m-2 text-gray-400 font-bold text-sm lg:text-base">Per 2 Persons {serviceData.serviceFee_H}</span>
                                </p>
                                <input
                                    className="bg-gray-50 mt-2 w-1/2 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                    type="number"
                                    value={inputValue}  // Make sure to bind the value to inputValue
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value, 10) || 0;
                                        setInputValue(Math.max(0, newValue));
                                    }}
                                />
                                <span className="m-2 text-gray-400 font-bold text-sm lg:text-base">Per Person</span>
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Event Date</h1>
                                <input
                                    className="bg-gray-50 mt-2 w-1/2 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                />
                            </div>
                            <div className="dark:text-gray-100">
                                <h1 className="text-xl font-bold">Summary</h1>
                                <p className="font-medium">Total: ${total}</p>
                                <p className="font-medium">Order Date: {orderDate ? orderDate.date : "N/A"}</p>
                                <p className="font-medium">Order Time: {orderDate ? orderDate.time : "N/A"}</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-1">
                            <button
                                className={`btn btn-sm md:btn-md lg:btn-md text-white ${isOrderButtonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-orange-600 hover:text-orange-600 hover:bg-white"}`}
                                type="submit"
                                disabled={isOrderButtonDisabled}
                            >
                                Order
                            </button>

                        </div>
                    </div>
                </form>
                <div className="flex justify-center mt-2">
                    <button onClick={() => handleDelete(_id)} className="btn btn-sm md:btn-md lg:btn-md text-white bg-red-600 hover:text-red-600 hover:bg-white">Cancel Booking</button>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default BookingsDetails;

/////////////////////Date-fns///////////////////////////////////////

// import { useState } from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import { format } from 'date-fns';

// const BookingsDetails = () => {
//     const booking = useLoaderData();
//     const [bookings, setBookings] = useState([]);
//     const navigate = useNavigate();
//     const { _id, eventName, eventFee, img, eventType, serviceData, email } = booking;
//     const [inputValue, setInputValue] = useState();
//     const [eventDate, setEventDate] = useState(null);
//     const [orderDate, setOrderDate] = useState(null);

//     const cateringFee = Math.max(0, inputValue * serviceData.serviceFee_C);
//     const hotelFee = Math.max(0, Math.ceil(inputValue / 2) * serviceData.serviceFee_H);
//     const total = eventFee + serviceData.serviceFee_P + cateringFee + hotelFee;

//     const isOrderButtonDisabled = inputValue <= 0 || !eventDate;

//     const handleOrderSubmit = (e) => {
//         e.preventDefault();

//         const currentDate = new Date();
//         const eventDateTime = new Date();
//         eventDateTime.setDate(eventDateTime.getDate() + 10);

//         if (new Date(eventDate) <= eventDateTime) {
//             toast.error('Event date should be at least 11 days from the current date');
//             return;
//         }

//         setInputValue((prevInputValue) => Math.max(0, prevInputValue));
//         setEventDate(eventDate);

//         const formattedDate = format(currentDate, 'yyyy-MM-dd');
//         const formattedTime = format(currentDate, 'HH:mm:ss');

//         setOrderDate({
//             date: formattedDate,
//             time: formattedTime,
//         });

//         fetch(`http://localhost:5000/orders?orderDate=${formattedDate}&email=${email}`, {
//             headers: {
//                 authorization: `Bearer ${localStorage.getItem('access-token')}`
//             }
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 if (data.length > 0) {
//                     toast.error('You cannot order more than 1 in 24 hours');
//                     navigate('/orders');
//                 } else {
//                     const orderDetails = {
//                         eventId: _id,
//                         img: img,
//                         eventName: eventName,
//                         eventType: eventType,
//                         email: email,
//                         photographer: serviceData.serviceProvider_P,
//                         hotel: serviceData.serviceProvider_H,
//                         caterer: serviceData.serviceProvider_C,
//                         photographerType: serviceData.type_P,
//                         hotelType: serviceData.type_H,
//                         catererType: serviceData.type_C,
//                         eventFee: eventFee,
//                         photographerFee: serviceData.serviceFee_P,
//                         catererFee: cateringFee,
//                         hotelFee: hotelFee,
//                         guests: inputValue,
//                         total: total,
//                         orderDate: formattedDate,
//                         orderTime: formattedTime,
//                         eventDate: eventDate,
//                     };

//                     console.log("Order Details:", orderDetails);

//                     Promise.all([
//                         fetch('http://localhost:5000/orders', {
//                             method: 'POST',
//                             headers: {
//                                 'content-type': 'application/json'
//                             },
//                             body: JSON.stringify(orderDetails)
//                         }),
//                         fetch(`http://localhost:5000/bookings/${_id}`, {
//                             method: 'DELETE',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                         })
//                     ])
//                         .then(([orderRes, cancelRes]) => {
//                             if (orderRes.ok && cancelRes.ok) {
//                                 return Promise.all([orderRes.json(), cancelRes.json()]);
//                             } else {
//                                 throw new Error('Failed to process order or cancel booking');
//                             }
//                         })
//                         .then(([orderData, cancelData]) => {
//                             if (orderData.insertedId && cancelData.success) {
//                                 toast.success('Ordered successfully and booking canceled');
//                                 navigate('/bookings');
//                             } else {
//                                 throw new Error('Failed to process order or cancel booking');
//                             }
//                         })
//                         .catch((error) => {
//                             console.error('Error processing order and canceling booking:', error);
//                             toast.success('Ordered successfully');
//                             navigate('/bookings');
//                         });
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error checking existing orders:', error);
//             });
//     };

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'You won\'t be able to revert this!',
//             icon: 'warning',
//             showCancelButton: true,
//             cancelButtonText: "No",
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Cancel Booking!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 fetch(`http://localhost:5000/bookings/${id}`, {
//                     method: 'DELETE'
//                 })
//                     .then((res) => res.json())
//                     .then((data) => {
//                         console.log(data);
//                         if (data.deletedCount > 0) {
//                             Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
//                             const remaining = bookings.filter((booking) => booking._id !== id);
//                             setBookings(remaining);
//                             navigate('/bookings');
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('Error deleting:', error);
//                         Swal.fire('Error', 'An error occurred while deleting.', 'error');
//                     });
//             }
//         });
//     };

//     return (
//         <div className="pt-20">
//             <Helmet>
//                 <title>Asta | Bookings</title>
//             </Helmet>

//             <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
//                 <form onSubmit={handleOrderSubmit}>
//                     <div className="flex flex-col max-w-3xl mx-auto overflow-hidden">
//                         <img src={img} alt="img" className="w-auto h-60 sm:h-96 dark:bg-gray-500 rounded-lg" />
//                         <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-orange-50 dark:bg-gray-900">
//                             <div className="space-y-2">
//                                 <p className="text-2xl font-semibold sm:text-3xl">{eventName}</p>
//                                 <p className="text-xs dark:text-gray-400 badge">{eventType}</p>
//                                 <p className="font-bold">email : {email}</p>
//                             </div>
//                             <div className="dark:text-gray-100">
//                                 <h1 className="text-xl font-bold">Service Providers</h1>
//                                 <p className="font-medium">Photographer: {serviceData.serviceProvider_P}</p>
//                                 <p className="font-medium">Hotel: {serviceData.serviceProvider_H}</p>
//                                 <p className="font-medium">Caterer: {serviceData.serviceProvider_C}</p>
//                             </div>
//                             <div className="dark:text-gray-100">
//                                 <h1 className="text-xl font-bold">Service Types</h1>
//                                 <p className="font-medium">Photographer Type: {serviceData.type_P}</p>
//                                 <p className="font-medium">Hotel Type: {serviceData.type_H}</p>
//                                 <p className="font-medium">Caterer Type: {serviceData.type_C}</p>
//                             </div>
//                             <div className="dark:text-gray-100">
//                                 <h1 className="text-xl font-bold">Service Fee</h1>
//                                 <p className="font-medium">Event Fee: ${eventFee}</p>
//                                 <p className="font-medium">Photographer Fee: ${serviceData.serviceFee_P}</p>
//                                 <p className="font-medium">
//                                     Caterer Fee: ${cateringFee}{" "}
//                                     <span className="m-2 text-gray-400 font-bold text-sm lg:text-base">Per Plate {serviceData.serviceFee_C}</span>
//                                 </p>
//                                 <p className="font-medium">
//                                     Hotel Fee: ${hotelFee}{" "}
//                                     <span className="m-2 text-gray-400 font-bold text-sm lg:text-base">Per 2 Persons {serviceData.serviceFee_H}</span>
//                                 </p>
//                                 <input
//                                     className="bg-gray-50 mt-2 w-1/2 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
//                                     type="number"
//                                     value={inputValue}
//                                     onChange={(e) => {
//                                         const newValue = parseInt(e.target.value, 10) || 0;
//                                         setInputValue(Math.max(0, newValue));
//                                     }}
//                                 />
//                                 <span className="m-2 text-gray-400 font-bold text-sm lg:text-base">Per Person</span>
//                             </div>
//                             <div className="dark:text-gray-100">
//                                 <h1 className="text-xl font-bold">Event Date</h1>
//                                 <input
//                                     className="bg-gray-50 mt-2 w-1/2 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
//                                     type="date"
//                                     value={eventDate}
//                                     onChange={(e) => setEventDate(e.target.value)}
//                                 />
//                             </div>
//                             <div className="dark:text-gray-100">
//                                 <h1 className="text-xl font-bold">Summary</h1>
//                                 <p className="font-medium">Total: ${total}</p>
//                                 <p className="font-medium">Order Date: {orderDate ? orderDate.date : "N/A"}</p>
//                                 <p className="font-medium">Order Time: {orderDate ? orderDate.time : "N/A"}</p>
//                             </div>
//                         </div>
//                         <div className="flex justify-center gap-1">
//                             <button
//                                 className={`btn btn-sm md:btn-md lg:btn-md text-white ${isOrderButtonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-orange-600 hover:text-orange-600 hover:bg-white"}`}
//                                 type="submit"
//                                 disabled={isOrderButtonDisabled}
//                             >
//                                 Order
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//                 <div className="flex justify-center mt-2">
//                     <button onClick={() => handleDelete(_id)} className="btn btn-sm md:btn-md lg:btn-md text-white bg-red-600 hover:text-red-600 hover:bg-white">Cancel Booking</button>
//                 </div>
//                 <Toaster
//                     position="top-right"
//                     reverseOrder={false}
//                 />
//             </div>
//         </div>
//     );
// };

// export default BookingsDetails;
