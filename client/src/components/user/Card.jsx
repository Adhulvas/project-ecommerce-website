import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Card = ({ product }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/productDetails/${product._id}`);
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl cursor-pointer" onClick={handleViewDetails}>
      <figure>
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name || "Product Image"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {/* {product.isNew && <div className="badge badge-secondary">NEW</div>} */}
        </h2>
        <p>{product.description || "No description available."}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{product.category}</div>
          <div className="badge badge-outline">{product.subcategory}</div>
        </div>
      </div>
    </div>
  );
};

