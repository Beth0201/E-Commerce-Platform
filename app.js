const { useState, useEffect } = React;

// Sample product data
const productsData = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 199.99,
        description: "Premium noise-canceling wireless headphones with 30-hour battery life",
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 299.99,
        description: "Advanced fitness tracking with heart rate monitor and GPS",
        icon: "⌚"
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Sports",
        price: 129.99,
        description: "Lightweight performance running shoes with superior cushioning",
        icon: "👟"
    },
    {
        id: 4,
        name: "Yoga Mat",
        category: "Sports",
        price: 49.99,
        description: "Non-slip eco-friendly yoga mat with carrying strap",
        icon: "🧘"
    },
    {
        id: 5,
        name: "Coffee Maker",
        category: "Home",
        price: 149.99,
        description: "Programmable coffee maker with thermal carafe",
        icon: "☕"
    },
    {
        id: 6,
        name: "Desk Lamp",
        category: "Home",
        price: 79.99,
        description: "LED desk lamp with adjustable brightness and USB charging",
        icon: "💡"
    },
    {
        id: 7,
        name: "Backpack",
        category: "Fashion",
        price: 89.99,
        description: "Waterproof laptop backpack with multiple compartments",
        icon: "🎒"
    },
    {
        id: 8,
        name: "Sunglasses",
        category: "Fashion",
        price: 159.99,
        description: "Polarized UV protection sunglasses with premium frame",
        icon: "🕶️"
    },
    {
        id: 9,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 119.99,
        description: "Portable waterproof speaker with 360° sound",
        icon: "🔊"
    },
    {
        id: 10,
        name: "Water Bottle",
        category: "Sports",
        price: 34.99,
        description: "Insulated stainless steel water bottle keeps drinks cold 24hrs",
        icon: "💧"
    },
    {
        id: 11,
        name: "Cookbook",
        category: "Home",
        price: 29.99,
        description: "Bestselling cookbook with 200+ healthy recipes",
        icon: "📖"
    },
    {
        id: 12,
        name: "Wallet",
        category: "Fashion",
        price: 59.99,
        description: "Genuine leather wallet with RFID protection",
        icon: "👛"
    }
];

// Product Card Component
function ProductCard({ product, onAddToCart, isInCart }) {
    return (
        <div className="product-card">
            <div className="product-image">{product.icon}</div>
            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                    <div className="product-price">${product.price}</div>
                    <button 
                        className="add-to-cart-btn" 
                        onClick={() => onAddToCart(product)}
                        disabled={isInCart}
                    >
                        {isInCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
        <div className="cart-item">
            <div className="cart-item-image">{item.icon}</div>
            <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-category">{item.category}</div>
                <div className="cart-item-controls">
                    <div className="quantity-controls">
                        <button 
                            className="quantity-btn" 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                            className="quantity-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <button 
                        className="remove-item-btn"
                        onClick={() => onRemove(item.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
}

// Cart Modal Component
function CartModal({ cart, onClose, onUpdateQuantity, onRemove, onCheckout }) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2 className="cart-title">Shopping Cart ({cart.length})</h2>
                    <button className="close-cart-btn" onClick={onClose}>✕</button>
                </div>
                
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <div className="empty-cart-icon">🛒</div>
                            <h3>Your cart is empty</h3>
                            <p>Add some products to get started!</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemove}
                            />
                        ))
                    )}
                </div>
                
                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span className="cart-total-label">Total:</span>
                            <span className="cart-total-amount">${total.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={onCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Payment Modal Component
function PaymentModal({ total, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate payment processing
        setTimeout(() => {
            onSuccess();
        }, 1000);
    };

    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
                <div className="payment-header">
                    <h2 className="payment-title">Payment Details</h2>
                </div>
                
                <div className="payment-body">
                    <form className="payment-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Cardholder Name</label>
                            <input
                                type="text"
                                name="cardName"
                                className="form-input"
                                placeholder="John Doe"
                                value={formData.cardName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                className="form-input"
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    className="form-input"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    value={formData.expiry}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    className="form-input"
                                    placeholder="123"
                                    maxLength="3"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="cart-total" style={{ marginTop: '1.5rem' }}>
                            <span className="cart-total-label">Amount to Pay:</span>
                            <span className="cart-total-amount">${total.toFixed(2)}</span>
                        </div>
                        
                        <div className="payment-actions">
                            <button type="button" className="payment-btn cancel-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="payment-btn pay-btn">
                                Pay Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Success Modal Component
function SuccessModal({ onClose }) {
    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                <div className="success-icon">✓</div>
                <h2 className="success-title">Payment Successful!</h2>
                <p className="success-message">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>
                <button className="continue-btn" onClick={onClose}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

// Main App Component
function App() {
    const [products, setProducts] = useState(productsData);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [showCart, setShowCart] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const categories = ['All', ...new Set(productsData.map(p => p.category))];

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map(item => 
                item.id === id ? { ...item, quantity } : item
            ));
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        setShowCart(false);
        setShowPayment(true);
    };

    const handlePaymentSuccess = () => {
        setShowPayment(false);
        setShowSuccess(true);
        setCart([]);
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">S</div>
                        ShopHub
                    </div>
                    
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="header-actions">
                        <button className="cart-button" onClick={() => setShowCart(true)}>
                            🛒 Cart
                            {cartItemCount > 0 && (
                                <span className="cart-badge">{cartItemCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Filters */}
                <div className="filters">
                    <h3 className="filters-title">Categories</h3>
                    <div className="filter-group">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Header */}
                <div className="products-header">
                    <h2 className="products-count">
                        {sortedProducts.length} Products
                    </h2>
                    <select 
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Sort by: Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                    </select>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {sortedProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                            isInCart={cart.some(item => item.id === product.id)}
                        />
                    ))}
                </div>
            </main>

            {/* Cart Modal */}
            {showCart && (
                <CartModal
                    cart={cart}
                    onClose={() => setShowCart(false)}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    onCheckout={handleCheckout}
                />
            )}

            {/* Payment Modal */}
            {showPayment && (
                <PaymentModal
                    total={cartTotal}
                    onClose={() => setShowPayment(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            {/* Success Modal */}
            {showSuccess && (
                <SuccessModal
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </div>
    );
}

// Render App
ReactDOM.render(<App />, document.getElementById('root'));
