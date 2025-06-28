type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  promoEnd?: string;
  category: string; // ✅ Added to ensure Next.js build compiles
};
