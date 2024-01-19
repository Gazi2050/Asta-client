import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const InboxDetails = () => {
    const inbox = useLoaderData();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: inboxs = [], refetch } = useQuery({
        queryKey: ['allPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allPayments');
            return res.data;
        }
    });
    const { _id, email, message, time } = inbox;

    const handleDeleteMessage = async (inbox) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!",
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/inbox/${inbox}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Message has been removed.",
                        icon: "success",
                    });
                    navigate('/inbox');
                }
            }
        } catch (error) {
            console.error("Error deleting message history", error);
            // Handle error as needed
        }
    };

    return (
        <div>
            <div className="pt-20">
                <div className=" mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
                    <div className="flex flex-col max-w-3xl mx-auto ">
                        <div className="p-5 mx-auto  lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-orange-50 dark:bg-gray-900">
                            <div className="space-y-4 p-5">
                                <p className="text-xs dark:text-gray-400 badge">{time}</p>
                                <p className="font-bold">Email : {email}</p>
                                <p>{message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button onClick={() => handleDeleteMessage(inbox._id)} className="btn btn-sm md:btn-md lg:btn-md text-white bg-red-600 hover:text-red-600 hover:bg-white">Remove Message</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxDetails;