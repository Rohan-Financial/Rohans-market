import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '1rem', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      <h2>Rohan’s Market</h2>
      <nav style={{ marginTop: '0.5rem' }}>
        <Link href="/">Home</Link> |{' '}
        <Link href="/marketplace">Marketplace</Link> |{' '}
        <Link href="/vendor/dashboard">Vendor Dashboard</Link>
      </nav>
    </header>
  );
}
