import { Helmet } from "react-helmet-async";

const Payment = () => {
    return (
        <div>
            <Helmet>
                <title>Asta | Payment</title>
            </Helmet>
            <div>
                <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">Payment</h1>
            </div>
        </div>
    );
};

export default Payment;