import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const UpdateProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  console.log(data)

  if (loading) {
    return  <div className="flex justify-center items-center"><BounceLoader className="text-3xl" /></div>
  }

  return (
    <div>
      <ProductForm type="update" data={data} />
    </div>
  );
};

export default UpdateProduct;
