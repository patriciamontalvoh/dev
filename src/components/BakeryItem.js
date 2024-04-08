import React from 'react';

import './BakeryItem.css';

function BakeryItem(props) {
  const { name, description, price, dimentions, author, country, medium, material, year, image, addToCart, addToWishlist } = props;

  return (
    <div className="BakeryItem">
    <div className="bakery-item">
      <div className="bakery-item-image">
      <img src={image} alt={name} />
      <div className="bakery-item-purchase">
          <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
          <button className="add-to-wishlist-btn" onClick={addToWishlist}>Add to wishlist</button>
        </div>
      </div>
      <div className="bakery-item-info">
      <div className="bakery-item-text">
        <h3 className="bakery-item-name" >{name}</h3> 
        <p>{dimentions}</p>
        <p>{author}</p>
        <p className="extra-info"><em>{year}</em></p>
        <p className="extra-info">{country}, {medium}, {material}</p>
        </div>
        <span className="price">${price}</span>
        </div>
    </div>
    </div>
  );
}
export default BakeryItem;
