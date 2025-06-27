// lib/orders.ts

import type { Order } from '@/types';

export async function getOrderHistory(): Promise<Order[]> {
  // Simulated delay
  await new Promise((res) => setTimeout(res, 500));

  return [
    {
      id: '1001',
      date: '2025-06-01',
      total: 89.99,
      status: 'Delivered',
    },
    {
      id: '1002',
      date: '2025-06-15',
      total: 42.5,
      status: 'Processing',
    },
    {
      id: '1003',
      date: '2025-06-20',
      total: 120.0,
      status: 'Shipped',
    },
  ];
}
