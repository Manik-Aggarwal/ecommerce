import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from "@material-ui/lab";
import "./home.css";

const ProductCard = ({product}) => {
    const options = {
        value: product.rating,
        size:"small",
        readOnly: true,
        precision: 0.5,
      };
  return (
      <Link className="productCard" to={`/product/${product._id}`}>
        {product.images && product.images.length > 0 ? (
            <img src={product.images[0].url} alt={product.name} />
            ) : (
            <img src="/images/default.jpg" alt={product.name} />
            )}
            
          <p>{product.name}</p>
          <div id='hello'>
              <Rating {...options}/><span className="productCardspan"> ({product.numOfReviews} Reviews)</span>
          </div>
          <span>{`₹${product.price}`}</span>
      </Link>
  )
}

export default ProductCard