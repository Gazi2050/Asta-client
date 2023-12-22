
const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-fixed" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
                <div className="hero-overlay bg-opacity-75"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md space-y-4">
                        <h1 className="text-3xl lg:text-5xl pt-20 font-bold text-orange-500">Celebrate Uniquely</h1>
                        <p className="mb-5">Crafting Moments, Creating Memories. Immerse in seamless planning and unmatched creativity. Your vision, our expertise – let's make it extraordinary at Asta Events.</p>
                        <button className="btn bg-orange-600 border-0 text-white hover:bg-black">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;