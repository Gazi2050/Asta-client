import { Link } from "react-router-dom";


const OrderCard = ({ orderItem }) => {
    const { _id, eventId, img, eventName, eventType, guests, total, orderDate, orderTime, eventDate } = orderItem;
    return (
        <div>
            <div className="card w-full lg:h-full md:h-full bg-slate-300 shadow-xl">
                <figure><img className="lg:h-[270px]" src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {eventName}
                        <div className="badge badge-outline p-3">{eventType}</div>
                    </h2>
                    <p><span className="font-semibold">Guest :</span> {guests}</p>
                    <p><span className="font-semibold">Order Date :</span> {orderDate}</p>
                    <p><span className="font-semibold">Order Time :</span> {orderTime}</p>
                    <p><span className="font-semibold">Event Date :</span> {eventDate}</p>
                    <p className="font-semibold">Total Fee : $ {total}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/orders/${_id}`}>
                            <span className="btn btn-sm md:btn-md lg:btn-md  text-white bg-orange-600 hover:text-orange-600 hover:bg-white">Order Details</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;