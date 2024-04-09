import React from 'react';

import './ArtItem.css';

function ArtItem(props) {
  const { item, name, description, price, dimentions, author, country, medium, material, year, image, addToCart, addToWishlist, removeFromCart, removeFromWishlist, isInCart, isInWishlist} = props;

  return (
    <div className="ArtItem">
    <div className="art-item">
      <div className="art-item-image">
      <img src={image} alt={name} />
      {isInWishlist && (
              <div className="state-icon-container-01">
              <img className="state-icon-01" src="./images/hearth.png" alt="Wishlist Icon"/>
              </div> 
          )}
      {isInCart && (
              <div className="state-icon-container-02">
              <img className="state-icon-02" src="./images/cart.png" alt="Cart Icon"/>
              </div> 
          )}  
      <div className="art-item-purchase">

        {isInCart && !isInWishlist && (
            <>
            <div className="remove-move-container">
          <button className="add-to-wishlist-btn" onClick={() => addToWishlist(item)}>Move to Wishlist</button>
          <button className="remove-from-cart-btn" onClick={() => removeFromCart(item)}>Remove from Cart X </button>
          </div>
          </>
        )}
         {!isInCart && isInWishlist && (
                  <>
            <div className="remove-move-container">
          <button className="add-to-cart-btn" onClick={() => addToCart(item)}>Move to Cart</button>
          <button className="remove-from-wishlist-btn" onClick={() => removeFromWishlist(item)}>Remove from Wishlist X</button>
          </div>
          </>
       )}

        {!isInCart && !isInWishlist &&(
                  <>
          <button className="add-to-cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
          </>
        )}

        {!isInWishlist && !isInCart && (
                  <>
          <button className="add-to-wishlist-btn" onClick={() => addToWishlist(item)}>Add to Wishlist</button>
          </>
        )}

      </div>
      </div>
      <div className="art-item-info">
      <div className="art-item-text">
        <h3 className="art-item-name" >{name}</h3> 
        <p>{dimentions}</p>
        <p>{author}</p>
        <p className="extra-info"><em>{year}</em></p>
        <p className="extra-info">{country}, {medium}, {material}</p>
        </div>
        <span className="price">${price}</span>
        <p className="extra-info">
        <div className="more-info-icon-container">
        <h1>+</h1>
        </div>
        </p>
        </div>
    </div>
    </div>
  );
}
export default ArtItem;
