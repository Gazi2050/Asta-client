

const ContactUs = () => {
    return (
        <div className="bg-orange-600 py-10 space-y-10 ">
            <div className="text-white text-center space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold">Have a Question? We're Here to Help!</h1>
                <p className="font-semibold">Your input is important to us! If you have any questions, queries, or suggestions, please don't hesitate to reach out.</p>
            </div>
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-black rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl">
                <form className="mt-6">
                    <div className="flex-1 mt-6">
                        <label className="block mb-2 text-sm text-white dark:text-gray-200">Email address</label>
                        <input
                            type="email"
                            placeholder="abc@example.com"
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="w-full mt-6">
                        <label className="block mb-2 text-sm text-white dark:text-gray-200">Message</label>
                        <textarea
                            className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-yellow-300 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Message"
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-orange-600 text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white mt-4"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ContactUs;