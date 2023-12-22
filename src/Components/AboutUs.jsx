
const AboutUs = () => {
    return (
        <div>
            <div style={{ backgroundImage: `url(https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }} className="hero min-h-screen bg-fixed">

                <div className="text-white hero-overlay bg-opacity-75 p-10">
                    <div className="flex-row md:flex justify-center items-center lg:p-12 space-x-10">
                        <div>
                            <img className="rounded-xl" src={'https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="" />
                        </div>
                        <div className="space-y-2  mt-5 text-justify">
                            <p className="text-3xl lg:text-5xl font-bold text-amber-400">About Us</p>
                            <p>Thrive is your go-to for holistic wellness, offering personalized plans and expert guidance in fitness, nutrition, and mental health. Join a supportive community celebrating success and fostering a lifestyle that enhances both physical and emotional well-being. Thrive is more than a website; it's a movement redefining what it means to live a truly thriving life. Start your transformative journey with us today.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;