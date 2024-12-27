import promobanner from '../../assets/promobanner.jpg'
import soccer from '../../assets/soccer.jpg'
import banner from '../../assets/banner.jpg'
import finalbanner from '../../assets/finalbanner2.png'
import { useFetchData } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const [trendingProducts, loading, error] = useFetchData("/product/trending");
    const [featuredProducts] = useFetchData("/product/featured");
    
    const navigate = useNavigate();

    const handleViewDetails = (productId) => {
      navigate(`/productDetails/${productId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;


    return (
    <div>
        <section
            className="relative w-full h-[50vh] sm:h-[600px] bg-cover bg-center mt-16"
            style={{
                backgroundImage: `url(${banner})`,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
            <div className="flex flex-col items-start justify-center h-full relative text-white pl-4 sm:pl-10">
                <h1 className="text-3xl sm:text-5xl font-bold mb-2">Exclusive Winter Sale</h1>
                <p className="text-lg sm:text-xl mb-4">Get up to 50% off on selected items.</p>
                <button
                    className="relative py-2 px-6 font-semibold text-white rounded-lg bg-gradient-to-br from-green-400 to-cyan-500 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:bg-gradient-to-l hover:from-cyan-500 hover:to-green-400 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-200"
                    onClick={() => navigate("/categories/Women/Clothing")}
                >
                    Discover Deals
                </button>
            </div>
        </section>

        <section 
            className="relative w-full h-[40vh] sm:h-[400px] bg-cover bg-center my-5"
            style={{ 
                backgroundImage: `url(${promobanner})` 
            }}>
            <div className="absolute inset-0 bg-black opacity-15"></div>
            <div className="flex flex-col items-center justify-end h-full relative text-white text-center">
                <button
                    className="relative py-3 mb-5 px-8 font-bold text-white rounded-lg bg-gradient-to-br from-stone-500 to-yellow-500 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-bl hover:from-pink-500 hover:to-stone-500 active:scale-95 focus:outline-none focus:ring-4 focus:ring-pink-200"
                    onClick={() => navigate("/categories/Men/Clothing")}
                    >
                    Shop Now
                </button>
            </div>
        </section>

        <section
            className="relative w-full h-[50vh] sm:h-[600px] bg-cover bg-center"
            style={{
                backgroundImage: `url(${soccer})`,
            }}
        >
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/90 to-transparent"></div>
            <div className="flex flex-col items-end justify-end h-full relative text-white pr-4 sm:pr-10 text-right">
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 drop-shadow-md">Elevate Your Game</h1>
                <p className="text-lg sm:text-xl mb-4 drop-shadow-md">Discover gear built for champions.</p>
                <button
                    className="relative py-2 px-6 font-semibold text-white bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg shadow-md transition-all duration-500 ease-in-out hover:shadow-lg hover:bg-gradient-to-tl hover:from-pink-600 hover:to-rose-500 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300 before:absolute before:inset-1 before:border-2 before:border-transparent before:rounded-lg before:transition-all before:duration-500 hover:before:border-white mb-4"
                    onClick={() => navigate("/categories/Sports/Football")}
                >
                    Explore Now
                </button>
            </div>
        </section>

        <section className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
            <div className="flex gap-4 overflow-x-auto">
                {featuredProducts.map((product, index) => (
                    <div key={index} className="flex-shrink-0 w-60 sm:w-80" onClick={() => handleViewDetails(product._id)}>
                        <div className="relative">
                            <img src={product.images[0]} alt={product.name} className="w-full h-60 sm:h-80 object-cover" />
                            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm">
                                {product.discount}
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

        <section
            className="relative w-full h-[50vh] sm:h-[600px] bg-cover bg-center"
            style={{
                backgroundImage: `url(${finalbanner})`
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
            <div className="flex flex-col items-start justify-center h-full relative text-white px-4 sm:px-10">
                <h1 className="text-3xl sm:text-5xl font-bold mb-2">Unlock Your Potential</h1>
                <p className="text-lg sm:text-xl mb-4">Discover gear that matches your ambition.</p>
                <button
                    className="relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
                    onClick={() => navigate("/categories/Women/Clothing")}
                >
                    <span className="absolute inset-0 bg-white opacity-10 blur-lg transition duration-300"></span>
                    <span className="relative">Shop Now</span>
                </button>
            </div>
        </section>

        <section className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Top Trending</h2>
            <div className="flex gap-4 overflow-x-auto">
                {trendingProducts.map((product, index) => (
                    <div key={index} className="flex-shrink-0 w-60 sm:w-80" onClick={() => handleViewDetails(product._id)}>
                        <div className="relative">
                            <img src={product.images[0]} alt={product.name} className="w-full h-60 sm:h-80 object-cover" />
                            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm">
                                {product.discount}
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