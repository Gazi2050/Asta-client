import { FaFacebookF, FaInstagram, FaLinkedinIn, } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
            <footer className="footer items-center p-4 bg-black text-neutral-content">
                <aside className="items-center grid-flow-col text-orange-500">
                    <img src="/asta.png" className="w-12" alt="" />
                    <p>Copyright © 2023 - All right reserved</p>
                </aside>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl">
                    <a href="https://www.facebook.com/" className="hover:text-orange-500">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/" className="hover:text-orange-500">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/" className="hover:text-orange-500">
                        <FaLinkedinIn />
                    </a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;