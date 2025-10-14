# Admin Module Documentation

## Overview
The Admin Module is a comprehensive management system for the e-commerce application. It provides a complete dashboard and management interface for administrators to control all aspects of the platform.

## Features

### 1. Dashboard (`/admin`)
- **Real-time Statistics**: View key metrics including total users, products, orders, and revenue
- **Growth Indicators**: Track month-over-month growth with visual indicators
- **Recent Orders**: Quick view of the latest customer orders
- **Top Products**: See best-selling products by revenue
- **Visual Analytics**: Color-coded stats cards with icons

### 2. Product Management (`/admin/products`)
- **CRUD Operations**: Create, Read, Update, Delete products
- **Stock Management**: Track and update inventory levels
- **Search & Filter**: Find products quickly by name, category, or brand
- **Stock Status Indicators**: Visual alerts for low stock and out-of-stock items
- **Bulk Operations**: Manage multiple products efficiently
- **Product Details**: 
  - Title, Description
  - Price, Category, Brand
  - Stock quantity
  - Thumbnail and images

### 3. User Management (`/admin/users`)
- **User Overview**: View all registered users with detailed information
- **Role Management**: Assign and modify user roles (Customer, Admin)
- **Status Control**: Activate or suspend user accounts
- **Search & Filter**: Filter by role, status, or search by name/email
- **User Analytics**: View total orders and spending per user
- **User Details Modal**: Comprehensive view of user information
- **Actions**:
  - View user details
  - Change user role
  - Suspend/Activate accounts
  - Delete users

### 4. Order Management (`/admin/orders`)
- **Order Tracking**: Monitor all customer orders in real-time
- **Status Management**: Update order status (Pending → Processing → Shipped → Delivered)
- **Search & Filter**: Find orders by ID, customer, or status
- **Order Details**: 
  - Customer information
  - Order items with quantities and prices
  - Payment status and method
  - Shipping address
  - Order timeline
- **Status Updates**: Quick dropdown to change order status
- **Export Functionality**: Download order reports

### 5. Payment Management (`/admin/payments`)
- **Payment Tracking**: Monitor all payment transactions
- **Payment Statistics**: 
  - Total revenue
  - Successful payments count
  - Pending payments
  - Failed payments
- **Payment Details**:
  - Transaction ID
  - Order reference
  - Customer information
  - Payment method (Credit Card, PayPal, Bank Transfer, etc.)
  - Card details (last 4 digits)
  - Payment status
- **Refund Processing**: Issue refunds for completed payments
- **Multi-filter Search**: Filter by status, payment method, or search terms
- **Export Reports**: Download payment transaction reports

### 6. Banner Management (`/admin/banners`)
- **Banner CRUD**: Create, Read, Update, Delete promotional banners
- **Visual Preview**: See banner images with live preview
- **Position Management**: Assign banners to different positions (Hero, Promotional, Sidebar)
- **Status Control**: Activate, deactivate, or schedule banners
- **Date Scheduling**: Set start and end dates for banner campaigns
- **Order Management**: Reorder banners with up/down arrows
- **Color Customization**: Set background and text colors with color picker
- **Analytics Tracking**: View impressions (views) and click-through rates
- **Search & Filter**: Filter by status, position, or search terms
- **Banner Details**:
  - Title, subtitle, description
  - Image URL
  - Link URL and link text
  - Display position
  - Active dates
  - Background/text colors
  - View and click statistics

## Technical Architecture

### File Structure
```
src/pages/admin/
├── Dashboard.jsx              # Main admin dashboard
├── ProductManagement.jsx      # Product CRUD & stock management
├── UserManagement.jsx         # User administration
├── OrderManagement.jsx        # Order tracking & management
├── PaymentManagement.jsx      # Payment & refund management
├── BannerManagement.jsx       # Banner & promotional management
└── README.md                  # This file

src/api/
└── adminApi.js               # Admin API service layer

src/components/layout/
├── AdminLayout.jsx           # Admin layout wrapper
└── Sidebar.jsx              # Admin navigation sidebar

src/routes/
└── AppRoutes.jsx            # Admin route configuration
```

### State Management
- Uses React hooks (`useState`, `useEffect`) for local state
- Redux for authentication state
- Mock data for demonstration (replace with actual API calls)

### Styling
- TailwindCSS for responsive design
- Lucide React for icons
- Custom color schemes for status indicators
- Mobile-responsive tables and layouts

## API Integration

### Admin API Service (`adminApi.js`)
All admin operations are centralized in the API service:

**Dashboard**
- `getDashboardStats()` - Fetch dashboard statistics

**Products**
- `getAllProducts(params)` - Get all products with filters
- `createProduct(data)` - Create new product
- `updateProduct(id, data)` - Update product details
- `deleteProduct(id)` - Delete product
- `updateProductStock(id, stock)` - Update stock levels

**Users**
- `getAllUsers(params)` - Get all users with filters
- `getUserById(id)` - Get user details
- `updateUserRole(id, role)` - Change user role
- `updateUserStatus(id, status)` - Activate/suspend user
- `deleteUser(id)` - Delete user account

**Orders**
- `getAllOrders(params)` - Get all orders with filters
- `getOrderById(id)` - Get order details
- `updateOrderStatus(id, status)` - Update order status
- `cancelOrder(id)` - Cancel order

**Payments**
- `getAllPayments(params)` - Get all payments with filters
- `getPaymentById(id)` - Get payment details
- `refundPayment(id)` - Process refund
- `getPaymentStats()` - Get payment statistics

**Banners**
- `getAllBanners(params)` - Get all banners with filters
- `getBannerById(id)` - Get banner details
- `createBanner(data)` - Create new banner
- `updateBanner(id, data)` - Update banner details
- `deleteBanner(id)` - Delete banner
- `updateBannerStatus(id, status)` - Activate/deactivate banner
- `updateBannerOrder(id, order)` - Update display order
- `getBannerAnalytics(id)` - Get banner performance metrics

**Analytics & Export**
- `getRevenueAnalytics(params)` - Revenue analytics
- `getSalesAnalytics(params)` - Sales analytics
- `getUserAnalytics(params)` - User analytics
- `exportOrders(params)` - Export orders to CSV/Excel
- `exportPayments(params)` - Export payments to CSV/Excel
- `exportUsers(params)` - Export users to CSV/Excel

## Authentication & Authorization

### Protected Routes
All admin routes are protected by the `ProtectedRoute` component:
- Checks if user is authenticated
- Verifies admin role (`user.role === 'admin'`)
- Redirects unauthorized users to login or home page

### Access Control
```javascript
// In AppRoutes.jsx
<Route
  path="/admin/*"
  element={
    <ProtectedRoute requireAdmin>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  {/* Admin routes */}
</Route>
```

## Usage

### Accessing Admin Panel
1. Login with admin credentials
2. Navigate to `/admin` or click admin link in navigation
3. Use sidebar to navigate between management sections

### Creating a Product
1. Go to Product Management (`/admin/products`)
2. Click "Add Product" button
3. Fill in product details (name, description, price, stock, etc.)
4. Click "Create Product"

### Managing Users
1. Go to User Management (`/admin/users`)
2. Search/filter users as needed
3. Click actions to view details, change role, or suspend/activate
4. Use role dropdown to change user permissions

### Processing Orders
1. Go to Order Management (`/admin/orders`)
2. View all orders with their current status
3. Click status dropdown to update order progress
4. Click eye icon to view full order details

### Handling Payments
1. Go to Payment Management (`/admin/payments`)
2. View payment statistics at the top
3. Filter by status or payment method
4. Click eye icon to view payment details
5. Click refund icon to process refunds for completed payments

### Managing Banners
1. Go to Banner Management (`/admin/banners`)
2. Click "Create Banner" to add new promotional banner
3. Fill in banner details (title, subtitle, image, link, colors)
4. Set position (Hero, Promotional, Sidebar)
5. Set active dates and status
6. Use up/down arrows to reorder banners
7. Toggle eye icon to activate/deactivate banners
8. View analytics (views and clicks) for each banner

## Customization

### Adding New Features
1. Create new component in `src/pages/admin/`
2. Add route in `AppRoutes.jsx`
3. Add menu item in `Sidebar.jsx`
4. Create API functions in `adminApi.js`

### Styling Modifications
- Update TailwindCSS classes in components
- Modify color schemes in status indicators
- Adjust responsive breakpoints as needed

### API Integration
Replace mock data with actual API calls:
```javascript
// Before (mock data)
const mockData = [...];
setData(mockData);

// After (real API)
import { getAllProducts } from '../../api/adminApi';
const response = await getAllProducts(params);
setData(response.data);
```

## Status Color Codes

### Order Status
- **Pending**: Gray
- **Processing**: Yellow
- **Shipped**: Blue
- **Delivered**: Green
- **Cancelled**: Red

### Payment Status
- **Completed**: Green
- **Pending**: Yellow
- **Failed**: Red
- **Refunded**: Purple

### Stock Status
- **In Stock**: Green (>= 10 items)
- **Low Stock**: Yellow (< 10 items)
- **Out of Stock**: Red (0 items)

### User Status
- **Active**: Green
- **Suspended**: Red

## Best Practices

1. **Always validate input** before submitting forms
2. **Confirm destructive actions** (delete, refund) with user
3. **Show loading states** during API calls
4. **Display success/error messages** using toast notifications
5. **Handle errors gracefully** with try-catch blocks
6. **Keep UI responsive** on all screen sizes
7. **Use consistent naming** for functions and variables
8. **Comment complex logic** for maintainability

## Future Enhancements

- [ ] Advanced analytics with charts and graphs
- [ ] Bulk operations for products and users
- [ ] Email notifications for order status changes
- [ ] Inventory alerts for low stock
- [ ] Export functionality for all data tables
- [ ] Activity logs and audit trails
- [ ] Role-based permissions (Super Admin, Manager, etc.)
- [ ] Real-time updates using WebSockets
- [ ] Advanced search with multiple filters
- [ ] Product image upload functionality
- [ ] Discount and coupon management
- [ ] Customer support ticket system

## Support

For issues or questions about the admin module, please contact the development team or refer to the main project documentation.
