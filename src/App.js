import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [mediumFilter, setMediumFilter] = useState(''); 
  const [materialFilter, setMaterialFilter] = useState('');

  const addMediumFilter = (medium) => {
    setMediumFilter(medium);
  };

  const addMaterialFilter = (material) => {
    setMaterialFilter(material);
  };
 
  const clearFilters = () => {
    setMediumFilter('');
    setMaterialFilter('');
  };

  const filteredData = bakeryData.filter((item) => {
    return (mediumFilter === '' || item.medium.toLowerCase() === mediumFilter.toLowerCase()) &&
           (materialFilter === '' || item.material.toLowerCase() === materialFilter.toLowerCase());
  });

  
  const addToCart = (itemToAdd) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(item => item.id === itemToAdd.id);
      if (existingItemIndex > -1) {
        const updatedCartItems = [...prevCartItems];
        const existingItem = updatedCartItems[existingItemIndex];
        updatedCartItems[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const addToWishlist = (itemToAdd) => {
    setWishlistItems((prevWishlistItems) => {
      const isAlreadyInWishlist = prevWishlistItems.some(item => item.id === itemToAdd.id);
      if (!isAlreadyInWishlist) {
        return [...prevWishlistItems, itemToAdd];
      }
      return prevWishlistItems;
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );


  return (
    <div className="App">
      <h1>Available artworks for sale</h1> 
      <div className="main-page">
      <div className="filters-page">
       <h2>Filter</h2>
       <h2>By medium</h2>
          <button className="filters-btn" onClick={() => addMediumFilter('Oil')}>Oil</button>
          <button className="filters-btn" onClick={() => addMediumFilter('Watercolor')}> Watercolor</button>
          <button className="filters-btn" onClick={() => addMediumFilter('Acrilic')}>Acrilic</button>
          <button className="filters-btn" onClick={clearFilters}>Clear Filter</button>
        <h2>By material</h2>  
          <button className="filters-btn" onClick={() => addMaterialFilter('Canvas')}>Canvas</button>
          <button className="filters-btn" onClick={() => addMaterialFilter('Paper')}>Paper</button>

          <button className="filters-btn" onClick={clearFilters}>Clear Filters</button>
        </div>  
      <div className="items-page">
          {filteredData.map((item, index) => ( 
            <BakeryItem
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
            dimentions={item.dimentions}
            author={item.author}
            country={item.country}
            medium={item.medium}
            year={item.year}
            price={item.price}
            addToCart={() => addToCart(item)}
            addToWishlist={() => addToWishlist(item)}
            />
          ))}
      </div>
      
      <div className="cart-page">
       <h2>My cart</h2>
         {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <p>{item.name} x {item.quantity}</p>
                </div>
              ))}
              <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}

          <h2>My Wishlist</h2>
          {wishlistItems.length > 0 ? (
            <>
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <p>{item.name}</p>
                </div>
              ))}
            </>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
    
        </div>
        </div>
      </div>
  );
}

export default App;
