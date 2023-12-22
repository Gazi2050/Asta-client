import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateUserProfile, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const newUser = result.user;
                // toast.success('user signUp successfully')
                console.log(newUser);
                updateUserProfile(data.name)
                    .then(() => {
                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    toast.success('user created successfully')
                                    reset();
                                    navigate('/');
                                }
                            })
                        // console.log('user profile updated')
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error(error)
                    }
                    )
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                toast.error(errorMessage)
            });
    }

    return (
        <div className="pt-20 bg-base-content">
            <Helmet>
                <title>Asta | SignUp</title>
            </Helmet>

            <div className="">
                <div className="p-2">
                    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-slate-300 rounded-lg shadow-md dark:bg-gray-800">
                        <div className="flex justify-center mx-auto text-4xl text-black font-bold">
                            <p>Asta</p>
                        </div>
                        <p className="text-center">Create Account</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                            <div>
                                <label className="block text-sm text-gray-800 dark:text-gray-200">Username</label>
                                <input type="text" {...register("name", { required: true })}
                                    name="name"
                                    placeholder="username" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.name && <p className="text-red-600 font-medium">Username is required</p>}

                            </div>
                            <div>
                                <label className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                                <input type="email" {...register("email", { required: true })}
                                    name="email" placeholder="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.email && <p className="text-red-600 font-medium">Email is required</p>}
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                                    <span onClick={() => setShowPassword(!showPassword)} className="text-xs text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">{showPassword ? 'Hide Password' : 'Show Password'}</span>
                                </div>

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: true,
                                        minLength: 7,
                                        validate: {
                                            uppercase: (value) => /[A-Z]/.test(value),
                                            lowercase: (value) => /[a-z]/.test(value),
                                            digit: (value) => /\d/.test(value),
                                            specialChar: (value) => /[@$!%*?&]/.test(value),
                                        },
                                    })}
                                    name="password"
                                    placeholder="password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.password?.type === 'required' && <p className="text-red-600 font-medium">Password is required</p>}
                                {errors.password?.type === 'minLength' && (
                                    <p className="text-red-600 font-medium">Password must be at least 7 characters</p>
                                )}
                                {errors.password?.type === 'uppercase' && (
                                    <p className="text-red-600 font-medium">Password must include at least one uppercase letter</p>
                                )}
                                {errors.password?.type === 'lowercase' && (
                                    <p className="text-red-600 font-medium">Password must include at least one lowercase letter</p>
                                )}
                                {errors.password?.type === 'digit' && (
                                    <p className="text-red-600 font-medium">Password must include at least one digit</p>
                                )}
                                {errors.password?.type === 'specialChar' && (
                                    <p className="text-red-600 font-medium">Password must include at least one special character (@$!%*?&)</p>
                                )}

                            </div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Upload image </span>
                                </div>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                                <div className="label">


                                </div>
                            </label>

                            <div className="mt-6">
                                <button type="submit" className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-black focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                    {loading ? <span className="loading loading-spinner loading-sm"></span> : 'SignUp'}
                                </button>
                            </div>
                        </form>
                        <p className="mt-8 text-sm font-light text-center text-black"> Already have an account? <Link to={'/logIn'} className="font-medium text-gray-700 dark:text-gray-200 hover:underline">LogIn</Link></p>
                    </div>
                </div>
            </div>
            <Toaster />

        </div>
    );
};

export default SignUp;