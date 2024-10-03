import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products));
    }, []);

    console.log(products)


    return (
        <div>
            <h2 className="text-6xl">Hello From Product page </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 my-10">
                {
                    products.map(product => (
                        <ProductCard
                            key={product?.id}
                            product={product}
                        >
                        </ProductCard>
                    )
                    )
                }
            </div>
        </div>
    );
};

export default Products;