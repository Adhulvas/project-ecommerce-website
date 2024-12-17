import React, { useEffect, useState } from 'react'
import view from '../../assets/view.svg'
import remove from '../../assets/delete.svg'
import edit from '../../assets/edit.svg'
import { useNavigate } from 'react-router-dom';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';
import { axiosInstance } from '../../config/axiosInstance';
import { ConfirmModal } from '../../components/seller/ConfirmModal';

export const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async ()=>{
    try {
      const response = await axiosInstance.get('product/get-all-products')
      console.log(response)
      setProducts(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const { deleteProduct } = useDeleteProduct(fetchProducts);
  const navigate = useNavigate()

  useEffect(()=>{
    fetchProducts()
  },[])

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(selectedProduct); 
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Product List</h2>
        <div className="flex gap-4">
          <select className="border border-gray-300 px-3 py-2 rounded">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-2">Product Name & Size</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Sub-Cat</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-start gap-3">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded" />
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-sm text-gray-600">Size: {product.availableSizes.join(", ")}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">₹{product.price}</td>
                <td className="px-4 py-2">
                  <p>{product.availableSizes.length > 0 ? 'In Stock' : 'Out of Stock'}</p>
                  <p className="text-sm text-gray-600">{product.sold || 0} Sold</p>
                </td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.subcategory}</td>
                <td className="px-4 py-2">
                  <span>⭐ {product.ratings}</span>
                  <span className="text-sm text-gray-600">({product.reviews.length} reviews)</span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button 
                      className="bg-blue-100 p-2 rounded"
                      onClick={() => navigate(`/admin/products/view/${product._id}`)}>
                      <img src={view} alt="" className='w-5 h-5'/>
                    </button>
                    <button 
                      className="bg-yellow-100 p-2 rounded"
                      onClick={() => navigate(`/admin/products/edit/${product._id}`)}>
                      <img src={edit} alt="" className='w-5 h-5'/>
                    </button>
                    <button
                      className="bg-red-100 p-2 rounded"
                      onClick={() => handleDeleteClick(product._id)}>
                      <img src={remove} alt="" className='w-5 h-5'/>
                    </button>

                    <ConfirmModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirmDelete}
                        message="Are you sure you want to delete this product?"
                      />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <button className="px-4 py-2 border rounded">Previous</button>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded">1</button>
          <button className="px-4 py-2 border rounded">2</button>
          <button className="px-4 py-2 border rounded">3</button>
        </div>
        <div>
          <button className="px-4 py-2 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};