import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { Card } from "../../components/user/Card";
import { AiFillCaretRight } from "react-icons/ai";

export const ProductListing = () => {
  const { categoryName, subcategoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/product/categories/${categoryName}/${subcategoryName}`);
        setProducts(response.data.data);
        console.log(response.data.data)
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName, subcategoryName]);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-24 p-8">
      <nav className="mb-6 text-sm text-gray-600">
        <ul className="flex space-x-2">
          <li>
            <Link to="/" className="text-red-500 text-xl font-bold hover:underline">
              Home
            </Link>
          </li>
          <li className="flex items-center"><AiFillCaretRight/></li>
          <li className="capitalize text-xl font-bold">{categoryName}</li>
          <li className="flex items-center"><AiFillCaretRight   /></li>
          <li className="capitalize text-xl font-bold">{subcategoryName}</li>
        </ul>
      </nav>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found for this subcategory.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
