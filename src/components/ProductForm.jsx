import PropTypes from "prop-types";
import { useState } from "react";
import Swal from "sweetalert2";

// Function to add a new product
const addProduct = async (formData) => {
    return await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    }).then(res => res.json());
};

// Function to update an existing product
const updateProduct = async (formData, productId) => {
    return await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    }).then(res => res.json());
};

const ProductForm = ({ data, type }) => {

    const formateText = type ? type[0].toUpperCase() + type.slice(1) : "";

    const [formData, setFormData] = useState({
        title: data ? data.title : "",
        description: data ? data.description : "",
        category: data ? data.category : "",
        price: data ? data.price : "",
        discountPercentage: data ? data.discountPercentage : "",
        stock: data ? data.stock : "",
        tags: "",
        brand: data ? data.brand : "",
        sku: data ? data.sku : "",
        weight: data ? data.weight : "",
        dimensions: {
            width: data ? data.dimensions.width : "",
            height: data ? data.dimensions.height : "",
            depth: data ? data.dimensions.depth : "",
        },
        warrantyInformation: data ? data.warrantyInformation : "",
        shippingInformation: data ? data.shippingInformation : "",
        availabilityStatus: data ? data.availabilityStatus : "",
        returnPolicy: data ? data.returnPolicy : "",
        minimumOrderQuantity: data ? data.minimumOrderQuantity : "",
        meta: {
            createdAt: "",
            updatedAt: "",
            barcode: "",
            qrCode: "",
        },
        images: data ? data.images[0] : "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            dimensions: {
                ...formData.dimensions,
                [name]: value,
            },
        });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === "add") {
                const res = await addProduct(formData);
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product Added",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                const res = await updateProduct(formData, data.id);
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product Updated",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (e) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error, try again",
                showConfirmButton: false,
                timer: 1500,
            });
            console.log(e);
        }
    };

    return (

        <div>
            <div className="mb-6 text-center mt-5 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold">{formateText} Product</h2>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <form onSubmit={formSubmit} className="flex flex-col gap-6">
                    {/* Title Input */}
                    <div className="w-full">
                        <label className="block mb-1 font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                            placeholder="Enter product title"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="w-full">
                        <label className="block mb-1 font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    {/* Category and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Enter product category"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Enter product price"
                            />
                        </div>
                    </div>

                    {/* Discount Percentage and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Discount Percentage</label>
                            <input
                                type="number"
                                step="0.01"
                                name="discountPercentage"
                                value={formData.discountPercentage}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Enter discount percentage"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Enter stock quantity"
                            />
                        </div>
                    </div>

                    {/* Tags and Brand */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Tags</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Comma-separated tags"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Enter brand name"
                            />
                        </div>
                    </div>

                    {/* SKU and Weight */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">SKU</label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Enter SKU"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Weight</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Enter weight"
                            />
                        </div>
                    </div>
                    {/* shipping and  minimum */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Shiping</label>
                            <input
                                type="text"
                                name="shippingInformation"
                                value={formData.shippingInformation}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Shipping information"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Minimum Quantity</label>
                            <input
                                type="number"
                                name="minimumOrderQuantity"
                                value={formData.minimumOrderQuantity}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Minimum Quantity"
                            />
                        </div>
                    </div>
                    {/* Warenty and Return */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Warenty</label>
                            <input
                                type="text"
                                name="warrantyInformation"
                                value={formData.warrantyInformation}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Warenty information"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Return Policy</label>
                            <input
                                type="number"
                                name="returnPolicy"
                                value={formData.returnPolicy}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                placeholder="Return policy"
                            />
                        </div>
                    </div>

                    {/* Dimensions */}
                    <fieldset className="border border-gray-300 p-4 rounded-md">
                        <legend className="text-lg font-medium text-gray-700">Dimensions</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Width</label>
                                <input
                                    type="number"
                                    name="width"
                                    value={formData.dimensions.width}
                                    onChange={handleDimensionChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                    placeholder="Enter width"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Height</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.dimensions.height}
                                    onChange={handleDimensionChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                    placeholder="Enter height"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Depth</label>
                                <input
                                    type="number"
                                    name="depth"
                                    value={formData.dimensions.depth}
                                    onChange={handleDimensionChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                                    placeholder="Enter depth"
                                />
                            </div>
                        </div>
                    </fieldset>

                    <div className="w-full">
                        <label className="block mb-1 font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            name="images"
                            value={formData.images}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 outline-none"
                            placeholder="Enter Image URL"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="btn w-full bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition"
                        >
                            {type === "add" ? "Add Product" : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

// PropTypes validation
ProductForm.propTypes = {
    data: PropTypes.object,
    type: PropTypes.oneOf(["add", "update"]),
};

export default ProductForm;
