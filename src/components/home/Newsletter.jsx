import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Mail className="text-white" size={32} />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products, exclusive deals, and special offers delivered straight to your inbox!
          </p>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-base md:text-lg"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl font-bold whitespace-nowrap"
              >
                <Send size={20} className="mr-2" />
                Subscribe Now
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg max-w-xl mx-auto border-2 border-white/30">
              <CheckCircle className="text-green-300" size={28} />
              <p className="text-white text-lg font-semibold">
                Thank you for subscribing! Check your inbox for confirmation.
              </p>
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-sm text-gray-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm md:text-base text-gray-200">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">Weekly</div>
              <div className="text-sm md:text-base text-gray-200">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">Exclusive</div>
              <div className="text-sm md:text-base text-gray-200">Deals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
