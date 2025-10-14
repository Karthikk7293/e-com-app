import { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit, Trash2, Image as ImageIcon, Eye, EyeOff, X, Save, Calendar, ArrowUp, ArrowDown, Link as LinkIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '', subtitle: '', description: '', imageUrl: '', linkUrl: '', linkText: '',
    position: 'hero', status: 'active', startDate: '', endDate: '', order: 0,
    backgroundColor: '#ffffff', textColor: '#000000'
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const mockBanners = [
        {
          id: 1, title: 'Summer Sale 2024', subtitle: 'Up to 50% Off',
          description: 'Get amazing discounts on all summer collections',
          imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
          linkUrl: '/products?category=summer', linkText: 'Shop Now', position: 'hero', status: 'active',
          startDate: '2024-06-01', endDate: '2024-08-31', order: 1,
          backgroundColor: '#FF6B6B', textColor: '#FFFFFF', views: 12543, clicks: 892
        },
        {
          id: 2, title: 'New Arrivals', subtitle: 'Fresh Collection',
          description: 'Check out our latest products',
          imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
          linkUrl: '/products?sort=newest', linkText: 'Explore', position: 'hero', status: 'active',
          startDate: '2024-10-01', endDate: '2024-12-31', order: 2,
          backgroundColor: '#4ECDC4', textColor: '#FFFFFF', views: 8234, clicks: 567
        },
        {
          id: 3, title: 'Free Shipping', subtitle: 'On Orders Over $50',
          description: 'Limited time offer',
          imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=200&fit=crop',
          linkUrl: '/products', linkText: 'Learn More', position: 'promotional', status: 'active',
          startDate: '2024-10-01', endDate: '2024-10-31', order: 1,
          backgroundColor: '#95E1D3', textColor: '#2C3E50', views: 5678, clicks: 234
        },
        {
          id: 4, title: 'Black Friday Coming Soon', subtitle: 'Save the Date',
          description: 'Biggest sale of the year',
          imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop',
          linkUrl: '/black-friday', linkText: 'Notify Me', position: 'hero', status: 'scheduled',
          startDate: '2024-11-29', endDate: '2024-12-02', order: 3,
          backgroundColor: '#2C3E50', textColor: '#FFFFFF', views: 0, clicks: 0
        }
      ];
      setBanners(mockBanners);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to fetch banners');
      setLoading(false);
    }
  };

  const handleCreateBanner = () => {
    setModalMode('create');
    setFormData({
      title: '', subtitle: '', description: '', imageUrl: '', linkUrl: '', linkText: '',
      position: 'hero', status: 'active', startDate: '', endDate: '', order: 0,
      backgroundColor: '#ffffff', textColor: '#000000'
    });
    setShowModal(true);
  };

  const handleEditBanner = (banner) => {
    setModalMode('edit');
    setSelectedBanner(banner);
    setFormData({
      title: banner.title, subtitle: banner.subtitle, description: banner.description,
      imageUrl: banner.imageUrl, linkUrl: banner.linkUrl, linkText: banner.linkText,
      position: banner.position, status: banner.status, startDate: banner.startDate,
      endDate: banner.endDate, order: banner.order, backgroundColor: banner.backgroundColor,
      textColor: banner.textColor
    });
    setShowModal(true);
  };

  const handleDeleteBanner = async (bannerId) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      setBanners(banners.filter(b => b.id !== bannerId));
      toast.success('Banner deleted successfully');
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
    }
  };

  const handleToggleStatus = async (bannerId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      setBanners(banners.map(b => b.id === bannerId ? { ...b, status: newStatus } : b));
      toast.success(`Banner ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating banner status:', error);
      toast.error('Failed to update banner status');
    }
  };

  const handleMoveOrder = async (bannerId, direction) => {
    try {
      const bannerIndex = banners.findIndex(b => b.id === bannerId);
      if ((direction === 'up' && bannerIndex === 0) || (direction === 'down' && bannerIndex === banners.length - 1)) return;
      const newBanners = [...banners];
      const swapIndex = direction === 'up' ? bannerIndex - 1 : bannerIndex + 1;
      [newBanners[bannerIndex], newBanners[swapIndex]] = [newBanners[swapIndex], newBanners[bannerIndex]];
      setBanners(newBanners);
      toast.success('Banner order updated');
    } catch (error) {
      console.error('Error updating banner order:', error);
      toast.error('Failed to update banner order');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'create') {
        const newBanner = { id: Date.now(), ...formData, views: 0, clicks: 0 };
        setBanners([newBanner, ...banners]);
        toast.success('Banner created successfully');
      } else {
        setBanners(banners.map(b => b.id === selectedBanner.id ? { ...b, ...formData } : b));
        toast.success('Banner updated successfully');
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving banner:', error);
      toast.error('Failed to save banner');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || banner.status === filterStatus;
    const matchesPosition = filterPosition === 'all' || banner.position === filterPosition;
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800', inactive: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800', expired: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPositionColor = (position) => {
    const colors = {
      hero: 'bg-purple-100 text-purple-800', promotional: 'bg-orange-100 text-orange-800',
      sidebar: 'bg-blue-100 text-blue-800'
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600 mt-1">Manage promotional banners and hero sections</p>
        </div>
        <button onClick={handleCreateBanner} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} /><span>Create Banner</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search banners..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Status</option><option value="active">Active</option>
            <option value="inactive">Inactive</option><option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
          </select>
          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Positions</option><option value="hero">Hero Section</option>
            <option value="promotional">Promotional</option><option value="sidebar">Sidebar</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredBanners.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <ImageIcon className="mx-auto mb-4 text-gray-400" size={64} />
            <p className="text-gray-500 text-lg">No banners found</p>
          </div>
        ) : (
          filteredBanners.map((banner, index) => (
            <div key={banner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <img src={banner.imageUrl} alt={banner.title} className="w-full h-48 md:h-full object-cover" />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(banner.status)}`}>
                      {banner.status.charAt(0).toUpperCase() + banner.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(banner.position)}`}>
                      {banner.position.charAt(0).toUpperCase() + banner.position.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{banner.title}</h3>
                      <p className="text-lg text-gray-700 mb-2">{banner.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-3">{banner.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center"><Calendar size={14} className="mr-1" />
                          <span>{banner.startDate} to {banner.endDate}</span>
                        </div>
                        <div className="flex items-center"><Eye size={14} className="mr-1" />
                          <span>{banner.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center"><LinkIcon size={14} className="mr-1" />
                          <span>{banner.clicks.toLocaleString()} clicks</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a href={banner.linkUrl} className="text-sm text-blue-600 hover:text-blue-700 font-medium" target="_blank" rel="noopener noreferrer">
                          {banner.linkText} →
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <button onClick={() => handleMoveOrder(banner.id, 'up')} disabled={index === 0}
                        className={`p-2 rounded-lg transition-colors ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`} title="Move Up">
                        <ArrowUp size={18} />
                      </button>
                      <button onClick={() => handleMoveOrder(banner.id, 'down')} disabled={index === filteredBanners.length - 1}
                        className={`p-2 rounded-lg transition-colors ${index === filteredBanners.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`} title="Move Down">
                        <ArrowDown size={18} />
                      </button>
                      <button onClick={() => handleToggleStatus(banner.id, banner.status)}
                        className={`p-2 rounded-lg transition-colors ${banner.status === 'active' ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}
                        title={banner.status === 'active' ? 'Deactivate' : 'Activate'}>
                        {banner.status === 'active' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button onClick={() => handleEditBanner(banner)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteBanner(banner.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Background:</span>
                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: banner.backgroundColor }}></div>
                      <span className="text-xs text-gray-500 font-mono">{banner.backgroundColor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Text:</span>
                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: banner.textColor }}></div>
                      <span className="text-xs text-gray-500 font-mono">{banner.textColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{modalMode === 'create' ? 'Create New Banner' : 'Edit Banner'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Summer Sale 2024" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Up to 50% Off" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief description of the banner" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://example.com/banner-image.jpg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                  <input type="url" name="linkUrl" value={formData.linkUrl} onChange={handleInputChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="/products" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Text</label>
                  <input type="text" name="linkText" value={formData.linkText} onChange={handleInputChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Shop Now" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <select name="position" value={formData.position} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="hero">Hero Section</option><option value="promotional">Promotional</option><option value="sidebar">Sidebar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="active">Active</option><option value="inactive">Inactive</option><option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" name="order" value={formData.order} onChange={handleInputChange} min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                  <div className="flex space-x-2">
                    <input type="color" name="backgroundColor" value={formData.backgroundColor} onChange={handleInputChange}
                      className="h-10 w-16 border border-gray-300 rounded cursor-pointer" />
                    <input type="text" name="backgroundColor" value={formData.backgroundColor} onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm" placeholder="#ffffff" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex space-x-2">
                    <input type="color" name="textColor" value={formData.textColor} onChange={handleInputChange}
                      className="h-10 w-16 border border-gray-300 rounded cursor-pointer" />
                    <input type="text" name="textColor" value={formData.textColor} onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm" placeholder="#000000" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save size={18} /><span>{modalMode === 'create' ? 'Create Banner' : 'Update Banner'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;
