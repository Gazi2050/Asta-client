import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import AboutUs from "./AboutUs";
import Featured from "./Featured";
import ContactUs from "./ContactUs";
import Team from "./Team";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Asta | Home</title>
            </Helmet>
            <Banner />
            <AboutUs />
            <Featured />
            <Team />
            <ContactUs />
        </div>
    );
};

export default Home;