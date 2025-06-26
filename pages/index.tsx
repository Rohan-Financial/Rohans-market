import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '@/lib/CartContext';
import MiniCart from '@/components/MiniCart';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <MiniCart />
      <Component {...pageProps} />
    </CartProvider>
  );
}
