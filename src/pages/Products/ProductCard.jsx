
import { FaEye, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { id, title, images, price, rating, description } = product;

    return (
        <div className="relative p-4 w-full bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
            <img src={images[0]} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="absolute top-2 right-2 flex space-x-3">
                <button
                    aria-label="Add to wishlist"
                    className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-red-100 transition-transform transform hover:scale-110"
                >
                    <FaHeart />
                </button>
                <button
                    aria-label="View product"
                    className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-100 transition-transform transform hover:scale-110"
                >
                    <FaEye />
                </button>
            </div>
            <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold cursor-pointer hover:underline">
                    {title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 min-h-[60px]">
                    {description}
                </p>
                <p className="mt-2 text-xl font-bold">${price}</p>
                <p className="text-yellow-400">Rating: {rating} ⭐</p>
            </div>
            <div className="mt-4">
                <Link to={`/products/${id}`}>
                    <button
                        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-green-600 transition self-end"
                    >
                        View details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
