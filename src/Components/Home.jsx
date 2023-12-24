import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import AboutUs from "./AboutUs";
import Featured from "./Featured";
import ContactUs from "./ContactUs";
import Collaborate from "./Collaborate";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <Helmet>
                <title>Asta | Home</title>
            </Helmet>
            <Banner />
            <AboutUs />
            <Featured />
            <Collaborate />
            <ContactUs />
        </div>
    );
};

export default Home;