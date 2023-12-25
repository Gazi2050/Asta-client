

import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";


const CheckOut = () => {
    const checkout = useLoaderData();
    const { _id, eventName, eventFee, img, description, eventType } = checkout;



    const handleSubmit = (e) => {
        e.preventDefault();
        const booking = { _id, eventName, eventFee, img, description, eventType };
        console.log(booking);
        // You can do something with the booking data here
    };

    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | CheckOut {_id}</title>
            </Helmet>
            <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold pt-2">CheckOut</h1>
            <form onSubmit={handleSubmit}>
                <section className="bg-white dark:bg-gray-900">
                    <div className="container px-6 pt-2 pb-4 mx-auto">
                        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={img} alt="image" name='img' />

                            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                                <p className="text-sm text-orange-600 uppercase badge badge-outline" name='eventType'>{eventType}</p>

                                <p className="block mt-4 text-2xl font-semibold text-gray-800 dark:text-white" name='eventName'>
                                    {eventName}
                                </p>

                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm" name='description'>
                                    {description}
                                </p>
                                <div className="pt-5">
                                    <p className="text-2xl font-semibold" name='eventFee'>$ {eventFee}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex justify-end p-10">
                    <button type="submit" className="btn bg-orange-600 text-white hover:bg-black hover:text-orange-600">Book</button>
                </div>
            </form>
        </div>
    );
};

export default CheckOut;