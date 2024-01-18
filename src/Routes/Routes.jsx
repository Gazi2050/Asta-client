import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Components/Home";
import Gallery from "../Components/Gallery";
import Events from "../Components/Events";
import SignUp from "../Components/SignUp";
import LogIn from "../Components/LogIn";
import ErrorElement from "../Components/ErrorElement";
import Profile from "../Components/Profile";
import Bookings from "../Components/Bookings";
import PrivateRoute from "./PrivateRoute";
import CatererSignUp from "../Components/CatererSignUp";
import PhotographerSignUp from "../Components/PhotographerSignUp";
import HotelSignUp from "../Components/HotelSignUp";
import CheckOut from "../Components/CheckOut"
import Orders from "../Components/Orders";
import BookingsDetails from "../Components/BookingsDetails";
import OrderDetails from "../Components/OrderDetails";
import AddEvent from "../Components/AddEvent";
import AllUsers from "../Components/AllUsers";
import AllEvents from "../Components/AllEvents";
import AllBookings from "../Components/AllBookings";
import AllOrders from "../Components/AllOrders";
import AllBookingsDetails from "../Components/AllBookingsDetails";
import AllOrdersDetails from "../Components/Allordersdetails";
import Payment from "../Components/Payment";
import PaymentHistory from "../Components/PaymentHistory";
import AllPaymentHistory from "../Components/AllPaymentHistory";
import AllpaymentDetails from "../Components/AllpaymentDetails";
import AllEventsDetails from "../Components/AllEventsDetails";
import Inbox from "../Components/Inbox";
import InboxDetails from "../Components/InboxDetails";

export const router = createBrowserRouter([

    {
        path: "/",
        errorElement: <ErrorElement></ErrorElement>,
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/gallery',
                element: <Gallery></Gallery>
            },
            {
                path: '/events',
                element: <Events></Events>,
                loader: () => fetch('https://asta-server-three.vercel.app/events') //
            },
            {
                path: '/checkOut/:id',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                loader: ({ params }) => fetch(`https://asta-server-three.vercel.app/events/${params.id}`) //
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/logIn',
                element: <LogIn></LogIn>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: '/bookings',
                element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
            },
            {
                path: '/bookings/:id',
                element: <PrivateRoute><BookingsDetails></BookingsDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://asta-server-three.vercel.app/bookings/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }) //
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>,

            },
            {
                path: '/orders/:id',
                element: <PrivateRoute><OrderDetails></OrderDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://asta-server-three.vercel.app/orders/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }) //
            },
            {
                path: '/catering',
                element: <CatererSignUp></CatererSignUp>
            },
            {
                path: '/photography',
                element: <PhotographerSignUp></PhotographerSignUp>
            },
            {
                path: '/hotel',
                element: <HotelSignUp></HotelSignUp>
            },
            {
                path: '/payment',
                element: <Payment></Payment>
            },
            {
                path: '/paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            //admin routes
            {
                path: '/allUsers',
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>,
            },
            {
                path: '/addEvent',
                element: <PrivateRoute><AddEvent></AddEvent></PrivateRoute>,
            },
            {
                path: '/allEvents',
                element: <PrivateRoute><AllEvents></AllEvents></PrivateRoute>,
            },
            {
                path: '/allEvents/:id',
                element: <PrivateRoute><AllEventsDetails></AllEventsDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://asta-server-three.vercel.app/allEvents/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }) //
            },
            {
                path: '/allBookings',
                element: <PrivateRoute><AllBookings></AllBookings></PrivateRoute>,
            },
            {
                path: '/allBookings/:id',
                element: <PrivateRoute><AllBookingsDetails></AllBookingsDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://asta-server-three.vercel.app/allBookings/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }) //
            },
            {
                path: '/allOrders',
                element: <PrivateRoute><AllOrders></AllOrders></PrivateRoute>,
            },
            {
                path: '/allOrders/:id',
                element: <PrivateRoute><AllOrdersDetails></AllOrdersDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://asta-server-three.vercel.app/allOrders/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }) //
            },
            {
                path: '/allPayments',
                element: <PrivateRoute><AllPaymentHistory></AllPaymentHistory></PrivateRoute>,
            },
            {
                path: '/allPayments/:id',
                element: <PrivateRoute><AllpaymentDetails></AllpaymentDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://asta-server-three.vercel.app/allPayments/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }) //
            },
            {
                path: '/inbox',
                element: <PrivateRoute><Inbox></Inbox></PrivateRoute>
            },
            {
                path: '/inbox/:id',
                element: <PrivateRoute><InboxDetails></InboxDetails></PrivateRoute>
            }
        ]
    },
]);