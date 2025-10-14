# Quick Start Guide - Admin Access

## 🚀 App is Running!
Your development server should be running at: **http://localhost:5173**

## 🔐 Test Admin Login

### Quick Access (Recommended)
1. Open your browser and go to: **http://localhost:5173/login**
2. Click the **"Login as Admin"** button (blue button)
3. You'll be automatically logged in and redirected to the home page

### Manual Login
1. Go to: **http://localhost:5173/login**
2. Enter credentials:
   - **Email:** `admin@example.com`
   - **Password:** `password`
3. Click "Sign In"

## 📊 Admin Panel Access

After logging in as admin, access the admin panel:

### Direct URL
Navigate to: **http://localhost:5173/admin**

### Via Navigation
Look for the admin link in the navigation menu (visible only to admin users)

## 🎯 Admin Pages

Once in the admin panel, you can access:

| Page | URL | Features |
|------|-----|----------|
| **Dashboard** | `/admin` | Statistics, recent orders, top products |
| **Product Management** | `/admin/products` | CRUD operations, stock management |
| **User Management** | `/admin/users` | User roles, account status |
| **Order Management** | `/admin/orders` | Order tracking, status updates |
| **Payment Management** | `/admin/payments` | Transaction tracking, refunds |
| **Banner Management** | `/admin/banners` | Promotional banners, scheduling |

## 👤 Test Accounts

### Admin Account (Full Access)
```
Email: admin@example.com
Password: password
```

### Customer Account (Limited Access)
```
Email: user@example.com
Password: password
```

## 🎨 What You Can Test

### Product Management
- ✅ Create new products
- ✅ Edit product details
- ✅ Delete products
- ✅ Update stock levels
- ✅ Search and filter products

### User Management
- ✅ View all users
- ✅ Change user roles (Customer ↔ Admin)
- ✅ Suspend/Activate accounts
- ✅ View user analytics

### Order Management
- ✅ View all orders
- ✅ Update order status
- ✅ View order details
- ✅ Filter by status

### Payment Management
- ✅ View payment statistics
- ✅ Track transactions
- ✅ Process refunds
- ✅ Filter by status/method

### Banner Management
- ✅ Create promotional banners
- ✅ Edit banner content
- ✅ Schedule campaigns
- ✅ Reorder display
- ✅ Toggle visibility
- ✅ Track performance (views/clicks)
- ✅ Customize colors

## 🔄 Switching Between Accounts

1. Click your profile/avatar in the navigation
2. Select "Logout"
3. Return to login page
4. Choose different account (Admin or Customer)

## 📱 Mobile Testing

The admin panel is fully responsive. Test on:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🛠️ Development Tips

### Hot Reload
The app uses Vite with hot module replacement. Changes to code will automatically refresh the browser.

### Browser DevTools
Press `F12` to open developer tools and check:
- Console for any errors
- Network tab for API calls
- Application tab for localStorage (auth tokens)

### Redux DevTools
If you have Redux DevTools extension installed, you can:
- View current auth state
- Track login/logout actions
- Inspect user data

## 📝 Common Tasks

### Task 1: Create a Product
1. Go to `/admin/products`
2. Click "Add Product"
3. Fill in the form
4. Click "Create Product"

### Task 2: Change User Role
1. Go to `/admin/users`
2. Find a user
3. Use the role dropdown to change their role
4. Changes save automatically

### Task 3: Update Order Status
1. Go to `/admin/orders`
2. Find an order
3. Use the status dropdown
4. Select new status (Pending → Processing → Shipped → Delivered)

### Task 4: Process a Refund
1. Go to `/admin/payments`
2. Find a completed payment
3. Click the eye icon to view details
4. Click "Process Refund"

### Task 5: Create a Banner
1. Go to `/admin/banners`
2. Click "Create Banner"
3. Fill in title, subtitle, description
4. Add image URL and link
5. Choose position and set colors
6. Set start/end dates
7. Click "Create Banner"

## 🐛 Troubleshooting

### Can't Access Admin Pages
- **Check:** Are you logged in as admin?
- **Solution:** Logout and login with `admin@example.com`

### Page Not Found
- **Check:** Is the dev server running?
- **Solution:** Run `npm run dev` in the project directory

### Login Not Working
- **Check:** Are you using correct credentials?
- **Solution:** Use exactly: `admin@example.com` / `password`

### Changes Not Saving
- **Note:** Currently using mock data
- **Solution:** Changes are stored in component state (not persisted)

## 🎯 Next Steps

1. **Explore all admin pages** - Click through each section
2. **Test CRUD operations** - Create, edit, delete items
3. **Try filters and search** - Use search bars and dropdowns
4. **Check responsiveness** - Resize browser window
5. **Test user flows** - Complete full workflows

## 📚 Additional Resources

- **Admin Module Documentation:** `src/pages/admin/README.md`
- **Test Credentials Guide:** `TEST_CREDENTIALS.md`
- **Implementation Summary:** `ADMIN_MODULE_SUMMARY.md`

## 💡 Pro Tips

1. **Use Quick Login Buttons** - Fastest way to switch accounts
2. **Check Browser Console** - Helpful for debugging
3. **Use Search Features** - Quickly find items in tables
4. **Try Keyboard Navigation** - Tab through forms
5. **Test Error States** - Try invalid operations

---

**Happy Testing! 🎉**

If you encounter any issues, check the browser console for error messages or refer to the documentation files.
