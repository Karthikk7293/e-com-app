# Test Credentials

## Overview
Static test credentials have been added to the application for easy testing and navigation without requiring a backend API.

## Available Test Accounts

### 1. Admin Account
**Access to all admin features and management pages**

- **Email:** `admin@example.com`
- **Password:** `password`
- **Role:** Admin
- **Name:** Admin User
- **Phone:** +1 234 567 8900

**Admin Access:**
- Dashboard (`/admin`)
- Product Management (`/admin/products`)
- User Management (`/admin/users`)
- Order Management (`/admin/orders`)
- Payment Management (`/admin/payments`)
- All customer features

### 2. Customer Account
**Access to customer features only**

- **Email:** `user@example.com`
- **Password:** `password`
- **Role:** Customer
- **Name:** Test User
- **Phone:** +1 234 567 8901

**Customer Access:**
- Home page
- Product browsing
- Shopping cart
- Checkout
- Order history
- Profile management
- Wishlist

## How to Use

### Method 1: Quick Login Buttons
1. Navigate to the login page (`/login`)
2. Click either "Login as Admin" or "Login as Customer" button
3. You'll be automatically logged in and redirected

### Method 2: Manual Login
1. Navigate to the login page (`/login`)
2. Enter the email and password from above
3. Click "Sign In"

### Method 3: Direct Navigation
If you're already logged in with admin credentials, you can directly navigate to:
- `http://localhost:5173/admin` - Admin Dashboard
- `http://localhost:5173/admin/products` - Product Management
- `http://localhost:5173/admin/users` - User Management
- `http://localhost:5173/admin/orders` - Order Management
- `http://localhost:5173/admin/payments` - Payment Management

## Implementation Details

### Location
The test credentials are implemented in:
- **File:** `src/store/slices/authSlice.js`
- **Constant:** `TEST_CREDENTIALS`

### How It Works
1. When a user attempts to login, the system first checks if the credentials match the test accounts
2. If matched, it returns a mock user object and token without making an API call
3. If not matched, it attempts to authenticate with the actual backend API
4. This allows the app to work both with test credentials and real backend authentication

### Authentication Flow
```javascript
Login Attempt
    ↓
Check Test Credentials
    ↓
Match Found? → Yes → Return Mock User & Token
    ↓
    No
    ↓
Call Backend API
    ↓
Return API Response
```

### Security Notes
- Test credentials are only for development/testing
- They simulate a 500ms API delay for realistic UX
- Tokens are stored in localStorage like real authentication
- Protected routes still enforce role-based access control
- Admin routes require `role: 'admin'`

## Testing Admin Features

### 1. Login as Admin
```
Email: admin@example.com
Password: password
```

### 2. Navigate to Admin Dashboard
After login, go to `/admin` or click the admin link in the navigation

### 3. Test Each Management Section

**Dashboard:**
- View statistics cards
- Check recent orders
- Review top products

**Product Management:**
- Create new products
- Edit existing products
- Delete products
- Update stock levels
- Search and filter

**User Management:**
- View all users
- Change user roles
- Suspend/activate accounts
- View user details
- Filter by role/status

**Order Management:**
- View all orders
- Update order status
- View order details
- Filter by status

**Payment Management:**
- View payment statistics
- Check transaction details
- Process refunds
- Filter by status/method

## Removing Test Credentials

If you want to remove test credentials in production:

1. Open `src/store/slices/authSlice.js`
2. Remove or comment out the `TEST_CREDENTIALS` constant
3. Remove the test credential check in the `login` thunk
4. Keep only the API call:

```javascript
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
```

## Troubleshooting

### Issue: Can't access admin pages
**Solution:** Make sure you're logged in with the admin account (`admin@example.com`)

### Issue: Redirected to home page when accessing /admin
**Solution:** The account you're using doesn't have admin role. Logout and login with admin credentials.

### Issue: Login button not working
**Solution:** Check browser console for errors. Make sure the app is running properly.

### Issue: Test credentials not working
**Solution:** Verify you're using the exact credentials:
- Email: `admin@example.com` (lowercase)
- Password: `password` (lowercase)

## Additional Notes

- Test credentials work offline (no backend required)
- All admin features use mock data currently
- To connect to a real backend, update the API calls in admin pages
- User data persists in localStorage until logout
- Refreshing the page maintains the logged-in state

## Next Steps

1. **Backend Integration:** Replace mock data with real API calls
2. **Production Setup:** Remove test credentials before deploying
3. **Enhanced Security:** Implement proper JWT token validation
4. **User Registration:** Add real user registration with backend
5. **Password Reset:** Implement forgot password functionality

---

**Last Updated:** October 14, 2025
**Version:** 1.0.0
