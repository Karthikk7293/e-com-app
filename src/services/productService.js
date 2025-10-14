export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice) return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};

export const isProductInStock = (product) => {
  return product?.stock > 0;
};

export const getProductAvailability = (product) => {
  if (!product) return 'unavailable';
  if (product.stock === 0) return 'out_of_stock';
  if (product.stock < 10) return 'low_stock';
  return 'in_stock';
};

export const filterProducts = (products, filters) => {
  let filtered = [...products];

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  // Filter by rating
  if (filters.minRating) {
    filtered = filtered.filter(p => p.rating >= filters.minRating);
  }

  // Filter by availability
  if (filters.inStockOnly) {
    filtered = filtered.filter(p => isProductInStock(p));
  }

  return filtered;
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price_low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'popular':
      return sorted.sort((a, b) => b.soldCount - a.soldCount);
    default:
      return sorted;
  }
};

export const searchProductsByQuery = (products, query) => {
  if (!query) return products;
  
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description?.toLowerCase().includes(lowerQuery) ||
    p.category?.toLowerCase().includes(lowerQuery)
  );
};
