import Image from 'next/image';

type ProductCardProps = {
  title: string;
  price: number;
  imageUrl: string;
};

export default function ProductCard({ title, price, imageUrl }: ProductCardProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <Image src={imageUrl} alt={title} width={300} height={200} style={{ borderRadius: '4px' }} />
      <h3>{title}</h3>
      <p style={{ fontWeight: 'bold' }}>${(price / 100).toFixed(2)}</p>
    </div>
  );
}
