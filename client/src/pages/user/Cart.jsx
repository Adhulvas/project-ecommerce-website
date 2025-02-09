import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import remove from '../../assets/delete.svg';
import { useNavigate } from "react-router-dom";
import { useFetchCart } from "../../hooks/useFetchCart";
import { removeItem } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";


export const Cart = () => {
  const [cart, loading, error, refetchCart] = useFetchCart("/cart/get-cartItems");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleQuantityChange = async (productId, newQuantity, size = null) => {
    if (newQuantity <= 0) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    try {
      const response = await axiosInstance.patch("/cart/update-quantity", {
        productId,
        quantity: newQuantity,
        size,
      });

      toast.success(response.data?.message || "Quantity updated successfully");
      await refetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  };


  const handleDeleteItem = async (productId,size) => {
    try {
      const response = await axiosInstance.delete(`/cart/remove-product/${productId}`);
      toast.success(response.data?.message || "Item removed successfully");

      dispatch(removeItem({productId,size}));

      await refetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  };
  
  
  if (loading) {
    return <div className="text-center mt-28 text-lg">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center mt-28 text-red-500">{error}</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center mt-28">
        <h1 className="text-2xl font-bold mb-4">Your Shopping Cart is Empty</h1>
        <p className="text-gray-600">
          Browse our products and add something to your cart!
        </p>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4 sm:p-8 mt-28 flex flex-col lg:flex-row gap-8 text-gray-800">
      {/* Cart Items Section */}
      <div
        className="flex-1 overflow-y-auto max-h-[90vh] space-y-4 pr-0 lg:pr-4"
        style={{ scrollbarGutter: "stable" }}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-4 uppercase tracking-wide text-base-content">
          My Shopping Cart
        </h1>
        {cart.items.map((item) => (

          <div
            key={item.productId}
            className="flex flex-col sm:flex-row items-center border border-gray-300 p-4 bg-white shadow-sm"
          >
            <img
              src={item.image || "https://via.placeholder.com/100"}
              onClick={() => navigate(`/productDetails/${item.productId}`)}
              alt={item.productName}
              className="w-full sm:w-32 md:w-48 h-48 object-cover rounded-lg cursor-pointer"
            />
            <div className="flex-grow px-4 mt-4 sm:mt-0 text-center sm:text-left">
              <h2 className="text-lg font-semibold">{item.productDescription}</h2>
              <p className="text-sm text-gray-500">Size: {item.size || "NA"}</p>
              <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
              <p className="text-sm font-bold text-gray-800">
                Subtotal: ₹{item.subtotal}
              </p>
              <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center mt-2">
                <span className="text-sm text-gray-500 mr-2">Quantity:</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    handleQuantityChange(item.productId, Number(e.target.value), item.size)}
                  }
                  className="border px-2 py-1 w-16 rounded text-center"
                />
              </div>
            </div>


            <button onClick={() => handleDeleteItem(item.productId,item.size)} className="mt-4 sm:mt-0 sm:ml-2">
              <img src={remove} alt="Remove" className="w-8 h-8 mx-auto sm:mx-0 cursor-pointer" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="w-full lg:w-1/4 flex flex-col justify-start">
        <div className="border border-gray-300 p-6 bg-gray-50 shadow-lg flex flex-col">
          <div>
            <h2 className="text-lg font-semibold uppercase text-gray-700 mb-6 text-center lg:text-left">
              Summary
            </h2>
            <div className="flex justify-between mb-4">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-semibold">₹{cart.totalPrice}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-gray-600">Shipping Cost</p>
              <p className="font-semibold">₹0</p>
            </div>
            <hr className="border-gray-300 mb-4" />
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <p>Grand Total</p>
              <p>₹{cart.totalPrice}</p>
            </div>
          </div>
          <div>
            <button className="w-full mt-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
            onClick={()=>navigate('/checkout')}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}  