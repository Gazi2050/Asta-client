import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
const CheckOut = () => {
    const checkout = useLoaderData();
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const { _id, eventName, eventFee, img, description, eventType } = checkout;
    // Placeholder for service providers
    const [serviceProviders, setServiceProviders] = useState([]);
    //Photographer state
    const [selectedCategoryPhotographer, setSelectedCategoryPhotographer] = useState("photographer");
    const [selectedTypePhotographer, setSelectedTypePhotographer] = useState("");
    const [filteredTypesPhotographer, setFilteredTypesPhotographer] = useState([]);
    const [filteredProvidersPhotographer, setFilteredProvidersPhotographer] = useState([]);
    const [bookingPhotographer, setBookingPhotographer] = useState({
        _id: "",
        eventName: "",
        eventFee: "",
        img: "",
        description: "",
        eventType: "",
        selectedServiceProvider: "",
    });

    // Caterer states
    const [selectedCategoryCaterer, setSelectedCategoryCaterer] = useState("caterer");
    const [selectedTypeCaterer, setSelectedTypeCaterer] = useState("");
    const [filteredTypesCaterer, setFilteredTypesCaterer] = useState([]);
    const [filteredProvidersCaterer, setFilteredProvidersCaterer] = useState([]);
    const [bookingCaterer, setBookingCaterer] = useState({
        _id: "",
        eventName: "",
        eventFee: "",
        img: "",
        description: "",
        eventType: "",
        selectedServiceProvider: "",
    });

    // Hotel states
    const [selectedCategoryHotel, setSelectedCategoryHotel] = useState("hotel");
    const [selectedTypeHotel, setSelectedTypeHotel] = useState("");
    const [filteredTypesHotel, setFilteredTypesHotel] = useState([]);
    const [filteredProvidersHotel, setFilteredProvidersHotel] = useState([]);
    const [bookingHotel, setBookingHotel] = useState({
        _id: "",
        eventName: "",
        eventFee: "",
        img: "",
        description: "",
        eventType: "",
        selectedServiceProvider: "",
    });

    useEffect(() => {
        // Fetch service providers from your API
        fetch("http://localhost:5000/users")
            .then((response) => response.json())
            .then((data) => {
                setServiceProviders(data);
            })
            .catch((error) => console.error("Error fetching service providers:", error));
    }, []);

    useEffect(() => {
        // Reset selected type and providers when category changes for photographers
        setSelectedTypePhotographer("");
        setFilteredProvidersPhotographer([]);
    }, [selectedCategoryPhotographer]);

    useEffect(() => {
        // Filter types based on the selected category for photographers
        const typesPhotographer = serviceProviders
            .filter((provider) => provider.role === selectedCategoryPhotographer)
            .map((provider) => (provider.photographerType ? provider.photographerType : null))
            .filter((type) => type !== null)
            .flat(); // Use flat to flatten the nested arrays

        setFilteredTypesPhotographer([...new Set(typesPhotographer)]);
    }, [selectedCategoryPhotographer, serviceProviders]);

    useEffect(() => {
        // Reset selected type and providers when category changes for caterers
        setSelectedTypeCaterer("");
        setFilteredProvidersCaterer([]);
    }, [selectedCategoryCaterer]);

    useEffect(() => {
        // Filter types based on the selected category for caterers
        const typesCaterer = serviceProviders
            .filter((provider) => provider.role === selectedCategoryCaterer)
            .map((provider) => provider[`${selectedCategoryCaterer}Type`]);

        setFilteredTypesCaterer([...new Set(typesCaterer)]);
    }, [selectedCategoryCaterer, serviceProviders]);

    useEffect(() => {
        // Reset selected type and providers when category changes for hotels
        setSelectedTypeHotel("");
        setFilteredProvidersHotel([]);
    }, [selectedCategoryHotel]);

    useEffect(() => {
        // Filter types based on the selected category for hotels
        const typesHotel = serviceProviders
            .filter((provider) => provider.role === selectedCategoryHotel)
            .map((provider) => provider[`${selectedCategoryHotel}Type`]);

        setFilteredTypesHotel([...new Set(typesHotel)]);
    }, [selectedCategoryHotel, serviceProviders]);

    const handleCategoryChange = (e, category, setSelectedCategoryFunc) => {
        setSelectedCategoryFunc(category);
    };

    const handleTypeChangePhotographer = (e) => {
        const selectedType = e.target.value;
        setSelectedTypePhotographer(selectedType);

        // Filter providers based on selected category and type for caterers
        setFilteredProvidersPhotographer(
            serviceProviders
                .filter((provider) => provider.role === selectedCategoryPhotographer && provider[`${selectedCategoryPhotographer}Type`] === selectedType)
                .map((provider) => ({
                    label: provider.name,
                    value: provider._id,
                }))
        );
    };

    const handleTypeChangeCaterer = (e) => {
        const selectedType = e.target.value;
        setSelectedTypeCaterer(selectedType);

        // Filter providers based on selected category and type for caterers
        setFilteredProvidersCaterer(
            serviceProviders
                .filter((provider) => provider.role === selectedCategoryCaterer && provider[`${selectedCategoryCaterer}Type`] === selectedType)
                .map((provider) => ({
                    label: provider.name,
                    value: provider._id,
                }))
        );
    };

    const handleTypeChangeHotel = (e) => {
        const selectedType = e.target.value;
        setSelectedTypeHotel(selectedType);

        // Filter providers based on selected category and type for hotels
        setFilteredProvidersHotel(
            serviceProviders
                .filter((provider) => provider.role === selectedCategoryHotel && provider[`${selectedCategoryHotel}Type`] === selectedType)
                .map((provider) => ({
                    label: provider.name,
                    value: provider._id,
                }))
        );
    };

    const handleServiceProviderChange = (e, setBookingFunc) => {
        setBookingFunc({
            ...bookingPhotographer, ...bookingCaterer, ...bookingHotel,
            selectedServiceProvider: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = user.email;
        const serviceData = {
            category_P: selectedCategoryPhotographer,
            category_C: selectedCategoryCaterer,
            category_H: selectedCategoryHotel,
            type_P: selectedTypePhotographer,
            type_C: selectedTypeCaterer,
            type_H: selectedTypeHotel,
            serviceProvider_P: bookingPhotographer.selectedServiceProvider,
            serviceProvider_C: bookingCaterer.selectedServiceProvider,
            serviceProvider_H: bookingHotel.selectedServiceProvider,
            // Dynamically set service fee based on whether a service provider is selected
            serviceFee_P: bookingPhotographer.selectedServiceProvider ? 400 : 0,
            serviceFee_C: bookingCaterer.selectedServiceProvider ? 500 : 0,
            serviceFee_H: bookingHotel.selectedServiceProvider ? 700 : 0,
        };

        const booking = { email, eventName, eventFee, img, description, eventType, serviceData };
        console.log(booking);

        // You can do something with the booking data here
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    toast.success('Event booked successfully')
                    navigate('/events');
                }
            })

    };

    return (
        <div className="pt-20 pb-10">
            <Helmet>
                <title>Asta | CheckOut {_id}</title>
            </Helmet>
            <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold pt-2">CheckOut</h1>
            <form>
                <section className="bg-white dark:bg-gray-900">
                    <div className="container px-6 pt-2 pb-4 mx-auto">
                        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                            <img className="object-cover w-full lg:mx-6 lg:w-fit rounded-xl h-fit lg:h-fit lg:-mt-48" src={img} alt="image" name="img" />

                            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                                <div className="">
                                    <p className="block mt-4 text-2xl font-semibold text-gray-800 dark:text-white" name="eventName">
                                        {eventName}
                                    </p>
                                    <p className="text-xs text-orange-600 uppercase badge badge-outline" name="eventType">
                                        {eventType}
                                    </p>
                                </div>
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm" name="description">
                                    {description}
                                </p>
                                <div className="pt-5">
                                    <p className="text-2xl font-semibold" name="eventFee">
                                        $ {eventFee}
                                    </p>
                                </div>
                                <p className="font-semibold text-lg p-5 text-center">Select Our Other Services</p>
                                <div className="grid grid-cols-1 gap-8 lg:gap-24">
                                    {/* Photographer Section */}
                                    <div className="mb-5 lg:-mb-20">
                                        {/* Dropdown for Categories */}
                                        <select
                                            value={selectedCategoryPhotographer}
                                            onChange={(e) => handleCategoryChange(e, "photographer", setSelectedCategoryPhotographer)}
                                            className="block mt-2 text-lg text-gray-500 dark:text-gray-300 font-bold"
                                        >
                                            {["Photographer"].map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Dropdown for Service Provider Types */}
                                        <select
                                            value={selectedTypePhotographer}
                                            onChange={(e) => handleTypeChangePhotographer(e, setSelectedTypePhotographer, setFilteredProvidersPhotographer)}
                                            className="block mt-2 text-sm text-gray-500 dark:text-gray-300 md:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Photographer Type
                                            </option>
                                            {['Regular Photographer', 'Fashion Photographer', 'Event Photographer', 'Portrait Photographer'].map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Dropdown for Service Providers */}
                                        <select
                                            value={bookingPhotographer.selectedServiceProvider}
                                            onChange={(e) => handleServiceProviderChange(e, setBookingPhotographer)}
                                            className="block mt-2 text-sm text-gray-500 dark:text-gray-300 md:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Photographer Service Provider
                                            </option>
                                            {filteredProvidersPhotographer.map((provider) => (
                                                <option key={provider.value} value={provider.label}>
                                                    {provider.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Caterer Section */}
                                    <div className="mb-5 lg:-mb-20">
                                        {/* Dropdown for Categories */}
                                        <select
                                            value={selectedCategoryCaterer}
                                            onChange={(e) => handleCategoryChange(e, "caterer", setSelectedCategoryCaterer)}
                                            className="block mt-2 text-lg font-bold text-gray-500 dark:text-gray-300"
                                        >
                                            {["Caterer"].map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Dropdown for Service Provider Types */}
                                        <select
                                            value={selectedTypeCaterer}
                                            onChange={handleTypeChangeCaterer}
                                            className="block mt-2 text-sm text-gray-500 dark:text-gray-300 md:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Caterer Type
                                            </option>
                                            {['Regular Caterer', 'Wedding Caterer', 'Buffet Caterer', 'Cuisine-Specific Caterer'].map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Dropdown for Service Providers */}
                                        <select
                                            value={bookingCaterer.selectedServiceProvider}
                                            onChange={(e) => handleServiceProviderChange(e, setBookingCaterer)}
                                            className="block mt-2 text-sm text-gray-500 dark:text-gray-300 md:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Caterer Service Provider
                                            </option>
                                            {filteredProvidersCaterer.map((provider) => (
                                                <option key={provider.value} value={provider.label}>
                                                    {provider.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Hotel Section */}
                                    <div className="mb-5 lg:-mb-20">
                                        {/* Dropdown for Categories */}
                                        <select
                                            value={selectedCategoryHotel}
                                            onChange={(e) => handleCategoryChange(e, "hotel", setSelectedCategoryHotel)}
                                            className="block mt-2 text-lg font-bold text-gray-500 dark:text-gray-300"
                                        >
                                            {["Hotel"].map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Dropdown for Service Provider Types */}
                                        <select
                                            value={selectedTypeHotel}
                                            onChange={handleTypeChangeHotel}
                                            className="block mt-2 text-sm text-gray-500 dark:text-gray-300 md:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Hotel Type
                                            </option>
                                            {['Economy', 'Mid-Range', 'Upscale', 'Luxury'].map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Dropdown for Service Providers */}
                                        <select
                                            value={bookingHotel.selectedServiceProvider}
                                            onChange={(e) => handleServiceProviderChange(e, setBookingHotel)}
                                            className="block mt-2 text-sm text-gray-500 dark:text-gray-300 md:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Hotel Service Provider
                                            </option>
                                            {filteredProvidersHotel.map((provider) => (
                                                <option key={provider.value} value={provider.label}>
                                                    {provider.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end p-2">
                                    <button
                                        type="submit"
                                        className="btn bg-orange-600 text-white hover:bg-black hover:text-orange-600 mt-4"
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Toaster />
            </form>
        </div>
    );
};

export default CheckOut;
