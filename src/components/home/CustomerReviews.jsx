import { Star, Quote, ThumbsUp, Verified } from 'lucide-react';

const CustomerReviews = () => {
  // Top 10 customer reviews
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      date: 'Jan 15, 2025',
      review: 'Absolutely love shopping here! The quality of products is outstanding and delivery is always on time. Customer service is top-notch!',
      product: 'Premium Wireless Headphones',
      verified: true,
      helpful: 245,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      date: 'Jan 12, 2025',
      review: 'Best online shopping experience ever! Great prices, amazing deals, and the website is so easy to navigate. Highly recommended!',
      product: 'Smart Watch Pro',
      verified: true,
      helpful: 198,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      date: 'Jan 10, 2025',
      review: 'I\'ve been a loyal customer for over a year now. The product variety is incredible and the quality never disappoints. Five stars!',
      product: 'Designer Handbag',
      verified: true,
      helpful: 187,
    },
    {
      id: 4,
      name: 'David Thompson',
      avatar: 'https://i.pravatar.cc/150?img=13',
      rating: 5,
      date: 'Jan 8, 2025',
      review: 'Fast shipping, excellent packaging, and the product exceeded my expectations. Will definitely shop here again!',
      product: 'Gaming Laptop',
      verified: true,
      helpful: 176,
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      date: 'Jan 5, 2025',
      review: 'Outstanding service! Had a question about my order and customer support responded within minutes. Very impressed!',
      product: 'Fitness Tracker',
      verified: true,
      helpful: 165,
    },
    {
      id: 6,
      name: 'Robert Anderson',
      avatar: 'https://i.pravatar.cc/150?img=14',
      rating: 5,
      date: 'Jan 3, 2025',
      review: 'The best deals I\'ve found online! Product quality is excellent and the checkout process is seamless. Highly satisfied!',
      product: 'Bluetooth Speaker',
      verified: true,
      helpful: 154,
    },
    {
      id: 7,
      name: 'Amanda White',
      avatar: 'https://i.pravatar.cc/150?img=10',
      rating: 5,
      date: 'Dec 30, 2024',
      review: 'I love the variety of products available. Everything I ordered arrived in perfect condition. Great shopping experience!',
      product: 'Kitchen Appliance Set',
      verified: true,
      helpful: 143,
    },
    {
      id: 8,
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      date: 'Dec 28, 2024',
      review: 'Fantastic website with amazing products! The user interface is intuitive and finding what I need is always easy.',
      product: 'Running Shoes',
      verified: true,
      helpful: 132,
    },
    {
      id: 9,
      name: 'Lisa Brown',
      avatar: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      date: 'Dec 25, 2024',
      review: 'Excellent quality products at competitive prices. The return policy is fair and hassle-free. Very happy customer!',
      product: 'Winter Jacket',
      verified: true,
      helpful: 128,
    },
    {
      id: 10,
      name: 'Christopher Lee',
      avatar: 'https://i.pravatar.cc/150?img=17',
      rating: 5,
      date: 'Dec 22, 2024',
      review: 'This is my go-to store for all my shopping needs. Great selection, fair prices, and reliable delivery every time!',
      product: 'Office Chair',
      verified: true,
      helpful: 115,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
            <Star className="text-white fill-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Top Customer Reviews
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            See what our happy customers are saying about their shopping experience
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
              ))}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900">5.0</div>
              <div className="text-sm text-gray-600">Based on 10,000+ reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-blue-100">
                <Quote size={48} />
              </div>

              {/* Header */}
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-100"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
                    {review.verified && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <Verified size={12} />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                    {review.product}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-4 relative z-10">
                "{review.review}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group">
                  <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            View All Reviews
            <Star size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
