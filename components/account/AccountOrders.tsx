'use client';

import { useEffect, useState } from 'react';
import { getOrderHistory } from '@/lib/orders'; // You'll create this mock or real API
import type { Order } from '@/types';
import Link from 'next/link';

export default function AccountOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrderHistory(); // Replace with real fetch logic
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p className="text-gray-500">You haven’t placed any orders yet.</p>;

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id} className="border p-4 rounded shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${order.total.toFixed(2)}</p>
              <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.status}
              </p>
            </div>
          </div>
          <Link href={`/orders/${order.id}`} className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            View Details
          </Link>
        </li>
      ))}
    </ul>
  );
}
