import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useCartContext } from '../../context/CartContext';
import { updateItemLocally, removeItemLocally, clearCartLocally } from '../../store/slices/cartSlice';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Shield } from 'lucide-react';
import Button from '../../components/common/Button';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useCartContext();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Promo codes (you can move this to backend)
  const promoCodes = {
    'SAVE10': 10,
    'SAVE20': 20,
    'FIRST50': 50,
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateItemLocally({ productId: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemLocally(itemId));
    toast.success('Item removed from cart', {
      icon: '🗑️',
    });
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCartLocally());
      toast.success('Cart cleared', {
        icon: '🧹',
      });
    }
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      setPromoApplied(true);
      toast.success(`Promo code applied! ${promoCodes[code]}% off`, {
        icon: '🎉',
      });
    } else {
      toast.error('Invalid promo code', {
        icon: '❌',
      });
      setPromoCode('');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };

  // Calculations
  const subtotal = totalPrice;
  const discountAmount = (subtotal * discount) / 100;
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discountAmount) * 0.1; // 10% tax
  const total = subtotal - discountAmount + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping now!
          </p>
          <Button onClick={() => navigate('/products')} size="lg">
            Start Shopping
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            <Trash2 size={20} />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id || item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Promo Code
                </label>
                {!promoApplied ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleApplyPromo} variant="outline">
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="text-green-600" size={20} />
                      <span className="font-semibold text-green-700">{promoCode}</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Try: SAVE10, SAVE20, FIRST50
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => navigate('/checkout')}
                size="lg"
                fullWidth
                className="mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2" size={20} />
              </Button>

              <button
                onClick={() => navigate('/products')}
                className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue Shopping
              </button>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="text-blue-600" size={20} />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="text-green-600" size={20} />
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row gap-4">
      {/* Product Image */}
      <div
        className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={() => navigate(`/product/${item.productId}`)}
      >
        <img
          src={imageError ? 'https://via.placeholder.com/200' : item.image}
          alt={item.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="font-bold text-lg text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => navigate(`/product/${item.productId}`)}
          >
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Price: <span className="font-semibold">${item.price.toFixed(2)}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => onUpdateQuantity(item.id || item.productId, item.quantity - 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 font-semibold">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id || item.productId, item.quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Item Total & Remove */}
          <div className="flex items-center justify-between md:justify-end gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-900">${itemTotal}</p>
            </div>
            <button
              onClick={() => onRemove(item.id || item.productId)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
