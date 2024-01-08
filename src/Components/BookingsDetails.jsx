import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const BookingsDetails = () => {
    const checkout = useLoaderData();
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const { _id, eventName, eventFee, img, eventType, serviceData, email } = checkout;
    console.log(checkout);
    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Bookings {_id}</title>
            </Helmet>
            <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
                <div className="flex flex-col max-w-3xl mx-auto overflow-hidden">
                    <img src={img} alt="img" className="w-auto h-60 sm:h-96 dark:bg-gray-500 rounded-lg" />
                    <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-orange-50 dark:bg-gray-900">
                        <div className="space-y-2">
                            <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">{eventName}</a>
                            <p className="text-xs dark:text-gray-400">{eventType}
                            </p>
                            <p className="font-bold">email : {email}</p>



                        </div>
                        <div className="dark:text-gray-100">
                            <h1 className="text-xl font-bold">Service Providers</h1>
                            <p className="font-medium">Photographer Fee: ${serviceData.serviceFee_P}</p>
                            <p className="font-medium">Hotel Fee: ${serviceData.serviceFee_H}</p>
                            <p className="font-medium">Caterer Fee: ${serviceData.serviceFee_C}</p>
                        </div>
                        <div className="dark:text-gray-100">
                            <h1 className="text-xl font-bold">Service Fee</h1>
                            <p className="font-medium">Event Fee: ${eventFee}</p>
                            <p className="font-medium">Photographer Fee: ${serviceData.serviceFee_P}</p>
                            <p className="font-medium">Hotel Fee: ${serviceData.serviceFee_H}</p>
                            <p className="font-medium">Caterer Fee: ${serviceData.serviceFee_C}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingsDetails;