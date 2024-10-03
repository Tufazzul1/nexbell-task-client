import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                const selectedProduct = data.products.find(
                    (item) => item.id === parseInt(id)
                );
                setProduct(selectedProduct);
                setLoading(false);
            });
    }, [id]);

    const discountPrice = (
        product?.price -
        (product?.price * product?.discountPercentage) / 100
    ).toFixed(2);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <section className="mt-5 p-4 mx-auto">
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="flex flex-col md:flex-row gap-4 lg:gap-8 xl:gap-16">
                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto bg-green-50">
                        <img
                            className="w-full"
                            src={product?.images[0]}
                            alt={product?.title}
                        />
                    </div>

                    <div className="mt-6 lg:mt-0 flex flex-col justify-center">
                        <h1 className="text-xl md:text-3xl mb-5 font-bold text-gray-700 sm:text-2xl underline">
                            {product?.title}
                        </h1>
                        <div>
                            <p className="text-2xl font-extrabold text-gray-700 sm:text-3xl">
                                {product?.discountPercentage ? (
                                    <>
                                        <div className=" flex gap-2 items-center">
                                            <del className=" font-light text-xl text-red-400">${product?.price}</del><span className="text-green-500">$
                                                {discountPrice}</span>
                                        </div>
                                    </>
                                ) : (
                                    product?.price
                                )}
                            </p>
                            <div>Discount {product?.discountPercentage}%</div>

                            <p className="flex items-center gap-2">{product.rating} <FaStar className="text-yellow-400"></FaStar></p>
                            <p>Abailable : <span className="text-green-500">{product.stock}</span></p>
                        </div>

                        <div className="my-5 md:my-10">
                            <p>{product?.description}</p>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex items-center btn">Check Out <MdShoppingCartCheckout className="text-2xl" /></button>
                            <button className="flex items-center btn">Add to Cart <FaCartShopping className="text-2xl" /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="my-6">
                    <div>
                        <p className=" md:text-2xl font-semibold my-6"> Customer Reviews</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  mb-8 gap-3 grow">
                        {product?.reviews.map((review) => {
                            const isoDate = review?.date;
                            const digitalDate = new Date(isoDate).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true,
                            });

                            return (
                                <>
                                    <div key={review?.date} className=" border p-4 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <p className="text-gray-600">{digitalDate}</p>
                                                <p className="font-semibold flex items-center mb-3 gap-2">
                                                    {review.reviewerName}
                                                    <span className="text-gray-700 flex items-center ">
                                                        <FaStar className=" text-lg text-yellow-500" /> {review.rating}

                                                    </span>
                                                </p>
                                                <p className="text-gray-600">{review.comment}</p>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div>
                        <p className=" md:text-2xl font-semibold my-6">More Details</p>
                    </div>
                    <table className="min-w-full border-collapse border border-gray-500">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-green-100 text-left">
                                    Name
                                </th>
                                <th className="border border-gray-300 px-4 py-2 bg-green-100 text-left">
                                    Info
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Brand</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product?.brand || "No-Brand"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Warranty</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product?.warrantyInformation || "No-Warranty"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                    Shipping Information
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product?.shippingInformation || "N/A"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                    Minimum Order Quantity
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product?.minimumOrderQuantity || 1}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                    Return Policy
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product?.returnPolicy || "N/A"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                    Dimensions
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    width: {product?.dimensions.width}, height:{" "}
                                    {product?.dimensions.height}, depth: {product?.dimensions.depth}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section >
    );
};

export default ProductDetails;
