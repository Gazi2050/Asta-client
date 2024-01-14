import toast, { Toaster } from "react-hot-toast";

const AddEvent = () => {
    return (
        <div className="pt-20">
            <div className="py-20 bg-black ">
                <section className="max-w-4xl p-6 mx-auto bg-amber-100 rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-xl font-semibold text-gray-700 capitalize dark:text-white text-center">Add Class</h2>

                    <form onSubmit={''}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Event Type</label>
                                <input
                                    required
                                    list="fruitOptions"
                                    id="fruits"
                                    type="text"
                                    name="classType"
                                    autoComplete="off"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                                <datalist id="fruitOptions">
                                    <option value="CardioCore Mix" />
                                    <option value="Strength Circuit" />
                                    <option value="YogaZen" />
                                    <option value="HIIT Xtreme" />
                                </datalist>
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Event Name</label>
                                <input required type="text" name="trainer" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Date</label>
                                <input required type="date" name="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Fee</label>
                                <input required type="text" name="fee" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button type="submit" className="btn px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-900">Add</button>
                        </div>
                        <Toaster />
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddEvent;