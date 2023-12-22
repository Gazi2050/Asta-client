

const ContactUs = () => {
    return (
        <div>
            <section className="p-6 bg-orange-600 dark:bg-gray-800 dark:text-gray-100">
                <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
                    <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900">
                        <span className="block mb-2 text-3xl font-semibold dark:text-violet-400">Have a Question? We're Here to Help!</span>
                        <p className="my-8">
                            Your input is important to us! If you have any questions, queries, or suggestions, please don't hesitate to reach out.
                        </p>
                        <form className="self-stretch space-y-3">
                            <div>
                                <input type="text" placeholder="email" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <textarea className="textarea textarea-bordered w-full" placeholder="Type here"></textarea>
                            </div>
                            <button type="button" className="btn hover:bg-black hover:text-white border-0">Submit</button>
                        </form>
                    </div>
                    <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww" alt="" className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500" />
                </div>
            </section>
        </div>
    );
};

export default ContactUs;