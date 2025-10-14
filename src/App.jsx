import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#ffffff',
                  color: '#1f2937',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e5e7eb',
                  fontWeight: '500',
                  fontSize: '14px',
                  minHeight: 'auto',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#ffffff',
                    color: '#1f2937',
                    border: '1px solid #10b981',
                    padding: '12px 16px',
                  },
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#ffffff',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#ffffff',
                    color: '#1f2937',
                    border: '1px solid #ef4444',
                    padding: '12px 16px',
                  },
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                  },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
