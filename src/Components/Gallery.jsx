import { Helmet } from "react-helmet-async";


const Gallery = () => {
    return (
        <div className="pt-20">
            <Helmet>
                <title>Asta | Gallery</title>
            </Helmet>
            <h1 className="text-orange-600 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">Gallery</h1>
        </div>
    );
};

export default Gallery;