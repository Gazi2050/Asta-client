import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddEvent = () => {
    const { register, handleSubmit, reset } = useForm();
    const [inputValue, setInputValue] = useState();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        //console.log(data);
        const imageFile = { image: data.img[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const eventItem = {
                eventName: data.eventName,
                eventType: data.eventType,
                eventFee: parseInt(data.eventFee),
                description: data.description,
                img: res.data.data.display_url
            }
            const eventRes = await axiosSecure.post('/events', eventItem);
            //console.log(eventRes.data)
            if (eventRes.data.insertedId) {
                reset();
                toast.success('Event added successfully');
                navigate('/events');
            } else {
                toast.error('Failed to add event. Please try again.');
            }
        }
        //console.log(res.data);
    }
    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Add Event</title>
            </Helmet>
            <div className="py-6 bg-slate-800 ">
                <section className="max-w-4xl p-6 mx-auto bg-orange-50 rounded-md shadow-md dark:bg-gray-800 tex">
                    <div className="text-center">
                        <span className="text-xl font-semibold text-orange-600  dark:text-white text-center border-2 p-2 rounded-md border-orange-400">Add Event</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Event Name</label>
                                <input
                                    required
                                    {...register('eventName', { required: true })}
                                    placeholder="Event Name"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Event Type</label>
                                <input
                                    required
                                    {...register('eventType', { required: true })}
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
                                    required
                                    {...register('description', { required: true })}
                                    placeholder="Description"
                                    className="block w-full px-4 pb-20 pt-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                ></textarea>

                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Event Fee</label>
                                <input
                                    required
                                    {...register('eventFee', { required: true, type: Number })}
                                    placeholder="Event Fee"
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value, 10) || 0;
                                        setInputValue(Math.max(0, newValue));
                                    }}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Image</label>

                                <input
                                    required
                                    {...register('img', { required: true })}
                                    type="file"
                                    className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button type="submit" className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white">Add</button>
                        </div>
                        <Toaster />
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddEvent;