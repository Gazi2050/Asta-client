import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { FaCameraRetro } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div className="pt-20 ">
            <Helmet>
                <title>Asta | All Users</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-2xl lg:text-4xl md:text-3xl text-center font-bold py-5">All Users</h1>
            </div>
            <p className="text-center text-lg font-bold">Total Users : {users.length}</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-orange-600 text-white font-bold text-sm md:text-lg lg:text-xl">
                        <tr>
                            <th>No.</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            users.map((user, index) => <tr key={user._id} className="bg-base-200 font-semibold">
                                <th>{index + 1}</th>
                                <td>
                                    <p>{user.name}</p>
                                    <p className="kbd kbd-xs bg-orange-600 text-white">{user.email}</p>
                                </td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <div className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-black text-white lg:bg-black lg:text-white hover:bg-white hover:text-black md:bg-black md:text-white tooltip tooltip-right" data-tip={user.role}>
                                            <FaUserShield className="text-2xl" />
                                        </div>
                                    ) : user.role === 'caterer' ? (
                                        <div className="space-y-1">
                                            <div>
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-black text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white tooltip tooltip-right" data-tip={user.role}>
                                                    <GiCook className="text-2xl" />
                                                </button>
                                            </div>
                                            <p className="kbd kbd-xs">{user.catererType}</p>
                                        </div>
                                    ) : user.role === 'photographer' ? (
                                        <div className="space-y-1">
                                            <div>
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-orange-600 text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white tooltip tooltip-right" data-tip={user.role}>
                                                    <FaCameraRetro className="text-2xl" />
                                                </button>
                                            </div>
                                            <p className="kbd kbd-xs">{user.photographerType}</p>
                                        </div>
                                    ) : user.role === 'hotel' ? (
                                        <div className="space-y-1">
                                            <div>
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-orange-600 text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white tooltip tooltip-right" data-tip={user.role}>
                                                    <FaHotel className="text-2xl" />
                                                </button>
                                            </div>
                                            <p className="kbd kbd-xs">{user.hotelType}</p>
                                        </div>
                                    ) : (
                                        <div className="tooltip tooltip-right" data-tip={'user'}>
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-orange-600 text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white">
                                                <FaUser className="text-2xl" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <div className="tooltip tooltip-right" data-tip={'Delete'}>
                                        <button onClick={() => handleDeleteUser(user._id)} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-red-600 text-white lg:bg-red-600 lg:text-white hover:bg-white hover:text-red-600 md:bg-red-600 md:text-white">
                                            <ImBin className="text-2xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;