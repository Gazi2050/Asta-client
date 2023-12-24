import { Link } from "react-router-dom";

const EventCard = ({ eventItem }) => {
    const { _id, eventName, eventFee, img, description, eventType } = eventItem;
    return (
        <div>
            <div className="card w-full lg:h-full md:h-full bg-slate-300 shadow-xl">
                <figure><img className="lg:h-[270px]" src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {eventName}
                        <div className="badge bg-orange-600 text-white p-3">$ {eventFee}</div>
                    </h2>
                    <p>{description}</p>
                    <Link to={`/checkOut/${_id}`}>
                        <button className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white">CheckOut</button>
                    </Link>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline p-3">{eventType}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;