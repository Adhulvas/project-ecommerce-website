import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Card = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/productDetails/${product._id}`);
  };

  const image = product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150";

  return (
    <div
      className="card bg-base-100 w-full max-w-[380px] shadow-lg cursor-pointer mx-auto"
      onClick={handleViewDetails}>
      <figure className="p-4">
        <img
          src={image}
          alt={product.name}
          className="rounded-lg object-cover h-[300px] w-full"/>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base font-semibold text-gray-500">{product.name}</h2>
        <p className="text-sm text-gray-400">{product.description}</p>
        <div className="card-actions mt-3 flex justify-between">
          <div className="badge badge-outline text-sm">{product.category}</div>
          <div className="badge badge-outline text-sm">{product.subcategory}</div>
        </div>
      </div>
    </div>
  );
};
