'use client';

import { useState } from 'react';

type Address = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      street: '123 Main St',
      city: 'Columbia',
      state: 'TN',
      zip: '38401',
    },
  ]);

  const [newAddress, setNewAddress] = useState<Address>({
    id: '',
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  }

  function handleAdd() {
    if (!newAddress.name || !newAddress.street) return;
    setAddresses((prev) => [
      ...prev,
      { ...newAddress, id: Date.now().toString() },
    ]);
    setNewAddress({ id: '', name: '', street: '', city: '', state: '', zip: '' });
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {addresses.map((addr) => (
          <li key={addr.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{addr.name}</p>
                <p className="text-sm text-gray-600">
                  {addr.street}, {addr.city}, {addr.state} {addr.zip}
                </p>
              </div>
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Add New Address</h3>
        <div className="grid grid-cols-2 gap-2">
          <input name="name" placeholder="Label (e.g. Home)" value={newAddress.name} onChange={handleChange} className="border p-2 rounded" />
          <input name="street" placeholder="Street" value={newAddress.street} onChange={handleChange} className="border p-2 rounded" />
          <input name="city" placeholder="City" value={newAddress.city} onChange={handleChange} className="border p-2 rounded" />
          <input name="state" placeholder="State" value={newAddress.state} onChange={handleChange} className="border p-2 rounded" />
          <input name="zip" placeholder="ZIP" value={newAddress.zip} onChange={handleChange} className="border p-2 rounded col-span-2" />
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Address
        </button>
      </div>
    </div>
  );
}
