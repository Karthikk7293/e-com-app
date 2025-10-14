import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchProducts, fetchCategories } from '../../store/slices/productSlice';
import { addItemLocally } from '../../store/slices/cartSlice';
import { ShoppingCart, Heart, Star, TrendingUp, Tag, ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import Button from '../../components/common/Button';
import BannerCarousel from '../../components/home/BannerCarousel';
import Newsletter from '../../components/home/Newsletter';
import CustomerReviews from '../../components/home/CustomerReviews';
import CategoryScroll from '../../components/home/CategoryScroll';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, categories, loading } = useSelector((state) => state.product);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 8));
    }
  }, [products]);

  const handleAddToCart = (product) => {
    const productImage = product.thumbnail || product.image || product.images?.[0] || 'https://via.placeholder.com/400x400?text=Product';
    dispatch(addItemLocally({
      productId: product.id,
      quantity: 1,
      price: product.price,
      name: product.title,
      image: productImage,
    }));
    toast.success('Added to cart!', {
      icon: '🛒',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Banner Carousel */}
      <BannerCarousel />

      {/* Categories Section - Horizontal Infinite Scroll */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Shop by Category</h2>
              <p className="text-gray-600">Browse through our diverse collection</p>
            </div>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center mt-4 md:mt-0 group"
            >
              View All
              <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
          
          {categories.length > 0 ? (
            <CategoryScroll categories={categories} />
          ) : (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={`skeleton-${i}`} className="flex-shrink-0 bg-gray-200 animate-pulse rounded-2xl h-40 w-[140px]"></div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <TrendingUp className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-600 text-sm md:text-base">Handpicked items just for you</p>
              </div>
            </div>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
            >
              View All Products
              <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={`loading-${i}`} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={`product-${product.id}-${index}`}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 md:p-16 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 transform -translate-x-32 translate-y-32"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                <Zap size={18} className="mr-2" />
                LIMITED TIME OFFER
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Special Deals!</h2>
              <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
                Get up to 50% off on selected items. Don't miss out on these amazing deals!
              </p>
              <Button 
                onClick={() => navigate('/products')}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Shop Deals Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $50. Fast and reliable shipping worldwide.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions. Your payment information is always protected.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support. We're always here to help you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle both API formats (FakeStore and DummyJSON)
  const rating = product.rating?.rate || product.rating || 4;
  const reviewCount = product.rating?.count || 0;
  const productImage = product.thumbnail || product.image || product.images?.[0] || 'https://via.placeholder.com/400x400?text=Product';

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={imageError ? 'https://via.placeholder.com/400x400?text=Product' : productImage}
          alt={product.title}
          onError={() => setImageError(true)}
          className="w-full h-64 object-contain p-4 cursor-pointer group-hover:scale-110 transition-transform duration-500"
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2.5 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all z-10 hover:scale-110"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
        {product.category && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-lg">
            {product.category}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-5">
        <h3
          className="font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2 h-12 text-sm md:text-base"
          onClick={() => navigate(`/product/${product.id}`)}
          title={product.title}
        >
          {product.title}
        </h3>
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-2">
            {rating.toFixed(1)} ({reviewCount})
          </span>
        </div>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price?.toFixed(2)}
            </span>
          </div>
        </div>
        <Button
          onClick={() => onAddToCart(product)}
          fullWidth
          size="sm"
          className="group-hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Home;
