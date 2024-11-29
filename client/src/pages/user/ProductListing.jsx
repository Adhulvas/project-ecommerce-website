import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { Card } from "../../components/user/Card";

export const ProductListing = () => {
  const { categoryName, subcategoryName } = useParams();
  console.log('Params============', categoryName, subcategoryName);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/product/categories/${categoryName}/${subcategoryName}`);
        console.log(response)
        setProducts(response.data.data);
      } catch (err) {
        console.log(err)
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName,subcategoryName]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-24 p-8">
      {products.length === 0 ? (
        <p className="text-gray-500">No products found for this subcategory.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};