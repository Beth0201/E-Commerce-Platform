const { useState, useEffect } = React;

// Sample product data - Traditional South African Foods
const productsData = [
    {
        id: 1,
        name: "Pap (Maize Meal)",
        category: "Staples",
        price: 45.99,
        description: "Premium white maize meal for traditional pap, 5kg bag",
        icon: "🌾"
    },
    {
        id: 2,
        name: "Samp and Beans",
        category: "Staples",
        price: 39.99,
        description: "Traditional samp and sugar beans mix, 2kg pack",
        icon: "🫘"
    },
    {
        id: 3,
        name: "Morogo (African Spinach)",
        category: "Vegetables",
        price: 25.99,
        description: "Fresh traditional African spinach, rich in nutrients",
        icon: "🥬"
    },
    {
        id: 4,
        name: "Amadumbe (Taro Root)",
        category: "Vegetables",
        price: 35.99,
        description: "Fresh amadumbe roots, perfect for traditional dishes",
        icon: "🥔"
    },
    {
        id: 5,
        name: "Beef Biltong",
        category: "Meat",
        price: 189.99,
        description: "Premium dried beef biltong, 500g pack",
        icon: "🥩"
    },
    {
        id: 6,
        name: "Chicken Pieces",
        category: "Meat",
        price: 85.99,
        description: "Fresh chicken portions, 2kg family pack",
        icon: "🍗"
    },
    {
        id: 7,
        name: "Chakalaka Relish",
        category: "Condiments",
        price: 28.99,
        description: "Spicy vegetable relish, authentic South African flavor",
        icon: "🌶️"
    },
    {
        id: 8,
        name: "Mrs Ball's Chutney",
        category: "Condiments",
        price: 32.99,
        description: "Original peach chutney, 470g bottle",
        icon: "🍑"
    },
    {
        id: 9,
        name: "Magwinya Mix (Vetkoek)",
        category: "Baking",
        price: 42.99,
        description: "Traditional vetkoek/magwinya flour mix, makes 20+ pieces",
        icon: "🍞"
    },
    {
        id: 10,
        name: "Rooibos Tea",
        category: "Beverages",
        price: 54.99,
        description: "Pure South African rooibos tea, 200 tea bags",
        icon: "☕"
    },
    {
        id: 11,
        name: "Umqombothi (Traditional Beer)",
        category: "Beverages",
        price: 18.99,
        description: "Traditional African beer, 1L carton",
        icon: "🍺"
    },
    {
        id: 12,
        name: "Mopani Worms (Dried)",
        category: "Snacks",
        price: 95.99,
        description: "Protein-rich dried mopani worms, 250g pack",
        icon: "🐛"
    },
    {
        id: 13,
        name: "Boerewors (Sausage)",
        category: "Meat",
        price: 78.99,
        description: "Traditional South African boerewors, 1kg fresh",
        icon: "🌭"
    },
    {
        id: 14,
        name: "Koeksisters",
        category: "Snacks",
        price: 48.99,
        description: "Sweet traditional braided pastries, 6 pieces",
        icon: "🥨"
    },
    {
        id: 15,
        name: "Butternut",
        category: "Vegetables",
        price: 22.99,
        description: "Fresh whole butternut squash, per kg",
        icon: "🎃"
    },
    {
        id: 16,
        name: "Mealie Meal (Yellow)",
        category: "Staples",
        price: 52.99,
        description: "Yellow maize meal for stiff pap, 10kg bag",
        icon: "🌽"
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
                    <div className="product-price">R{product.price}</div>
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
                R{(item.price * item.quantity).toFixed(2)}
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
                            <p>Add some delicious food items to get started!</p>
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
                            <span className="cart-total-amount">R{total.toFixed(2)}</span>
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
                            <span className="cart-total-amount">R{total.toFixed(2)}</span>
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
                        <div className="logo-icon">K</div>
                        KwaNdebele Online Shopping
                    </div>
                    
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for traditional foods..."
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
                        {sortedProducts.length} Food Items
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
