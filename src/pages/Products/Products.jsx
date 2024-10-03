import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("")
    const [originalProducts, setOriginalProducts] = useState([]);

    // Fetch products when component mounts
    useEffect(() => {
        setLoading(true);
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data.products);
                setAllProducts(data.products);
                setOriginalProducts(data.products);
                setLoading(false);
            });
    }, []);

    // Handle search input
    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchValue(search);

        const filteredData = allProducts.filter((product) =>
            product.title.toLowerCase().includes(search)
        );

        // Apply sorting if sorting option is selected
        if (sort) {
            const sortedData = sortProducts(filteredData, sort);
            setProducts(sortedData);
        } else {
            setProducts(filteredData);
        }
    };

    // Sort products based on dropdown value
    const sortProducts = (data, order) => {
        return [...data].sort((a, b) =>
            order === "asc" ? a.price - b.price : b.price - a.price
        );
    };

    // Handle sorting through dropdown
    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);

        // Sort products and apply search filter if active
        const sortedData = sortProducts(products, selectedSort);
        setProducts(sortedData);
    };

    const handleReset = () => {
        setSort("");
        setProducts(originalProducts);
    };

    // Handle category filter
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFilter(selectedCategory);

        if (selectedCategory === "") {
            setProducts(originalProducts);
        } else {
            const filteredProducts = originalProducts.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
            setProducts(filteredProducts);
        }
    };

    return (
        <div>
            <div className="mb-5 flex justify-center">
                <input
                    type="text"
                    placeholder="Search here"
                    value={searchValue}
                    onChange={handleSearch}
                    className="bg-gray-100 outline-none border border-gray-500 px-3 w-64 rounded-full py-2"
                />
            </div>

            <div className="flex gap-3 md:gap-5 justify-center">
                <div>
                    <select
                        onChange={handleSortChange}
                        value={sort}
                        name="sort"
                        id="sort"
                        className="border px-2 md:px-4 py-1 rounded-md"
                    >
                        <option value="">Sort By Price</option>
                        <option value="dsc">High To Low</option>
                        <option value="asc">Low To High</option>
                    </select>
                </div>
                <div>
                    <select
                        onChange={handleCategoryChange}
                        value={filter}
                        name="category"
                        id="category"
                        className="border px-2 py-1 md:px-4 rounded-lg"
                    >
                        <option value="">Filter By Category</option>
                        <option value="beauty">Beauty</option>
                        <option value="fragrances">Fragrances</option>
                        <option value="groceries">Groceries</option>
                    </select>
                </div>
                <div>
                    <button onClick={handleReset} className="btn btn-sm">
                        Reset
                    </button>
                </div>
            </div>

            {/* Loading state */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 my-10 p-2">
                    {products.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;