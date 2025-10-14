import { useState, useEffect } from 'react';
import { 
  Search, 
  DollarSign,
  CreditCard,
  TrendingUp,
  Download,
  Eye,
  X,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    successfulPayments: 0,
    pendingPayments: 0,
    failedPayments: 0
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockPayments = [
        {
          id: 'PAY-001',
          orderId: 'ORD-001',
          customer: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          },
          amount: 1497.00,
          method: 'Credit Card',
          status: 'completed',
          transactionId: 'TXN-ABC123456',
          date: '2024-10-10 14:30:00',
          cardLast4: '4242'
        },
        {
          id: 'PAY-002',
          orderId: 'ORD-002',
          customer: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com'
          },
          amount: 2499.00,
          method: 'PayPal',
          status: 'completed',
          transactionId: 'TXN-DEF789012',
          date: '2024-10-12 09:15:00',
          cardLast4: null
        },
        {
          id: 'PAY-003',
          orderId: 'ORD-003',
          customer: {
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com'
          },
          amount: 1048.00,
          method: 'Credit Card',
          status: 'completed',
          transactionId: 'TXN-GHI345678',
          date: '2024-10-13 16:45:00',
          cardLast4: '5555'
        },
        {
          id: 'PAY-004',
          orderId: 'ORD-004',
          customer: {
            name: 'Alice Brown',
            email: 'alice.brown@example.com'
          },
          amount: 399.00,
          method: 'Bank Transfer',
          status: 'pending',
          transactionId: 'TXN-JKL901234',
          date: '2024-10-14 11:20:00',
          cardLast4: null
        },
        {
          id: 'PAY-005',
          orderId: 'ORD-005',
          customer: {
            name: 'Charlie Wilson',
            email: 'charlie.wilson@example.com'
          },
          amount: 1799.00,
          method: 'Credit Card',
          status: 'refunded',
          transactionId: 'TXN-MNO567890',
          date: '2024-10-11 13:00:00',
          cardLast4: '1234'
        },
        {
          id: 'PAY-006',
          orderId: 'ORD-006',
          customer: {
            name: 'David Lee',
            email: 'david.lee@example.com'
          },
          amount: 599.00,
          method: 'Debit Card',
          status: 'failed',
          transactionId: 'TXN-PQR123456',
          date: '2024-10-13 10:30:00',
          cardLast4: '9876'
        }
      ];
      
      setPayments(mockPayments);
      
      // Calculate stats
      const totalRevenue = mockPayments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);
      
      setStats({
        totalRevenue,
        successfulPayments: mockPayments.filter(p => p.status === 'completed').length,
        pendingPayments: mockPayments.filter(p => p.status === 'pending').length,
        failedPayments: mockPayments.filter(p => p.status === 'failed').length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to fetch payments');
      setLoading(false);
    }
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleRefund = async (paymentId) => {
    if (!window.confirm('Are you sure you want to refund this payment?')) {
      return;
    }

    try {
      setPayments(payments.map(p => 
        p.id === paymentId ? { ...p, status: 'refunded' } : p
      ));
      toast.success('Payment refunded successfully');
    } catch (error) {
      console.error('Error refunding payment:', error);
      toast.error('Failed to refund payment');
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />;
      case 'failed':
        return <XCircle className="text-red-600" size={20} />;
      case 'refunded':
        return <RefreshCw className="text-purple-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Track and manage payment transactions</p>
        </div>
        <button
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={20} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Successful</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.successfulPayments}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingPayments}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-500 p-3 rounded-lg">
              <XCircle className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Failed</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.failedPayments}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <CreditCard className="mx-auto mb-2 text-gray-400" size={48} />
                      <p>No payments found</p>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-blue-600">{payment.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-gray-700">{payment.orderId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{payment.customer.name}</p>
                          <p className="text-sm text-gray-500">{payment.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <CreditCard size={16} className="text-gray-400" />
                          <span className="text-gray-700">{payment.method}</span>
                          {payment.cardLast4 && (
                            <span className="text-xs text-gray-500">****{payment.cardLast4}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payment.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{payment.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewPayment(payment)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          {payment.status === 'completed' && (
                            <button
                              onClick={() => handleRefund(payment.id)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Refund"
                            >
                              <RefreshCw size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Details Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                <p className="text-gray-600 mt-1">Payment ID: <span className="font-mono font-semibold text-blue-600">{selectedPayment.id}</span></p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Payment Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedPayment.status)}
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-gray-900">{selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${selectedPayment.amount.toFixed(2)}</p>
                </div>
              </div>

              {/* Transaction Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Transaction Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono font-semibold text-gray-900">{selectedPayment.transactionId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono font-semibold text-gray-900">{selectedPayment.orderId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold text-gray-900">{selectedPayment.method}</span>
                  </div>
                  {selectedPayment.cardLast4 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Card Number</span>
                      <span className="font-mono text-gray-900">**** **** **** {selectedPayment.cardLast4}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="text-gray-900">{selectedPayment.date}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {selectedPayment.customer.name}</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {selectedPayment.customer.email}</p>
                </div>
              </div>

              {/* Actions */}
              {selectedPayment.status === 'completed' && (
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      handleRefund(selectedPayment.id);
                      setShowModal(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <RefreshCw size={18} />
                    <span>Process Refund</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
