import React from "react";
import promobanner from '../../assets/promobanner.png'
import soccer from '../../assets/soccer.png'
import banner from '../../assets/banner.png'
import running from '../../assets/running.avif'
import training from '../../assets/training3.avif'
import studio from '../../assets/studio2.avif'
import basketball from '../../assets/basketball2.avif'
import football from '../../assets/football2.avif'
import finalbanner from '../../assets/finalbanner.png'
import { useFetchData } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const [products, loading, error] = useFetchData("/product/trending");
    const navigate = useNavigate();

    const handleViewDetails = (productId) => {
      navigate(`/productDetails/${productId}`);
    };

    const cardData = [
        { title: "Running", imageUrl: `${running}` },
        { title: "Training", imageUrl: `${training}` },
        { title: "Football", imageUrl: `${football}` },
        { title: "Basketball", imageUrl: `${basketball}` },
        { title: "Studio", imageUrl: `${studio}` },
    ];


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    

    return (
    <div>
        <section
            className="relative w-full h-[600px] bg-cover bg-center mt-16"
            style={{
                backgroundImage: `url(${banner})` ,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
            <div className="flex flex-col items-start justify-center h-full relative text-white pl-10">
                <h1 className="text-5xl font-bold mb-2">Exclusive Winter Sale</h1>
                <p className="text-xl mb-4">Get up to 50% off on selected items.</p>
                <button className="bg-white text-black py-2 px-6 rounded hover:bg-gray-200 transition">
                    Discover Deals
                </button>
            </div>
        </section>

        <section 
          className="relative w-full h-[400px] bg-cover bg-center mt-5"
          style={{ 
            backgroundImage: `url(${promobanner})` 
            }}>
            <div className="absolute inset-0 bg-black opacity-15"></div>
            <div className="flex flex-col items-center justify-end h-full relative text-white text-center">
                <button className="bg-white text-black py-2 px-6 rounded mb-4">Shop Now</button>
            </div>
        </section>

        <section
            className="relative w-full h-[600px] bg-cover bg-center mt-8"
            style={{
                backgroundImage: `url(${soccer})` ,
            }}
        >
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/90 to-transparent"></div>
            <div className="flex flex-col items-end justify-end h-full relative text-white pr-10 text-right">
                <h1 className="text-5xl font-bold mb-2 drop-shadow-md">Elevate Your Game</h1>
                <p className="text-xl mb-4 drop-shadow-md">Discover gear built for champions.</p>
                <button className="bg-rose-500 text-white py-2 px-6 mb-4 rounded hover:bg-rose-600 transition">
                    Explore Now
                </button>
            </div>
        </section>

        <section className="py-10 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">GEAR UP</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {cardData.map((card, index) => (
                        <div key={index} className="relative">
                            <img
                                src={card.imageUrl}
                                alt={card.title}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 ">
                                <h3 className="text-white text-lg font-semibold">{card.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section
            class="relative w-full h-[600px] bg-cover bg-center"
            style={{
                backgroundImage: `url(${finalbanner})`
            }}
            >
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
            <div class="flex flex-col items-start justify-center h-full relative text-white px-10">
                <h1 class="text-5xl font-bold mb-2">Unlock Your Potential</h1>
                <p class="text-xl mb-4">Discover gear that matches your ambition.</p>
                <button
                class="bg-red-500 hover:bg-red-600 py-2 px-6 rounded shadow-lg transform hover:scale-105 transition duration-300"
                >
                Shop Now
                </button>
            </div>
        </section>

        <section className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Top Trending</h2>
            <div className="flex gap-4 overflow-x-auto">
                {products.map((product, index) => (
                <div key={index} className="flex-shrink-0 w-80" onClick={()=>handleViewDetails(product._id)}>
                    <div className="relative">
                        <img src={product.images[0]} alt={product.name} className="w-full h-80 object-cover" />
                        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm">
                            {product.discount   }
                        </span>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <h3 className="text-sm font-semibold">{product.description}</h3>
                        <div className="text-red-600">{product.price}</div>
                    </div>
                </div>
                ))}
            </div>
        </section>
    </div>
    );
};