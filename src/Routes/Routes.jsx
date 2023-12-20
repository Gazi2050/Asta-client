import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Components/Root";

export const router = createBrowserRouter([
    {
        path: "/",
        // errorElement: <ErrorElement></ErrorElement>,
        element: <Root></Root>,
        children: [
            // {
            //     path: '/',
            //     element: <Home></Home>
            // },

        ]
    },
]);