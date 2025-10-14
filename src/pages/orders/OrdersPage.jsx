import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  CreditCard,
  ChevronRight,
  Download,
  ArrowLeft,
} from 'lucide-react';
import Button from '../../components/common/Button';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2025-001',
      date: '2025-01-10',
      status: 'delivered',
      total: 299.99,
      items: 3,
      paymentMethod: 'Credit Card',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
      },
      products: [
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
        },
        {
          id: 2,
          name: 'USB-C Cable',
          price: 29.99,
          quantity: 2,
          image: 'https://via.placeholder.com/100',
        },
      ],
      tracking: 'TRK123456789',
      estimatedDelivery: '2025-01-15',
    },
    {
      id: 'ORD-2025-002',
      date: '2025-01-12',
      status: 'shipped',
      total: 599.99,
      items: 2,
      paymentMethod: 'PayPal',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
      },
      products: [
        {
          id: 3,
          name: 'Smart Watch Pro',
          price: 399.99,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
        },
        {
          id: 4,
          name: 'Wireless Charger',
          price: 49.99,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
        },
      ],
      tracking: 'TRK987654321',
      estimatedDelivery: '2025-01-18',
    },
    {
      id: 'ORD-2025-003',
      date: '2025-01-13',
      status: 'processing',
      total: 149.99,
      items: 1,
      paymentMethod: 'Credit Card',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
      },
      products: [
        {
          id: 5,
          name: 'Bluetooth Speaker',
          price: 149.99,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
        },
      ],
      tracking: null,
      estimatedDelivery: '2025-01-20',
    },
    {
      id: 'ORD-2025-004',
      date: '2025-01-08',
      status: 'cancelled',
      total: 89.99,
      items: 1,
      paymentMethod: 'Credit Card',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
      },
      products: [
        {
          id: 6,
          name: 'Phone Case',
          price: 89.99,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
        },
      ],
      tracking: null,
      estimatedDelivery: null,
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      delivered: {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'Delivered',
      },
      shipped: {
        icon: Truck,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        label: 'Shipped',
      },
      processing: {
        icon: Clock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        label: 'Processing',
      },
      cancelled: {
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: 'Cancelled',
      },
    };
    return configs[status] || configs.processing;
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Package size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <Button onClick={() => navigate('/products')} size="lg">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - Only show when no order is selected on mobile */}
        <div className={`mb-8 ${selectedOrder ? 'hidden lg:block' : ''}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
        </div>

        {/* Split Screen Layout */}
        <div className={`grid grid-cols-1 gap-6 ${selectedOrder ? 'lg:grid-cols-2' : ''}`}>
          {/* Left Side - Orders List */}
          <div className={`space-y-4 ${selectedOrder ? 'hidden lg:block' : ''}`}>
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isSelected={selectedOrder?.id === order.id}
                onClick={() => handleOrderClick(order)}
                getStatusConfig={getStatusConfig}
              />
            ))}
          </div>

          {/* Right Side - Order Details */}
          {selectedOrder && (
            <div className="block">
              <OrderDetails
                order={selectedOrder}
                onBack={handleBackToList}
                getStatusConfig={getStatusConfig}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, isSelected, onClick, getStatusConfig }) => {
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-xl ${
        isSelected ? 'ring-2 ring-blue-500 shadow-xl' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">{order.id}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Calendar size={14} />
            {new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <ChevronRight className="text-gray-400" size={24} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg} border ${statusConfig.border}`}>
          <StatusIcon size={16} className={statusConfig.color} />
          <span className={`text-sm font-semibold ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
          <p className="text-sm text-gray-600">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <CreditCard size={16} />
        <span>{order.paymentMethod}</span>
      </div>
    </div>
  );
};

// Order Details Component
const OrderDetails = ({ order, onBack, getStatusConfig }) => {
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-lg shadow-lg sticky top-4">
      {/* Mobile Back Button */}
      <div className="lg:hidden p-4 border-b">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h2>
          <p className="text-gray-600">{order.id}</p>
        </div>

        {/* Status */}
        <div className={`flex items-center gap-3 p-4 rounded-lg ${statusConfig.bg} border ${statusConfig.border} mb-6`}>
          <StatusIcon size={24} className={statusConfig.color} />
          <div>
            <p className={`font-bold ${statusConfig.color}`}>{statusConfig.label}</p>
            <p className="text-sm text-gray-600">
              {order.status === 'delivered' && 'Your order has been delivered'}
              {order.status === 'shipped' && `Estimated delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}`}
              {order.status === 'processing' && 'Your order is being processed'}
              {order.status === 'cancelled' && 'This order has been cancelled'}
            </p>
          </div>
        </div>

        {/* Tracking */}
        {order.tracking && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-1">Tracking Number</p>
            <p className="text-lg font-mono font-bold text-blue-600">{order.tracking}</p>
          </div>
        )}

        {/* Products */}
        <div className="mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Items Ordered</h3>
          <div className="space-y-3">
            {order.products.map((product) => (
              <div key={product.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain bg-white rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
            <MapPin size={20} />
            Shipping Address
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900">{order.shippingAddress.name}</p>
            <p className="text-gray-600">{order.shippingAddress.address}</p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="text-gray-600">{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-lg text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
            <CreditCard size={20} />
            Payment Method
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button fullWidth variant="outline" className="flex items-center justify-center gap-2">
            <Download size={20} />
            Download Invoice
          </Button>
          {order.status === 'processing' && (
            <Button fullWidth variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              Cancel Order
            </Button>
          )}
          {order.status === 'delivered' && (
            <Button fullWidth>
              Buy Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
