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
                path: '/addEvent',
                element: <PrivateRoute><AddEvent></AddEvent></PrivateRoute>,
            },
            {
                path: '/events',
                element: <Events></Events>,
                loader: () => fetch('http://localhost:5000/events') //
            },
            {
                path: '/checkOut/:id',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/events/${params.id}`) //
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
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/bookings',
                element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
            },
            {
                path: '/bookings/:id',
                element: <PrivateRoute><BookingsDetails></BookingsDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`) //
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>,

            },
            {
                path: '/orders/:id',
                element: <PrivateRoute><OrderDetails></OrderDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/orders/${params.id}`) //
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
                path: '/users',
                element: <></>
            },

        ]
    },
]);