'use client';

import { useState } from 'react';
import { addToCart } from '@/lib/cart';
import toast from 'react-hot-toast';

type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
  items: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
};

const mockOrders: Order[] = [
  {
    id: 'ORD-1001',
    date: '2025-06-01',
    total: 129.99,
    status: 'Delivered',
    items: [
      {
        id: 'p1',
        name: 'Leather Messenger Bag',
        price: 89.99,
        image: '/products/bag.jpg',
        quantity: 1,
      },
      {
        id: 'p2',
        name: 'Wireless Mouse',
        price: 40.00,
        image: '/products/mouse.jpg',
        quantity: 1,
      },
    ],
  },
  {
    id: 'ORD-1000',
    date: '2025-05-15',
    total: 59.99,
    status: 'Delivered',
    items: [
      {
        id: 'p3',
        name: 'Bluetooth Speaker',
        price: 59.99,
        image: '/products/speaker.jpg',
        quantity: 1,
      },
    ],
  },
];

export default function OrdersPage() {
  const [orders] = useState(mockOrders);

  const handleReorder = (items: Order['items']) => {
    items.forEach((item) => {
      addToCart(item);
    });
    toast.success('Items added to cart!');
  };

  const handleDownload = (id: string) => {
    toast('Downloading receipt for ' + id);
    // Simulate download logic
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-6 bg-white shadow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <span className="text-sm text-green-600 font-medium">{order.status}</span>
          </div>

          <ul className="divide-y">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload(order.id)}
                className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Download Receipt
              </button>
              <button
                onClick={() => handleReorder(order.items)}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Reorder
              </button>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
