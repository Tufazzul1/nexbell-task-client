import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

const EditProduct = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all products (you can replace this with your actual fetching logic)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                const result = await response.json();
                setData(result.products);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    // Delete product function
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });
                // Remove deleted product from the UI
                setData((prevData) => prevData.filter((product) => product.id !== id));
                console.log(result);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to delete the product!",
                });
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (loading) {
        return (
            <div><BounceLoader className="flex justify-center text-3xl" /></div>
        )
    }


    return (

        <div className="p-4">
            <div className="mb-3 border-b pb-2">
                <h2 className="text-2xl font-semibold">Update / Delete Products</h2>
            </div>
            <div className="relative overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="py-3 px-6 border">Product Id</th>
                            <th className="py-3 px-6 border">Product Name</th>
                            <th className="py-3 px-6 border">Price</th>
                            <th className="py-3 px-6 border">Stock</th>
                            <th className="py-3 px-6 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 border">{product.id}</td>
                                <td className="py-4 px-6 border">{product.title}</td>
                                <td className="py-4 px-6 border">$ {product.price}</td>
                                <td className="py-4 px-6 border">{product.stock}</td>
                                <td className="py-4 px-6 border flex justify-center gap-2">
                                    <Link to={`/dashboard/products/edit/update/${product.id}`}>
                                        <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-all">
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="px-4 py-2 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-all"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default EditProduct;
