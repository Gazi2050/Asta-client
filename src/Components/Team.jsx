

const Team = () => {
    return (
        <div>
            <section className="py-2 dark:bg-gray-800 dark:text-gray-100 bg-black text-white">
                <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
                    <h1 className="text-3xl lg:text-5xl pt-20 font-bold text-orange-500 text-center">Our Dedicated Team Members</h1>
                    <p className="max-w-2xl text-center dark:text-gray-400">Introducing our dedicated team member, diligently working to transform your dreams into reality.</p>
                    <div className="flex flex-row flex-wrap-reverse justify-center">
                        <div className="flex flex-col justify-center m-8 text-center">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" />
                            <p className="text-xl font-semibold leadi">Samantha Anderson</p>
                            <p className="dark:text-gray-400"> Event Coordinator</p>
                        </div>
                        <div className="flex flex-col justify-center m-8 text-center">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" />
                            <p className="text-xl font-semibold leadi">Michael Rodriguez</p>
                            <p className="dark:text-gray-400">Venue Specialist</p>
                        </div>
                        <div className="flex flex-col justify-center m-8 text-center">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" />
                            <p className="text-xl font-semibold leadi">Emily Davis</p>
                            <p className="dark:text-gray-400">Marketing and Promotion Strategist</p>
                        </div>

                        <div className="flex flex-col justify-center m-8 text-center">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" />
                            <p className="text-xl font-semibold leadi">Leroy Jenkins</p>
                            <p className="dark:text-gray-400">Client Relations Manager</p>
                        </div>
                        <div className="flex flex-col justify-center m-8 text-center">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww" />
                            <p className="text-xl font-semibold leadi">Richard Stevens</p>
                            <p className="dark:text-gray-400">Chief Event Strategist</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Team;