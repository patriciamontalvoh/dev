import "./App.css";
import { useState } from "react";
import ArtData from "./assets/art-data.json";
import ArtItem from "./components/ArtItem";

ArtData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function generateLabels(items, removeFromFunction) {
  return items.map((item, index) => (
    <div key={index} className="item-label-container">
      <span className="item-label">
        {item.name}
      </span>
      <button className="remove-item-btn" onClick={() => removeFromFunction(item)}> X </button>
    </div>
  ));
}

function App() {
  const[cartItems, setCartItems] = useState([]);
  const[wishlistItems, setWishlistItems] = useState([]);
  const[mediumFilters, setMediumFilters] = useState([]);
  const[authorFilters, setAuthorFilters] = useState([]);
  const[materialFilters, setMaterialFilters] = useState([]);
  const[priceSortOrder, setPriceSortOrder] = useState('');
  const[sizeSortOrder, setSizeSortOrder] = useState('');
  const[isCartNotificationVisible, setIsCartNotificationVisible] = useState(false);
  const[isWishlistNotificationVisible, setIsWishlistNotificationVisible] = useState(false);
  const[wishlistNotification, setWishlistNotification] = useState('');
  const[CartNotification, setCartNotification] = useState('');
  const[RemoveFromCartNotification, setRemoveFromCartNotification] = useState('');
  const[RemoveFromWishlistNotification, setRemoveFromWishlistNotification] = useState('');
  const[isRemoveFromCartNotificationVisible, setIsRemoveFromCartNotificationVisible] = useState(false);
  const[isRemoveFromWishlistNotificationVisible, setIsRemoveFromWishlistNotificationVisible] = useState(false);
  const [isCartClearedNotificationVisible, setIsCartClearedNotificationVisible] = useState(false);
  const [isWishlistClearedNotificationVisible, setIsWishlistClearedNotificationVisible] = useState(false);
  const [isAllFiltersClearedNotificationVisible, setIsAllFiltersClearedNotificationVisible] = useState(false);

  const addToCart= (itemToAdd) => {
    setCartItems((prevCartItems) => {
      const isAlreadyInCart = prevCartItems.some(item => item.id === itemToAdd.id);
      const isAlreadyInWishlist = wishlistItems.some(item => item.id === itemToAdd.id);
      const newCartItems = [...prevCartItems, itemToAdd];
      if (!isAlreadyInWishlist && !isAlreadyInCart) {
        setCartNotification(
          <span>
            <strong className="notifiaction-message"> Congratulations! </strong> 
            <strong className="cart-item-name">{itemToAdd.name}</strong> has been added to your cart
          </span>
        );
        setIsCartNotificationVisible(true); 

        setWishlistItems(prevWishlistItems =>
          prevWishlistItems.filter(item => item.id !== itemToAdd.id)
        );

        return newCartItems;

      } else if (isAlreadyInWishlist) {
        setCartNotification(
          <span>
            <strong className="notifiaction-message"> Congratulations! </strong> 
            <strong className="cart-item-name">{itemToAdd.name}</strong> has been moved to your cart
          </span>
        );
        setIsCartNotificationVisible(true);

        setWishlistItems(prevWishlistItems =>
          prevWishlistItems.filter(item => item.id !== itemToAdd.id)
        );

        return newCartItems;
              }
        return prevCartItems;
      });
    };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const addToWishlist = (itemToAdd) => {
    setWishlistItems((prevWishlistItems) => {
      const isAlreadyInWishlist = prevWishlistItems.some(item => item.id === itemToAdd.id);
      const isAlreadyInCart = cartItems.some(item => item.id === itemToAdd.id);
      const newWishlistItems = [...prevWishlistItems, itemToAdd];
      if (!isAlreadyInWishlist && !isAlreadyInCart) {
        setWishlistNotification(
          <span>
            <strong className="notifiaction-message"> Congratulations! </strong> 
            <strong className="wishlist-item-name">{itemToAdd.name}</strong> has been added to your wishlist
          </span>
        );
        setIsWishlistNotificationVisible(true); 

        setCartItems(prevCartItems =>
          prevCartItems.filter(item => item.id !== itemToAdd.id)
        );

        return newWishlistItems;

      } else if (isAlreadyInCart) {
        setWishlistNotification(
          <span>
            <strong className="notifiaction-message"> Congratulations! </strong> 
            <strong className="wishlist-item-name">{itemToAdd.name}</strong> has been moved to your wishlist
          </span>
        );
        setIsWishlistNotificationVisible(true);

        setCartItems(prevCartItems =>
          prevCartItems.filter(item => item.id !== itemToAdd.id)
        );

        return newWishlistItems;
              }
        return prevWishlistItems;
      });
    };

    const removeFromCart = (itemToRemove) => {
      setCartItems((prevCartItems) => 
        prevCartItems.filter((item) => item.id !== itemToRemove.id)
      );
      setRemoveFromCartNotification(
        <span>
          <strong className="notifiaction-message">{itemToRemove.name}</strong> removed from cart 
        </span>
      );
      setIsRemoveFromCartNotificationVisible(true);
    };
  
    const removeFromWishlist = (itemToRemove) => {
      setWishlistItems((prevWishlistItems) => 
        prevWishlistItems.filter((item) => item.id !== itemToRemove.id)
      );
      setRemoveFromWishlistNotification(
        <span>
          <strong className="notifiaction-message">{itemToRemove.name}  </strong> removed from wishlist
        </span>
      );
      setIsRemoveFromWishlistNotificationVisible(true);
    };

  const hideCartNotification = () => {
    setIsCartNotificationVisible(false);
    setCartNotification('');
  };
  
  const hideWishlistNotification = () => {
    setIsWishlistNotificationVisible(false);
    setWishlistNotification('');
  };

  const hideRemoveFromWishlistNotification = () => {
    setIsRemoveFromWishlistNotificationVisible(false);
    setRemoveFromWishlistNotification('');
  };

  const hideRemoveFromCartNotification = () => {
    setIsRemoveFromCartNotificationVisible(false);
    setRemoveFromCartNotification('');
  };


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

  const toggleAuthorFilters = (authorn) => {
    setAuthorFilters((currentFilters) => {
      if (currentFilters.includes(authorn)) {
        return currentFilters.filter((m) => m !== authorn);
      } else {
        return [...currentFilters, authorn];
      }
    });
    };
  
    const removeAuthorFilter = (authorn) => {
      setAuthorFilters((currentFilters) => currentFilters.filter((m) => m !== authorn));
    };

    
  const filteredData =ArtData.filter((item) => {
    const mediumMatches = mediumFilters.length === 0 || mediumFilters.includes(item.medium?.toLowerCase());
    const materialMatches = materialFilters.length === 0 || materialFilters.includes(item.material?.toLowerCase());
    const authorMatches = authorFilters.length === 0 || authorFilters.includes(item.authorn?.toLowerCase());
    return mediumMatches && materialMatches && authorMatches;
  });


  const sortedData = filteredData.sort((a, b) => {
    if (priceSortOrder === 'ascending') {
      return a.price - b.price;
    } else if (priceSortOrder === 'descending') {
      return b.price - a.price;
    } else if (sizeSortOrder === 'ascending') {
      return a.size - b.size; 
    } else if (sizeSortOrder === 'descending') {
      return b.size - a.size; 
    }
    return 0;
  });

  const sortLabel = () => {
    if (priceSortOrder === 'ascending') {
      return 'Price: Low to High';
    } else if (priceSortOrder === 'descending') {
      return 'Price: High to Low';
    } else if (sizeSortOrder === 'ascending') {
      return 'Size: Small to Large';
    } else if (sizeSortOrder === 'descending') {
      return 'Size: Large to Small';
    }
    return 'None';
  };

  const removeSortFilter = () => {
    setPriceSortOrder(null);
    setSizeSortOrder(null);
  };

  const clearAllFiltersAndSort = () => {
    setMediumFilters([]);
    setMaterialFilters([]);
    setAuthorFilters([]);
    setPriceSortOrder('');
    setSizeSortOrder('');
    setIsAllFiltersClearedNotificationVisible(true);
  };

  const hideAllFiltersClearedNotification = () => {
    setIsAllFiltersClearedNotificationVisible(false);
  };

  const handlePriceSortButtonClick = (sortType) => {
    setPriceSortOrder(sortType);
    setSizeSortOrder(''); 
  };
  
  const handleSizeSortButtonClick = (sortType) => {
    setSizeSortOrder(sortType);
    setPriceSortOrder(''); 
  };

  const clearCart = () => {
    if (cartItems.length > 0) { 
      setCartItems([]);
      setIsCartClearedNotificationVisible(true); 
    }
  };

  const hideCartClearedNotification = () => {
    setIsCartClearedNotificationVisible(false);
  };

  const clearWishlist = () => {
    if (wishlistItems.length > 0) { 
      setWishlistItems([]);
      setIsWishlistClearedNotificationVisible(true); 
    }
  };
  
  const hideWishlistClearedNotification = () => {
    setIsWishlistClearedNotificationVisible(false);
  };

  return (
    <div className="App">
       <div className="menu-page">
        {isWishlistNotificationVisible && (
      <div className="notification-overlay">
        <div className="wishlist-notification">
          {wishlistNotification}
          <button onClick={hideWishlistNotification}><em>Click to continue</em></button>
        </div>
        </div>
        )}
        {isCartNotificationVisible && (
      <div className="notification-overlay">
        <div className="cart-notification">
          {CartNotification}
          <button onClick={hideCartNotification}><em>Click to continue</em></button>
        </div>
      </div>
      )}
      {isRemoveFromCartNotificationVisible && (
      <div className="notification-overlay">
        <div className="remove-notification">
          {RemoveFromCartNotification}
          <button onClick={hideRemoveFromCartNotification}><em>Click to continue</em></button>
        </div>
      </div>
      )}
       {isRemoveFromWishlistNotificationVisible && (
      <div className="notification-overlay">
        <div className="remove-notification">
          {RemoveFromWishlistNotification}
          <button onClick={hideRemoveFromWishlistNotification}><em>Click to continue</em></button>
        </div>
      </div>
      )}
      {isCartClearedNotificationVisible && (
      <div className="notification-overlay">
        <div className="remove-notification">
          <p>The <strong>cart</strong> has been cleared.</p>
          <button onClick={hideCartClearedNotification}>Click to continue</button>
        </div>
      </div>
    )}
    {isWishlistClearedNotificationVisible && (
      <div className="notification-overlay">
        <div className="remove-notification">
          <p>The <strong>wishlist</strong> has been cleared.</p>
          <button onClick={hideWishlistClearedNotification}>Click to continue</button>
        </div>
      </div>
    )}
    {isAllFiltersClearedNotificationVisible && (
      <div className="notification-overlay">
        <div className="remove-notification">
          <p>All <strong>filters and sortings</strong> have been cleared.</p>
          <button onClick={hideAllFiltersClearedNotification}>OK</button>
        </div>
      </div>
    )}
      <h1>Unique artworks for sale</h1> 
      <div class="section-line"> </div> 
      <div className="sorting-filtering-page">
      { (mediumFilters.length > 0 || materialFilters.length > 0 || authorFilters.length > 0 || priceSortOrder || sizeSortOrder ) && (
        <button 
          className="clear active"
          onClick={clearAllFiltersAndSort}
        >
          Clear All
        </button>
      )}     
      <h3>Filters applied:</h3>
          {mediumFilters.length === 0 && materialFilters.length === 0 && authorFilters.length === 0 ? (
            <span className="filter-label">None</span>
          ) : (
            <>
              {mediumFilters.map((filter, index) => (
                <span key={index} className="filter-label active" onClick={() => removeMediumFilter(filter)}>
                  Medium: {filter} ×
                </span>
              ))}
              {materialFilters.map((filter, index) => (
                <span key={index} className="filter-label active" onClick={() => removeMaterialFilter(filter)}>
                  Material: {filter} ×
                </span>
              ))}
              {authorFilters.map((filter, index) => (
                <span key={index} className="filter-label active" onClick={() => removeAuthorFilter(filter)}>
                  Author: {filter} ×
                </span>
              ))}
            </>
          )}
            
        <h3>Sorted by:</h3>
        {priceSortOrder || sizeSortOrder ? (
    <span className="filter-label" onClick={removeSortFilter}>
      {sortLabel()} ×
    </span>
  ) : (
    <span className="filter-label">None</span>
  )
}
           </div>
      <div class="section-line"> </div> 
      </div>
      <div className="main-page">
      <div className="filters-page">
       <h2>Filter</h2>
       <div class="subsection-line-02"> </div> 
       <div class="section-line-white"> </div> 
        <h3>By medium:</h3>
        <div class="subsection-line-03"> </div> 
        <button className={`filters-button ${mediumFilters.includes('oil') ? 'active' : ''}`}  onClick={() => toggleMediumFilters('oil')}>Oil</button>
        <button className={`filters-button ${mediumFilters.includes('acrylic') ? 'active' : ''}`}  onClick={() => toggleMediumFilters('acrylic')}>Acrylic</button>
        <button className={`filters-button ${mediumFilters.includes('pencil') ? 'active' : ''}`}  onClick={() => toggleMediumFilters('pencil')}>Pencil</button>
          <div class="section-line-white"> </div> 
          <div class="subsection-line-02"> </div> 
          <div class="section-line-white"> </div> 
        <h3>By material:</h3>
        <div class="subsection-line-03"> </div> 
        <button className={`filters-button ${materialFilters.includes('canvas') ? 'active' : ''}`}  onClick={() => toggleMaterialFilters('canvas')}>Canvas</button>
        <button className={`filters-button ${materialFilters.includes('board') ? 'active' : ''}`}  onClick={() => toggleMaterialFilters('board')}>Board</button>
        <button className={`filters-button ${materialFilters.includes('paper') ? 'active' : ''}`}  onClick={() => toggleMaterialFilters('paper')}>Paper</button>
          <div class="section-line-white"> </div> 
          <div class="subsection-line-01"> </div> 
          <div class="section-line-white"> </div>                   
          <h3>By author:</h3>
        <div class="subsection-line-03"> </div> 
        <button className={`filters-button ${authorFilters.includes('a') ? 'active' : ''}`}  onClick={() => toggleAuthorFilters('a')}>Miriam Dema</button>
        <button className={`filters-button ${authorFilters.includes('b') ? 'active' : ''}`}  onClick={() => toggleAuthorFilters('b')}>Bea Aigualbella</button>
        <button className={`filters-button ${authorFilters.includes('c') ? 'active' : ''}`}  onClick={() => toggleAuthorFilters('c')}>Klas Ernflo</button>
        <button className={`filters-button ${authorFilters.includes('d') ? 'active' : ''}`}  onClick={() => toggleAuthorFilters('d')}>Marcos Isomat</button>
        <button className={`filters-button ${authorFilters.includes('e') ? 'active' : ''}`}  onClick={() => toggleAuthorFilters('e')}>Naoki Kawano</button>
          <div class="section-line-white"> </div> 
          <div class="subsection-line-01"> </div> 
          <div class="section-line-white"> </div> 
          <h2>Sort</h2>
          <div class="subsection-line-02"> </div> 
          <div class="section-line-white"> </div> 
          <h3>By price:</h3>
          <div class="subsection-line-03"> </div> 
          <div className="sort-buttons">
          <button className={`filters-button ${priceSortOrder === 'ascending' ? 'active' : ''}`} onClick={() => handlePriceSortButtonClick('ascending')}>Low to High</button>
          <button className={`filters-button ${priceSortOrder === 'descending' ? 'active' : ''}`} onClick={() => handlePriceSortButtonClick('descending')}>High to Low</button>
          <div class="section-line-white"> </div> 
          <div class="subsection-line-02"> </div> 
          <div class="section-line-white"> </div> 
          <h3>By size:</h3>
          <div class="subsection-line-03"> </div> 
          <div className="sort-buttons"></div>
          <button className={`filters-button ${sizeSortOrder === 'ascending' ? 'active' : ''}`} onClick={() => handleSizeSortButtonClick('ascending')}>Small to Large</button>
          <button className={`filters-button ${sizeSortOrder === 'descending' ? 'active' : ''}`} onClick={() => handleSizeSortButtonClick('descending')}>Large to Small</button>
          </div>
        </div>  
      <div className="items-page">
      {sortedData.length > 0 ?(
       sortedData.map((item, index) => ( 
            <ArtItem
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
            isInCart={cartItems.some(cartItem => cartItem.id === item.id)}
            isInWishlist={wishlistItems.some(wishlistItem => wishlistItem.id === item.id)}
            removeFromCart={() => removeFromCart(item)}
            removeFromWishlist={() => removeFromWishlist(item)}
            />
            ))
            ):(
              <div className="no-results-container">
                <img src={process.env.PUBLIC_URL + '/images/no-results.png'} alt="No results" />
                <h2><strong>Oops! </strong> </h2>
                <p><strong>No artworks match your criteria, </strong> try changing the applied filters.</p>
              </div>
            )}
          </div>

      <div className="cart-page">
       <h2>My cart</h2>
       <div class="subsection-line-02"> </div> 
       <div class="section-line-white"> </div> 
         {cartItems.length > 0 ? (
            <>
              {generateLabels(cartItems, removeFromCart)}
              <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
              <button className="clear" onClick={clearCart}>Clear Cart</button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div class="section-line-white"> </div> 
          <div class="subsection-line-01"> </div> 
          <div class="section-line-white"> </div> 
          <h2>My Wishlist</h2>
          <div class="subsection-line-02"> </div> 
       <div class="section-line-white"> </div> 
          {wishlistItems.length > 0 ? (
            <>
            {generateLabels(wishlistItems, removeFromWishlist)}
            <button className="clear" onClick={clearWishlist}>Clear Wishlist</button>
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
