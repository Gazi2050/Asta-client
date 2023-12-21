import { Link, NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-slate-300 fixed z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <MdMenu className="text-3xl" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/gallery'}>Gallery</NavLink></li>
                            <li><NavLink to={'/events'}>Events</NavLink></li>
                            <li><NavLink to={'/signUp'}>SignUp</NavLink></li>
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