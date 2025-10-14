import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Gift, Tag } from 'lucide-react';
import Button from '../common/Button';

const BannerCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Banner data - can be fetched from API in production
  const banners = [
    {
      id: 1,
      type: 'trending',
      title: 'Trending Now',
      subtitle: 'Hot Deals This Week',
      description: 'Get up to 60% off on trending products. Limited time offer!',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop',
      bgGradient: 'from-orange-500 via-red-500 to-pink-600',
      icon: TrendingUp,
      cta: 'Shop Trending',
      link: '/products?sort=trending',
    },
    {
      id: 2,
      type: 'new-arrivals',
      title: 'New Arrivals',
      subtitle: 'Fresh Collection 2025',
      description: 'Discover the latest products just added to our store',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      bgGradient: 'from-blue-600 via-purple-600 to-indigo-700',
      icon: Sparkles,
      cta: 'Explore New',
      link: '/products?sort=newest',
    },
    {
      id: 3,
      type: 'festival',
      title: 'Festival Sale',
      subtitle: 'Celebrate with Amazing Offers',
      description: 'Special discounts on all categories. Shop now and save big!',
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=600&fit=crop',
      bgGradient: 'from-yellow-500 via-orange-500 to-red-600',
      icon: Gift,
      cta: 'Shop Festival Sale',
      link: '/products?sale=festival',
    },
    {
      id: 4,
      type: 'clearance',
      title: 'Mega Clearance',
      subtitle: 'Up to 70% Off',
      description: 'Huge savings on selected items. While stocks last!',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=600&fit=crop',
      bgGradient: 'from-green-600 via-teal-600 to-cyan-700',
      icon: Tag,
      cta: 'Shop Clearance',
      link: '/products?sale=clearance',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        {banners.map((banner, index) => {
          const Icon = banner.icon;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} opacity-80`}></div>
                <div className="absolute inset-0 bg-black opacity-20"></div>
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl text-white">
                  {/* Icon Badge */}
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
                    <Icon className="mr-2" size={20} />
                    <span className="font-semibold text-sm uppercase tracking-wide">
                      {banner.type.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight drop-shadow-lg">
                    {banner.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-yellow-300 drop-shadow-md">
                    {banner.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-100 max-w-xl drop-shadow-md">
                    {banner.description}
                  </p>

                  {/* CTA Button */}
                  <Button
                    onClick={() => navigate(banner.link)}
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all font-bold"
                  >
                    {banner.cta}
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-10 blur-3xl animate-pulse"></div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 z-10 group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 z-10 group"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
                ? 'bg-white w-12 h-3'
                : 'bg-white/50 hover:bg-white/75 w-3 h-3'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
          <div
            className="h-full bg-white transition-all duration-[5000ms] ease-linear"
            style={{ width: currentSlide === currentSlide ? '100%' : '0%' }}
          />
        </div>
      )}
    </section>
  );
};

export default BannerCarousel;
