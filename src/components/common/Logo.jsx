import { ShoppingBag } from 'lucide-react';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: {
      icon: 24,
      text: 'text-xl',
      container: 'w-8 h-8',
    },
    md: {
      icon: 32,
      text: 'text-2xl',
      container: 'w-10 h-10',
    },
    lg: {
      icon: 40,
      text: 'text-3xl',
      container: 'w-12 h-12',
    },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`${currentSize.container} bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform`}>
        <ShoppingBag className="text-white" size={currentSize.icon} strokeWidth={2.5} />
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className={`font-extrabold ${currentSize.text} bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
          ShopHub
        </div>
      )}
    </div>
  );
};

export default Logo;
