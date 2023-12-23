import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import AboutUs from "./AboutUs";
import Featured from "./Featured";
import ContactUs from "./ContactUs";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Asta | Home</title>
            </Helmet>
            <Banner />
            <AboutUs />
            <Featured />
            <ContactUs />
        </div>
    );
};

export default Home;