import { Link } from "react-router-dom";


const BookingsCard = ({ booking }) => {
    const { _id, img, eventName, eventType, email } = booking;
    return (
        <div>
            <div className="card card-side bg-orange-100 shadow-xl my-5 h-56">
                <figure><img className=" hidden lg:block w-[500px]" src={img} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{eventName}</h2>
                    <div className="badge badge-outline">{eventType}</div>
                    <p>{email}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/bookings/${_id}`} >
                            <button className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white">Details</button>

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingsCard;