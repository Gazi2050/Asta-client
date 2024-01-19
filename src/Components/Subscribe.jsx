

const Subscribe = () => {
    return (
        <div>
            <section className="flex flex-col w-full mx-auto overflow-hidden bg-white  dark:bg-gray-800 md:flex-row md:h-48">
                <div className="md:flex md:items-center md:justify-center md:w-1/2 bg-slate-900">
                    <div className="px-6 py-6 md:px-8 md:py-0">
                        <h2 className="text-base font-bold text-white"><span className="text-orange-600 text-xl">Subscribe</span> For  Updates And Offers</h2>

                        <p className="mt-2 text-sm text-gray-400">Subscribe for first dibs on updates and exclusive offers! Stay in the loop with exciting news and promotions directly to your inbox. Don't miss out – stay connected!</p>
                    </div>
                </div>

                <div className="flex items-center justify-center p-5 lg:pb-6 md:py-0 md:w-1/2 ">
                    <form>
                        <div className="flex flex-col p-1.5 overflow-hidden border border-black rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-orange-600 focus-within:ring-orange-600">
                            <input className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="email" name="email" placeholder="Enter your email" />

                            <button type="submit" className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 bg-orange-600 rounded-md hover:bg-black focus:bg-gray-600 focus:outline-none btn uppercase">subscribe</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Subscribe;