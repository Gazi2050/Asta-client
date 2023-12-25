import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";


const CheckOut = () => {
    const checkout = useLoaderData();
    const { _id, eventName, eventFee, img, description, eventType } = checkout;
    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | CheckOut {_id}</title>
            </Helmet>
            <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold pt-2">CheckOut</h1>
            <div>
                <section className="bg-white dark:bg-gray-900">
                    <div className="container px-6 pt-2 pb-4 mx-auto">
                        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={img} alt="image" />

                            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                                <p className="text-sm text-orange-600 uppercase badge badge-outline">{eventType}</p>

                                <p className="block mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
                                    {eventName}
                                </p>

                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                    {description}
                                </p>

                                {/* <div className="flex items-center mt-6">
                                    <img className="object-cover object-center w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />

                                    <div className="mx-4">
                                        <h1 className="text-sm text-gray-700 dark:text-gray-200">Amelia. Anderson</h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Lead Developer</p>
                                    </div>
                                </div> */}
                                <div className="pt-5">
                                    <p className="text-2xl font-semibold">$ {eventFee}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CheckOut;