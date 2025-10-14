import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { Heart, ShoppingCart, Trash2, Star, ShoppingBag } from 'lucide-react';
import Button from '../../components/common/Button';

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Mock wishlist data - replace with actual Redux state
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://via.placeholder.com/300',
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      price: 399.99,
      originalPrice: 499.99,
      image: 'https://via.placeholder.com/300',
      rating: 4.8,
      reviews: 256,
      inStock: true,
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      price: 49.99,
      image: 'https://via.placeholder.com/300',
      rating: 4.2,
      reviews: 89,
      inStock: false,
    },
  ]);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      productId: item.id,
      quantity: 1,
      price: item.price,
      name: item.name,
      image: item.image,
    }));
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      if (item.inStock) {
        handleAddToCart(item);
      }
    });
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      setWishlistItems([]);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart size={80} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save items you love for later by adding them to your wishlist
            </p>
            <Button onClick={() => navigate('/products')} size="lg">
              <ShoppingBag size={20} className="mr-2" />
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddAllToCart}
                variant="outline"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add All to Cart
              </Button>
              <Button
                onClick={handleClearWishlist}
                variant="danger"
              >
                <Trash2 size={20} className="mr-2" />
                Clear Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4">
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">Recommended Product {i}</h3>
                <p className="text-lg font-bold text-gray-900">$99.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Card Component
const WishlistCard = ({ item, onRemove, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover cursor-pointer"
          onClick={() => navigate(`/product/${item.id}`)}
        />
        
        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 group"
        >
          <Heart size={20} className="fill-red-500 text-red-500" />
        </button>

        {/* Discount Badge */}
        {item.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Stock Status */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({item.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">${item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${item.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onAddToCart(item)}
            disabled={!item.inStock}
            fullWidth
            size="sm"
          >
            <ShoppingCart size={16} className="mr-2" />
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>

        {/* Additional Info */}
        {item.inStock && (
          <p className="text-xs text-green-600 mt-2 text-center">
            ✓ Available for delivery
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
