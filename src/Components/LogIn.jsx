import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { googleSignIn, signIn, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();

    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const newUser = { email, password };
        console.log(newUser)

        signIn(email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                toast.success('User logged in successfully');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                toast.error(errorMessage);
                navigate('/signUp');
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const googleUser = result.user;
                console.log(googleUser);
                const userInfo = {
                    email: googleUser?.email,
                    name: googleUser?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        toast.success(`Logged in as ${googleUser.displayName}`);
                        navigate(from, { replace: true })
                    })
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }


    return (
        <div className="pt-20 bg-base-content">
            <Helmet>
                <title>Asta | LogIn</title>
            </Helmet>
            <div className="p-2">
                <div className="w-full max-w-sm p-6 m-auto mx-auto bg-slate-300 rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex justify-center mx-auto text-4xl text-black font-bold">
                        <p>Asta</p>
                    </div>
                    <p className="text-center">Welcome Back</p>

                    <form onSubmit={handleLogIn} className="mt-6">
                        <div>
                            <label className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                            <input
                                type="email" name="email" placeholder="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                                <span onClick={() => setShowPassword(!showPassword)} className="text-xs text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">{showPassword ? 'Hide Password' : 'Show Password'}</span>
                            </div>

                            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-black focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'LogIn'}
                            </button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <div className="flex items-center mt-6 -mx-2">
                        <button onClick={handleGoogleSignIn} type="button" className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-black transition-colors duration-300 transform bg-white rounded-lg hover:bg-black hover:text-white">

                            <FcGoogle className="text-2xl" />
                            <span className="mx-2 sm:inline">Sign in with Google</span>
                        </button>
                    </div>

                    <p className="mt-8 text-xs font-light text-center text-black"> Don't have an account? <Link to={'/signUp'} className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Create One</Link></p>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default LogIn;