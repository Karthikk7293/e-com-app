import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Plus,
  Trash2,
  Package,
  Heart,
  ShoppingBag,
  LogOut,
  Camera,
  Save,
  X,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // User profile state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    avatar: user?.avatar || 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=3b82f6&color=fff',
  });

  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false,
  });

  // Stats
  const stats = [
    { icon: Package, label: 'Orders', value: '12', color: 'text-blue-600', bg: 'bg-blue-50', link: '/orders' },
    { icon: Heart, label: 'Wishlist', value: '8', color: 'text-red-600', bg: 'bg-red-50', link: '/wishlist' },
    { icon: ShoppingBag, label: 'Cart', value: '3', color: 'text-green-600', bg: 'bg-green-50', link: '/cart' },
  ];

  const handleProfileUpdate = () => {
    // API call would go here
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!', {
      icon: '✅',
    });
  };

  const handleAddressUpdate = (addressId) => {
    // API call would go here
    setIsEditingAddress(false);
    setEditingAddressId(null);
    toast.success('Address updated successfully!', {
      icon: '✅',
    });
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city) {
      toast.error('Please fill all required fields', {
        icon: '❌',
      });
      return;
    }

    const address = {
      ...newAddress,
      id: addresses.length + 1,
    };

    setAddresses([...addresses, address]);
    setNewAddress({
      type: 'Home',
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false,
    });
    setIsEditingAddress(false);
    toast.success('Address added successfully!', {
      icon: '✅',
    });
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      toast.success('Address deleted', {
        icon: '🗑️',
      });
    }
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId,
    })));
    toast.success('Default address updated', {
      icon: '✅',
    });
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully', {
        icon: '👋',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profileData.avatar}
                    alt={`${profileData.firstName} ${profileData.lastName}`}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-blue-100"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Camera size={20} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600">{profileData.email}</p>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <button
                      key={stat.label}
                      onClick={() => navigate(stat.link)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg ${stat.bg} hover:shadow-md transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={stat.color} size={24} />
                        <span className="font-semibold text-gray-900">{stat.label}</span>
                      </div>
                      <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User size={20} className="inline mr-2" />
                  Profile Details
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MapPin size={20} className="inline mr-2" />
                  Addresses
                </button>
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                fullWidth
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  {!isEditingProfile ? (
                    <Button onClick={() => setIsEditingProfile(true)} variant="outline" size="sm">
                      <Edit2 size={16} className="mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleProfileUpdate} size="sm">
                        <Save size={16} className="mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditingProfile(false)}
                        variant="outline"
                        size="sm"
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditingProfile}
                      icon={User}
                    />
                    <Input
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditingProfile}
                      icon={User}
                    />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditingProfile}
                    icon={Mail}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditingProfile}
                    icon={Phone}
                  />
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                {/* Add New Address Button */}
                {!isEditingAddress && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="w-full bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <Plus size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Add New Address</p>
                  </button>
                )}

                {/* Add Address Form */}
                {isEditingAddress && !editingAddressId && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
                      <Button
                        onClick={() => setIsEditingAddress(false)}
                        variant="outline"
                        size="sm"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address Type
                          </label>
                          <select
                            value={newAddress.type}
                            onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <Input
                          label="Full Name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          required
                        />
                      </div>
                      <Input
                        label="Street Address"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          required
                        />
                        <Input
                          label="State"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="ZIP Code"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                          required
                        />
                        <Input
                          label="Country"
                          value={newAddress.country}
                          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                          required
                        />
                      </div>
                      <Input
                        label="Phone"
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="defaultAddress"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="defaultAddress" className="text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>
                      <Button onClick={handleAddAddress} fullWidth>
                        <Plus size={20} className="mr-2" />
                        Add Address
                      </Button>
                    </div>
                  </div>
                )}

                {/* Addresses List */}
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`bg-white rounded-lg shadow-md p-6 ${
                      address.isDefault ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{address.type}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingAddressId(address.id);
                            setIsEditingAddress(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 text-gray-700">
                      <p className="font-semibold">{address.name}</p>
                      <p>{address.address}</p>
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="flex items-center gap-2 mt-2">
                        <Phone size={14} />
                        {address.phone}
                      </p>
                    </div>
                    {!address.isDefault && (
                      <Button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        variant="outline"
                        size="sm"
                        className="mt-4"
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
