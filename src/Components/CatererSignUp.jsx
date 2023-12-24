import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const CatererSignUp = () => {

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
                        //create caterer entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            catererType: data.catererType,
                            image: data.image,
                            role: data.role
                        }
                        console.log(userInfo)
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('caterer added to the database')
                                    toast.success('caterer profile created successfully')
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
        <div>
            <div className="pt-20 bg-base-content">
                <Helmet>
                    <title>Asta | Caterer SignUp</title>
                </Helmet>

                <div className="">
                    <div className="p-2">
                        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-slate-300 rounded-lg shadow-md dark:bg-gray-800">
                            <div className="flex justify-center mx-auto text-4xl text-black font-bold">
                                <p>Asta</p>
                            </div>
                            <p className="text-center">Create Account</p>
                            <p className="text-center font-semibold text-orange-600">As a Caterer</p>

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

                                <div className="form-control w-full my-2">
                                    <label className="label">
                                        <span className="label-text">Caterer Type</span>
                                    </label>
                                    <select {...register('catererType', { required: true })}
                                        className="select select-bordered w-full"
                                        name="catererType">
                                        <option value="Regular Caterer" >Regular caterer</option>
                                        <option value="Wedding Caterer">Wedding Caterer</option>
                                        <option value="Buffet Caterer">Buffet Caterer</option>
                                        <option value="Cuisine-Specific Caterer">Cuisine-Specific Caterer</option>
                                    </select>
                                    <span className="text-sm font-bold text-slate-400">Caterer Type is required . Please select it</span>
                                </div>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Upload image </span>
                                    </div>
                                    <input {...register('image')} type="file" className="file-input file-input-bordered w-full max-w-xs" name="image" />
                                </label>
                                {errors.image?.type === 'required' && <p className="text-red-600 font-medium">Image is required</p>}
                                <input value={'caterer'} type="text" {...register("role", { required: true })}
                                    name="role"
                                    placeholder="role" className="hidden w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <div className="mt-2">
                                    <button type="submit" className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-black focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                        {loading ? <span className="loading loading-spinner loading-sm"></span> : 'SignUp'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Toaster />

            </div>
        </div>
    );
};

export default CatererSignUp;