import { Link, NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

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
                            <li><NavLink to={'/signUp'} onClick={toggleMenu}>SignUp</NavLink></li>
                        </ul>
                    </div>
                    <Link className="bg-slate-300 border-0 text-4xl text-orange-600 font-semibold p-2">Asta</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/gallery'}>Gallery</NavLink></li>
                        <li><NavLink to={'/events'}>Events</NavLink></li>
                        <li><NavLink to={'/signUp'}>SignUp</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to={'/logIn'} className="btn btn-sm sm:btn-sm md:btn-md lg:btn bg-orange-600 text-white lg:bg-orange-600 lg:text-white hover:bg-white hover:text-orange-600 md:bg-orange-600 md:text-white">LogIn</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;