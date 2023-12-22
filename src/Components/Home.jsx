import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import AboutUs from "./AboutUs";
import Featured from "./Featured";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Asta | Home</title>
            </Helmet>
            <Banner />
            <AboutUs />
            <Featured />
        </div>
    );
};

export default Home;