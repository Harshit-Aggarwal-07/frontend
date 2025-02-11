import { useState } from 'react'
import { products } from './data/products'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedProduct] = useState(products[0]) // Default to first product, you can make this dynamic based on route/props

  const relatedProducts = products.filter(p => 
    p.id !== selectedProduct.id && p.category === selectedProduct.category
  ).slice(0, 3)

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 1 && value <= 10) {
      setQuantity(value)
    }
  }

  const handleThumbnailClick = (index) => {
    setSelectedImage(index)
  }

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout with', quantity, 'items')
  }

  return (
    <div className="app-container">
      <header>
        <nav>
          <div className="logo">KAAGAZZ LOGO</div>
          <div className="nav-links">
            <a href="#home">home</a>
            <a href="#sustainability">sustainability</a>
            <a href="#shop">shop</a>
          </div>
        </nav>
      </header>

      <main>
        <div className="product-container">
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={selectedProduct.images[selectedImage]} 
                alt={`${selectedProduct.name} - View ${selectedImage + 1}`} 
              />
            </div>
            <div className="thumbnail-list">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={selectedImage === index ? 'selected' : ''}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{selectedProduct.name}</h1>
            <p className="description">{selectedProduct.description}</p>
            <p className="features">{selectedProduct.features}</p>
            <p className="specs">{selectedProduct.specs}</p>

            <div className="price-section">
              <h2>₹{selectedProduct.price * quantity}/-</h2>
              <span>for {selectedProduct.sheetsPerPack * quantity} sheets</span>
              
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                    className="quantity-btn"
                    disabled={!selectedProduct.inStock}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={!selectedProduct.inStock}
                  />
                  <button 
                    onClick={() => quantity < 10 && setQuantity(q => q + 1)}
                    className="quantity-btn"
                    disabled={!selectedProduct.inStock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="buy-now" 
                onClick={handleBuyNow}
                disabled={!selectedProduct.inStock}
              >
                {selectedProduct.inStock ? 'BUY NOW' : 'OUT OF STOCK'}
              </button>
              <button 
                className={`add-to-cart ${isAddedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
              >
                {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        <section className="related-products">
          <h2>Related Products</h2>
          <div className="products-grid">
            {relatedProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.images[0]} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}/-</p>
                {!product.inStock && (
                  <p className="out-of-stock">Out of Stock</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p>Copyright © {new Date().getFullYear()} KAAGAZZ - All Rights Reserved.</p>
          <div className="footer-brand">
            <p>PEETLO/KAAGAZZ</p>
            <p>ORGANIC PAPER</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App