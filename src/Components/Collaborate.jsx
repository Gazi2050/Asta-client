import { Link } from "react-router-dom";


const Collaborate = () => {
    return (
        <div className="bg-black text-white lg:px-14 lg:py-16">
            <div className="flex flex-col lg:flex lg:flex-row  justify-center items-center">
                <div>
                    <img className="w-full md:w-[600px] lg:w-[1500px] md:rounded-lg md:mt-5 lg:rounded-lg" src="https://media.istockphoto.com/id/637367232/photo/business-people-shaking-hands-finishing-up-a-meeting.webp?b=1&s=170667a&w=0&k=20&c=adLWvtbb9kiP9notjeRgMTDSum7FdhSmXPzZfVdrnQw=" alt="" />
                </div>
                <div className="m-5 space-y-4">
                    <p className="text-4xl font-bold">Join Our Team </p>
                    <p className="text-justify">Join our creative journey! We're seeking talented photographers and catering experts to capture beautiful memories and enhance experiences. If you're passionate about crafting unforgettable moments, follow the link below to join us now! </p>
                    <div className="text-center lg:text-justify">
                        <Link to={'/catering'}><button className="btn btn-sm md:btn-md lg:btn-md btn-outline text-orange-600 m-2">Join as a Caterer</button></Link>
                        <Link to={'/photography'}><button className="btn btn-sm md:btn-md lg:btn-md btn-outline text-orange-600">Join as a Photographer</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collaborate;