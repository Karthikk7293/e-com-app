import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addItemLocally } from '../../store/slices/cartSlice';
import { Heart, ShoppingCart, Trash2, Star, Share2 } from 'lucide-react';
import Button from '../../components/common/Button';

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mock wishlist data (in production, this would come from Redux/Context)
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://via.placeholder.com/400',
      rating: 4.5,
      reviewCount: 245,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 199.99,
      image: 'https://via.placeholder.com/400',
      rating: 4.8,
      reviewCount: 189,
      inStock: true,
      category: 'Wearables',
    },
    {
      id: 3,
      name: 'Designer Handbag',
      price: 449.99,
      originalPrice: 599.99,
      image: 'https://via.placeholder.com/400',
      rating: 4.6,
      reviewCount: 156,
      inStock: false,
      category: 'Fashion',
    },
  ]);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    toast.success('Removed from wishlist', {
      icon: '💔',
    });
  };

  const handleAddToCart = (item) => {
    dispatch(addItemLocally({
      productId: item.id,
      quantity: 1,
      price: item.price,
      name: item.name,
      image: item.image,
    }));
    toast.success('Added to cart!', {
      icon: '🛒',
    });
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    inStockItems.forEach(item => {
      dispatch(addItemLocally({
        productId: item.id,
        quantity: 1,
        price: item.price,
        name: item.name,
        image: item.image,
      }));
    });
    if (inStockItems.length > 0) {
      toast.success(`${inStockItems.length} items added to cart!`, {
        icon: '🛒',
      });
    } else {
      toast.error('No items in stock', {
        icon: '❌',
      });
    }
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out ${item.name}`,
        url: window.location.origin + `/product/${item.id}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/product/${item.id}`);
      toast.success('Link copied to clipboard!', {
        icon: '🔗',
      });
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Heart size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">
            Save your favorite items here and never lose track of what you love!
          </p>
          <Button onClick={() => navigate('/products')} size="lg">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button onClick={handleAddAllToCart} variant="outline">
              <ShoppingCart size={20} className="mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
              onShare={handleShare}
            />
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">Recommended Product {i}</h3>
                <p className="text-lg font-bold text-gray-900">$99.99</p>
                <Button size="sm" fullWidth className="mt-3">
                  Add to Wishlist
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Card Component
const WishlistCard = ({ item, onRemove, onAddToCart, onShare }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group relative">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all"
      >
        <Trash2 size={18} className="text-red-600" />
      </button>

      {/* Share Button */}
      <button
        onClick={() => onShare(item)}
        className="absolute top-3 left-3 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-all"
      >
        <Share2 size={18} className="text-blue-600" />
      </button>

      {/* Product Image */}
      <div
        className="relative bg-gray-100 aspect-square cursor-pointer overflow-hidden"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        <img
          src={imageError ? 'https://via.placeholder.com/400' : item.image}
          alt={item.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {discount}% OFF
          </div>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-2">
          {item.category}
        </span>

        {/* Product Name */}
        <h3
          className="font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2 h-12"
          onClick={() => navigate(`/product/${item.id}`)}
          title={item.name}
        >
          {item.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-2">
            {item.rating.toFixed(1)} ({item.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
          {item.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(item)}
          fullWidth
          size="sm"
          disabled={!item.inStock}
        >
          <ShoppingCart size={16} className="mr-2" />
          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default WishlistPage;
