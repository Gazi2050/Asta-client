import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Inbox = () => {
    const axiosSecure = useAxiosSecure();
    const { data: inboxs = [], isLoading, isError } = useQuery({
        queryKey: ['inbox'],
        queryFn: async () => {
            const res = await axiosSecure.get('/inbox');
            return res.data;
        }
    });

    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Inbox</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">Inbox</h1>
                <p className="text-center text-lg font-semibold">Total Messages: {inboxs.length}</p>
            </div>
            <div className="grid-cols-1 p-2 lg:p-10">
                {isLoading && <p className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', color: 'orange', animation: 'pulse 1.5s infinite' }}>Loading...</p>}
                {isError && <p className="text-red-600 font-bold text-center">Error fetching messages</p>}
                {inboxs.map((inbox) => (
                    <div key={inbox._id} className="card card-side bg-orange-100 shadow-xl my-5 h-56">
                        <div className="card-body">
                            <div className="badge badge-outline">{inbox.time}</div>
                            <p><span className="font-bold">Email :</span> {inbox.email}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/inbox/${inbox._id}`}>
                                    <button
                                        className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white"
                                    >
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inbox;