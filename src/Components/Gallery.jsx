import { Helmet } from "react-helmet-async";


const Gallery = () => {
    return (
        <div className="p-20">
            <Helmet>
                <title>Asta | Gallery</title>
            </Helmet>
            <p className="text-4xl text-center">Gallery</p>
        </div>
    );
};

export default Gallery;