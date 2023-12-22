
const AboutUs = () => {
    return (
        <div>
            <div style={{ backgroundImage: `url(https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }} className="hero min-h-screen bg-fixed">

                <div className="text-white hero-overlay bg-opacity-75 p-10">
                    <div className="flex-row md:flex justify-center items-center lg:p-12 space-x-10">
                        <div>
                            <img className="rounded-xl" src={'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="" />
                        </div>
                        <div className="space-y-2  mt-5 text-justify">
                            <p className="text-3xl lg:text-5xl font-bold text-orange-500">About Us</p>
                            <p>At Asta Events, we are your architects of extraordinary moments. Our passion for precision and creativity fuels our commitment to turning your visions into unforgettable realities. With a collaborative approach, we tailor each event to reflect your unique style, ensuring a seamless and memorable experience. Welcome to Asta Events, where every celebration becomes a masterpiece.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;