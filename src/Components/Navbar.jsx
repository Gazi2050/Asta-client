import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useContext, useState } from "react";
import { GiCook } from "react-icons/gi";
import { FaCameraRetro } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
            .then(result => {
                toast.success("User LogOut Successfully")
                console.log(result)
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message;
                console.log(errorCode);
                toast.error(errorMessage)

            });
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (
        <div>
            <div className="navbar bg-slate-300 fixed z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} role="button" className={`btn btn-ghost lg:hidden transition duration-400 ease-in text-2xl ${isMenuOpen ? 'transform rotate-90' : ''
                            }`} onClick={toggleMenu}>
                            {isMenuOpen ?
                                (<MdMenu className="text-3xl" />)
                                :
                                (<MdMenu className="text-3xl" />)
                            }
                        </label>
                        <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 ${isMenuOpen ? 'block opacity-100' : 'hidden opacity-0 space-y-2'
                            }`}>
                            <li><NavLink to={'/'} onClick={toggleMenu}>Home</NavLink></li>
                            <li><NavLink to={'/gallery'} onClick={toggleMenu}>Gallery</NavLink></li>
                            <li><NavLink to={'/events'} onClick={toggleMenu}>Events</NavLink></li>
                            {
                                user ?
                                    (<li><NavLink to={'/bookings'} onClick={toggleMenu}>Bookings</NavLink></li>)
                                    :
                                    (null)
                            }
                            {user ? (
                                <NavLink to={'/profile'} onClick={toggleMenu}>
                                    {user.photoURL ? (
                                        <img className='
                                        block lg:hidden md:block rounded-full w-14 mr-4 border-2 border-black hover:border-orange-600' src={user.photoURL} alt="User Avatar" />
                                    ) : (
                                        <FaCircleUser className='text-4xl mr-4 hidden lg:block md:block' />
                                    )}
                                </NavLink>
                            ) :
                                (<>
                                    <li><NavLink to={'/signUp'} onClick={toggleMenu}>SignUp</NavLink></li>
                                    <li>
                                        <details>
                                            <summary>Collaborate</summary>
                                            <ul className="p-2">
                                                <li><NavLink to={'/catering'}
                                                    onClick={toggleMenu}><GiCook className="text-4xl" /> SignUp as Caterer</NavLink></li>
                                                <li><NavLink to={'/photography'}
                                                    onClick={toggleMenu}><FaCameraRetro className="text-2xl" /> SignUp as Photographer</NavLink></li>
                                            </ul>
                                        </details>
                                    </li>
                                </>)}

                        </ul>
                    </div>
                    <Link className="bg-transparent border-0 text-4xl lg:text-5xl text-orange-500 font-bold p-2">Asta</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/gallery'}>Gallery</NavLink></li>
                        <li><NavLink to={'/events'}>Events</NavLink></li>
                        {user ?
                            (<li><NavLink to={'/bookings'}>Bookings</NavLink></li>)
                            :
                            (<><li><NavLink to={'/signUp'}>SignUp</NavLink></li>
                                <li>
                                    <details>
                                        <summary>Collaborate</summary>
                                        <ul className="p-2">
                                            <li><NavLink to={'/catering'}><GiCook className="text-4xl" /> SignUp as Caterer</NavLink></li>
                                            <li><NavLink to={'/photography'}><FaCameraRetro className="text-2xl" /> SignUp as Photographer</NavLink></li>
                                        </ul>
                                    </details>
                                </li></>)}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ?
                        (<>
                            <NavLink to={'/profile'}>
                                {user?.photoURL ? (
                                    <img className='hidden lg:block md:block rounded-full w-14 mr-4 border-2 border-black hover:border-orange-600' src={user.photoURL} alt="User Avatar" />
                                ) : (
                                    <FaCircleUser className='text-4xl mr-4 hidden lg:block md:block' />
                                )}
                            </NavLink>
                            <button onClick={handleLogOut} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-orange-600 text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white">LogOut</button></>)
                        :
                        (<Link to={'/logIn'} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-orange-600 text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white">LogIn</Link>)
                    }
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Navbar;