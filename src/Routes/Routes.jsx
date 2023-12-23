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
                element: <Events></Events>
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
                path: '/catering',
                element: <></>
            },
            {
                path: '/photography',
                element: <></>
            },
            {
                path: '/users',
                element: <></>
            },

        ]
    },
]);