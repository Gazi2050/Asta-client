import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AllEventsDetails = () => {
    const event = useLoaderData();
    const [inputValue, setInputValue] = useState();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: events = [] } = useQuery({
        queryKey: ['allEvents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allEvents');
            return res.data;
        }
    });
    const { _id, eventName, eventFee, eventType, description } = event;

    const handleUpdateJob = async (event) => {
        event.preventDefault();

        const form = event.target;
        const eventName = form.eventName.value;
        const eventType = form.eventType.value;
        const description = form.description.value;
        const eventFee = form.eventFee.value;

        try {
            const UpdateJob = {
                eventName,
                eventType,
                description,
                eventFee
            };

            // Use axiosSecure for making the request
            const response = await axiosSecure.put(`/allEvents/${_id}`, UpdateJob);

            const data = await response.data;

            console.log(data);
            if (data.modifiedCount) {
                toast.success('Event Updated successfully');
                navigate('/allEvents');
            } else {
                toast.error('Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
            // Handle error, show error message, etc.
            toast.error('Error updating event');
        }
    };

    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Update Event</title>
            </Helmet>
            <div className="py-6 bg-slate-800 ">
                <section className="max-w-4xl p-6 mx-auto bg-orange-50 rounded-md shadow-md dark:bg-gray-800 tex">
                    <div className="text-center">
                        <span className="text-xl font-semibold text-orange-600  dark:text-white text-center border-2 p-2 rounded-md border-orange-400">Update Event</span>
                    </div>
                    <form onSubmit={handleUpdateJob}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Event Name</label>
                                <input
                                    defaultValue={eventName}
                                    name="eventName"
                                    placeholder="Event Name"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Event Type</label>
                                <input
                                    defaultValue={eventType}
                                    name="eventType"
                                    placeholder="Event Type"
                                    type="text"
                                    list="typeOptions"
                                    autoComplete="off"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                                <datalist id="typeOptions">
                                    <option value="Weddings" />
                                    <option value="Destination Weddings" />
                                    <option value="Travel Events" />
                                    <option value="Parties" />
                                    <option value="Anniversaries" />
                                </datalist>
                            </div>

                            <div className="lg:col-span-2 md:col-span-2">
                                <label className="text-gray-700 dark:text-gray-200">Description</label>
                                <textarea
                                    defaultValue={description}
                                    name="description"
                                    placeholder="Description"
                                    className="block w-full px-4 pb-20 pt-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                ></textarea>
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Event Fee</label>
                                <input
                                    defaultValue={eventFee}
                                    name="eventFee"
                                    placeholder="Event Fee"
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value, 10) || 0;
                                        setInputValue(Math.max(0, newValue));
                                    }}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button type="submit" className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white">Update</button>
                        </div>
                        <Toaster />
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AllEventsDetails;
