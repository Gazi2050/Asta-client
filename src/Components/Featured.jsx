import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


const Featured = () => {


    const [features, setFeatures] = useState([]);

    useEffect(() => {
        fetch('Featured.json')
            .then(res => res.json())
            .then(data => {
                setFeatures(data);
            });
    }, []);

    return (
        <div style={{ backgroundImage: `url(https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }} className="hero min-h-screen bg-fixed">
            <div className="text-white hero-overlay bg-opacity-75 p-10">
                <p className="text-center text-3xl lg:text-5xl font-bold text-orange-500">Our Most Popular Events</p>
                <div className="lg:p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
                    {features.map(feature => <div key={feature.id}>
                        <div className="card card-compact bg-orange-600">
                            <figure><img src={feature.img} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-white">{feature.title}</h2>
                            </div>
                        </div>
                    </div>)
                    }
                </div>
                <div className="flex justify-center">
                    <Link to={'/events'}>
                        <button className="bg-orange-600 lg:bg-orange-600 border-0 lg:border-0 text-white lg:text-white hover:bg-black btn btn-sm sm:btn-sm md:btn-md lg:btn mt-5 lg:-mt-9">see more</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Featured;