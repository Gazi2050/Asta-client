import { useLoaderData } from "react-router-dom";


const OrderDetails = () => {
    const order = useLoaderData();
    const { _id, eventId, img, eventName, eventType, email, photographer, hotel, caterer, photographerType, hotelType, catererType, eventFee, photographerFee, catererFee, hotelFee, guests, total, orderDate, orderTime } = order;
    console.log(order);
    return (
        <div className="pt-20">
            {_id}
        </div>
    );
};

export default OrderDetails;