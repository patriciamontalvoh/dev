import React from 'react';

import './BakeryItem.css';

function BakeryItem(props) {
  const { name, description, price, dimentions, author, country, medium, year, image, addToCart, addToWishlist } = props;

  return (
    <div className="BakeryItem">
    <div className="bakery-item">
      <div className="bakery-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="bakery-item-info">
      <div className="bakery-item-text">
        <h3 className="bakery-item-name" >{name}</h3> 
        <p>{description}</p>
        <p>{dimentions}</p>
        <p>{author}</p>
        <p>{country}</p>
        <p>{medium}</p>
        <p>{year}</p>
        </div>
        <div className="bakery-item-purchase">
          <span className="price">${price}</span>
          <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
          <button className="add-to-wishlist-btn" onClick={addToWishlist}>Add to wishlist</button>
        </div>
      </div>
    </div>
    </div>
  );
}
export default BakeryItem;
