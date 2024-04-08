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

  const [mediumFilters, setMediumFilters] = useState([]); 
  const [materialFilters, setMaterialFilters] = useState([]);

  const toggleMediumFilters = (medium) => {
    setMediumFilters((currentFilters) => {
      if (currentFilters.includes(medium)) {
        return currentFilters.filter((m) => m !== medium);
      } else {
        return [...currentFilters, medium];
      }
    });
  };

  const removeMediumFilter = (medium) => {
    setMediumFilters((currentFilters) => currentFilters.filter((m) => m !== medium));
  };

   const toggleMaterialFilters = (material) => {
    setMaterialFilters((currentFilters) => {
      if (currentFilters.includes(material)) {
        return currentFilters.filter((m) => m !== material);
      } else {
        return [...currentFilters, material];
      }
    });
  };

  const removeMaterialFilter = (material) => {
    setMaterialFilters((currentFilters) => currentFilters.filter((m) => m !== material));
  };

  const filteredData = bakeryData.filter((item) => {
    const mediumMatches = mediumFilters.length === 0 || mediumFilters.includes(item.medium?.toLowerCase());
    const materialMatches = materialFilters.length === 0 || materialFilters.includes(item.material?.toLowerCase());
    return mediumMatches && materialMatches;
  });

  const [isButtonActive, setIsButtonActive] = useState(false);

  const [sortOrder, setSortOrder] = useState(null);

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.price - b.price;
    } else if (sortOrder === 'descending') {
      return b.price - a.price;
    }
    return 0;
  });

  const sortLabel = () => {
    if (sortOrder === 'ascending') {
      return 'Price: Low to High';
    } else if (sortOrder === 'descending') {
      return 'Price: High to Low';
    }
    return 'None';
  };

  const removeSortFilter = () => {
    setSortOrder(null);
  };

    const clearAll = () => {
      setMediumFilters([]);
      setMaterialFilters([]);
      setSortOrder(null);
    };  

  return (
    <div className="App">
      <h1>Unique artworks for sale</h1> 
      <div class="section-line"> </div> 
      <div className="sorting-filtering-page">
      <button className="clear-all-filter" onClick={clearAll}>Clear All</button>
      <h3>Filters applied:</h3>
          {mediumFilters.length === 0 && materialFilters.length === 0 ? (
            <span className="filter-label">None</span>
          ) : (
            <>
              {mediumFilters.map((filter, index) => (
                <span key={index} className="filter-label" onClick={() => removeMediumFilter(filter)}>
                  Medium: {filter} ×
                </span>
              ))}
              {materialFilters.map((filter, index) => (
                <span key={index} className="filter-label" onClick={() => removeMaterialFilter(filter)}>
                  Material: {filter} ×
                </span>
              ))}
            </>
          )}
            
        <h3>Sorted by:</h3>
  {sortOrder ? (
    <span className="filter-label" onClick={removeSortFilter}>
      {sortLabel()} ×
    </span>
  ) : (
    <span className="filter-label">None</span>
  )} 
           </div>
      <div class="section-line"> </div> 
      <div className="main-page">
      <div className="filters-page">
       <h2>Filter:</h2>
       <div class="subsection-line-02"> </div> 
        <h3>By medium</h3>
        <div class="subsection-line-03"> </div> 
          <button className="filters-button" onClick={() => toggleMediumFilters('oil')}>Oil</button>
          <button className="filters-button" onClick={() => toggleMediumFilters('watercolor')}>Watercolor</button>
          <button className="filters-button" onClick={() => toggleMediumFilters('acrylic')}>Acrylic</button>
          <div class="subsection-line-02"> </div> 
        <h3>By material</h3>
        <div class="subsection-line-03"> </div> 
          <button className="filters-button" onClick={() => toggleMaterialFilters('canvas')}>Canvas</button>
          <button className="filters-button" onClick={() => toggleMaterialFilters('paper')}>Paper</button>
          <div class="subsection-line-01"> </div> 
          <h2>Sort:</h2>
          <div class="subsection-line-02"> </div> 
          <h3>By price:</h3>
          <div class="subsection-line-03"> </div> 
          <div className="sort-buttons">
            <button className="filters-button" onClick={() => setSortOrder('ascending')}>High to low</button>
            <button className="filters-button" onClick={() => setSortOrder('descending')}>Low to high</button>
          </div>
        </div>  
        <div class="vertical-line"> </div> 
      <div className="items-page">
          {sortedData.map((item, index) => ( 
            <BakeryItem
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
            dimentions={item.dimentions}
            author={item.author}
            country={item.country}
            medium={item.medium}
            material={item.material}
            year={item.year}
            price={item.price}
            addToCart={() => addToCart(item)}
            addToWishlist={() => addToWishlist(item)}
            />
          ))}
      </div>
      <div class="vertical-line"> </div> 
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
          <div class="subsection-line-01"> </div> 

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
