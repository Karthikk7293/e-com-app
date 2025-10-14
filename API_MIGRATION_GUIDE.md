# API Migration Guide

## Migration from FakeStore API to DummyJSON API

### Why DummyJSON?

**DummyJSON** is a superior alternative to FakeStore API with significantly more features:

#### Features Comparison:

| Feature | FakeStore API | DummyJSON API |
|---------|--------------|---------------|
| Products | 20 products | **194 products** |
| Search | ❌ No | ✅ Yes |
| Pagination | ❌ No | ✅ Yes (skip/limit) |
| Filtering | Limited | ✅ Advanced |
| Sorting | ❌ No | ✅ Yes |
| User Authentication | Basic | ✅ Full JWT auth |
| Carts | Basic | ✅ Full cart management |
| Categories | 4 categories | **Multiple categories** |
| Product Images | 1 image | ✅ Multiple images |
| Product Details | Basic | ✅ Rich (stock, brand, rating, etc.) |
| Response Format | Simple | ✅ Structured with metadata |

### API Endpoints

#### Base URL
```
https://dummyjson.com
```

#### Available Endpoints:

1. **Get All Products**
   ```
   GET /products
   Query params: limit, skip
   ```

2. **Get Single Product**
   ```
   GET /products/{id}
   ```

3. **Search Products**
   ```
   GET /products/search?q={query}
   ```

4. **Get Categories**
   ```
   GET /products/categories
   ```

5. **Get Products by Category**
   ```
   GET /products/category/{category}
   ```

### Response Format

#### Products List Response:
```json
{
  "products": [...],
  "total": 194,
  "skip": 0,
  "limit": 30
}
```

#### Single Product Response:
```json
{
  "id": 1,
  "title": "Product Name",
  "description": "...",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Brand Name",
  "category": "category-name",
  "thumbnail": "https://...",
  "images": ["https://...", "https://..."]
}
```

### Changes Made

#### Files Modified:

1. **`src/config/constants.js`**
   - Changed `FAKE_STORE_API` to `API_BASE_URL`
   - Updated to use DummyJSON base URL

2. **`src/api/productApi.js`**
   - Updated all API calls to use DummyJSON endpoints
   - Added proper pagination support (skip/limit)
   - Implemented native search functionality

3. **`src/pages/home/Home.jsx`**
   - Updated to handle both image formats
   - Added support for `thumbnail` and `images` array

4. **`src/store/slices/productSlice.js`**
   - Already compatible with both formats
   - Handles both array and object responses

### Product Image Handling

The code now supports multiple image formats:
```javascript
const productImage = product.thumbnail || product.image || product.images?.[0] || 'fallback-url';
```

This ensures compatibility with:
- DummyJSON format: `thumbnail` or `images` array
- FakeStore format: `image` string
- Fallback placeholder if none available

### Benefits

✅ **More Products**: 194 products vs 20
✅ **Better Search**: Native search functionality
✅ **Pagination**: Proper skip/limit support
✅ **Rich Data**: More product details (stock, brand, discount, etc.)
✅ **Multiple Images**: Products have multiple images
✅ **Better Performance**: Optimized API responses
✅ **Active Development**: Regularly updated and maintained

### Testing

After migration, test the following:
1. ✅ Home page product display
2. ✅ Product search functionality
3. ✅ Category filtering
4. ✅ Product detail pages
5. ✅ Add to cart functionality
6. ✅ Product images loading

### Additional Resources

- **Documentation**: https://dummyjson.com/docs
- **GitHub**: https://github.com/Ovi/DummyJSON
- **Test Endpoints**: All endpoints can be tested directly in browser

### Future Enhancements

With DummyJSON, you can now implement:
- Advanced filtering (by price, rating, brand)
- Sorting options (price, rating, name)
- Pagination with skip/limit
- User authentication with JWT
- Cart management
- User reviews and ratings
