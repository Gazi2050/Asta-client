import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ContactUs = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        // Check if the form data is valid
        if (data.email && data.message) {
            const inbox = {
                email: data.email,
                message: data.message,
                time: new Date().toLocaleString(),
            };

            try {
                const inboxRes = await axiosPublic.post('/inbox', inbox);

                if (inboxRes.data.insertedId) {
                    reset();
                    toast.success('Message sent successfully');
                } else {
                    toast.error('Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                toast.error('Failed to send message. Please try again.');
            }
        } else {
            toast.error('Please fill in all required fields.');
        }
    };

    return (
        <div className="bg-orange-600 pt-10 lg:py-10 space-y-10 ">
            <div className="text-white text-center space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold">Have a Question? We're Here to Help!</h1>
                <p className="font-semibold">Your input is important to us! If you have any questions, queries, or suggestions, please don't hesitate to reach out.</p>
            </div>
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-black lg:rounded-xl shadow-2xl dark:bg-gray-900 lg:max-w-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="flex-1 mt-6">
                        <label className="block mb-2 text-sm text-white dark:text-gray-200">Email address</label>
                        <input
                            type="email"
                            required
                            {...register('email', { required: true })}
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-orange-600 dark:focus:border-blue-400 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-100"
                            placeholder="abc@example.com"
                        />
                    </div>
                    <div className="w-full mt-6">
                        <label className="block mb-2 text-sm text-white dark:text-gray-200">Message</label>
                        <textarea
                            required
                            {...register('message', { required: true })}
                            className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-orange-600 dark:focus:border-blue-400 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-100"
                            placeholder="Message"
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
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
