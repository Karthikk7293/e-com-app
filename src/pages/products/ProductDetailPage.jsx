import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchProductById, fetchProducts } from '../../store/slices/productSlice';
import { addItemLocally } from '../../store/slices/cartSlice';
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Button from '../../components/common/Button';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, products, loading } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchProducts({ limit: 50 }));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct && products.length > 0) {
      // Get related products from same category
      const related = products
        .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [selectedProduct, products]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      const productImage = selectedProduct.thumbnail || selectedProduct.image || selectedProduct.images?.[0];
      dispatch(addItemLocally({
        productId: selectedProduct.id,
        quantity,
        price: selectedProduct.price,
        name: selectedProduct.title,
        image: productImage,
      }));
      toast.success(`${quantity} item(s) added to cart!`, {
        icon: '🛒',
      });
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading || !selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const product = selectedProduct;
  const images = product.images || [product.thumbnail || product.image];
  const rating = product.rating?.rate || product.rating || 4;
  const reviewCount = product.rating?.count || 0;
  const stock = product.stock || 10;
  const discount = product.discountPercentage || 0;
  const originalPrice = discount > 0 ? (product.price / (1 - discount / 100)) : product.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
          <ChevronRight size={16} />
          <button onClick={() => navigate('/products')} className="hover:text-blue-600">Products</button>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium capitalize">{product.category}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Section */}
            <div>
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                    {discount.toFixed(0)}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative bg-gray-100 rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                        selectedImage === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full capitalize mb-2">
                  {product.category?.replace(/-/g, ' ')}
                </span>
                {product.brand && (
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {rating.toFixed(1)} ({reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                      <span className="text-green-600 font-semibold">Save ${(originalPrice - product.price).toFixed(2)}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {stock > 0 ? (
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    <span className="font-semibold">In Stock ({stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                    <span className="font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-6 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= stock}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1"
                  disabled={stock === 0}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
                >
                  <Heart
                    size={24}
                    className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                  />
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <Share2 size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% secure transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <RotateCcw className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <div className="flex border-b mb-6">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-semibold text-gray-700">Brand</td>
                    <td className="py-3 text-gray-600">{product.brand || 'N/A'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-semibold text-gray-700">Category</td>
                    <td className="py-3 text-gray-600 capitalize">{product.category?.replace(/-/g, ' ')}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-semibold text-gray-700">Stock</td>
                    <td className="py-3 text-gray-600">{product.stock || 'N/A'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-semibold text-gray-700">Weight</td>
                    <td className="py-3 text-gray-600">{product.weight || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 font-semibold text-gray-900">Customer {review}</span>
                    </div>
                    <p className="text-gray-700">Great product! Highly recommended.</p>
                    <p className="text-sm text-gray-500 mt-2">Verified Purchase</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <RelatedProductCard
                  key={`related-${relatedProduct.id}-${index}`}
                  product={relatedProduct}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Related Product Card Component
const RelatedProductCard = ({ product, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const productImage = product.thumbnail || product.image || product.images?.[0];
  const rating = product.rating?.rate || product.rating || 4;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
    >
      <div className="relative bg-gray-100 aspect-square">
        <img
          src={imageError ? 'https://via.placeholder.com/300' : productImage}
          alt={product.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{product.title}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
        </div>
        <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
