import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="h-screen bg-base-content pt-5">
            <Helmet>
                <title>Asta | Profile</title>
            </Helmet>
            <div className="flex justify-center items-center pt-24">
                <div className="w-full max-w-md px-8 py-10 mt-16 mb-5 bg-slate-100 rounded-lg shadow-lg dark:bg-gray-800 border-4  border-amber-400">
                    <div className="flex justify-center -mt-28 md:justify-center mb-10">
                        <img className="object-cover w-24 h-24 border-[4px] border-amber-400 rounded-full dark:border-blue-400 bg-white" alt="Testimonial avatar" src={user.photoURL || 'https://cdn-icons-png.flaticon.com/128/64/64572.png'} />
                    </div>
                    <h2 className="m-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0"><span className="font-bold">User Name :</span> {user.displayName}</h2>
                    <h2 className="m-2 text-md lg:text-xl md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0"><span className="font-bold">Email :</span> {user.email}</h2>

                    {/* {role && <h2 className="m-2 text-md lg:text-xl md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0"><span className="font-bold">Role :</span> {role}</h2>}

                    {role === 'caterer' && catererType && <h2 className="m-2 text-md lg:text-xl md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0"><span className="font-bold">Caterer Type :</span> {catererType}</h2>}

                    {role === 'photographer' && photographerType && <h2 className="m-2 text-md lg:text-xl md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0"><span className="font-bold">Photographer Type :</span> {photographerType}</h2>}

                    {role === 'hotel' && hotelType && <h2 className="m-2 text-md lg:text-xl md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0"><span className="font-bold">Hotel Type :</span> {hotelType}</h2>} */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
