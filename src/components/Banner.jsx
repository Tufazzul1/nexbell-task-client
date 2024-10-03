import { Link } from "react-router-dom";
import BannerImg from "../../public/banner.png"


const Banner = () => {
    return (
        <div className="hero min-h-[500px] lg:min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-gray-50 px-4">
            <div className=" text-neutral-content flex-1">
                <div className="">
                    <h1 className="mb-5 text-3xl pt-10 md:text-5xl text-black font-bold">Welcome to <span className='text-green-500'>Our <br /> Shop</span></h1>
                    <Link to={'/products'} className="btn bg-green-500 border-green-500 hover:border-green-500 hover:text-black"><span className='text-white'>Our Products</span></Link>
                </div>
            </div>
            <div className="flex-1">
                <img src={BannerImg} alt="" />
            </div>
        </div>
    );
};

export default Banner;