import { useParams } from "react-router-dom";

const ProductDetails = () => {

    const {id} = useParams();
    console.log(id)
    
    return (
        <div>
            <h2 className="text-2xl">HEllo from details page</h2>
        </div>
    );
};

export default ProductDetails;