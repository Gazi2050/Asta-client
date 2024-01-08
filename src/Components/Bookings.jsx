import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import BookingsCard from "./BookingsCard";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url])

    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Bookings</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">Your Bookings</h1>
            </div>
            <div className="grid-cols-1 p-2 lg:p-10">
                {
                    bookings.map(booking => <BookingsCard
                        key={booking._id}
                        booking={booking}
                    ></BookingsCard>)
                }

            </div>
        </div>
    );
};

export default Bookings;
