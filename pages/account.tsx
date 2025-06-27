'use client';

import AccountOrders from '@/components/account/AccountOrders';
import AddressBook from '@/components/account/AddressBook';
import PromoWallet from '@/components/account/PromoWallet';
import PreferencesPanel from '@/components/account/PreferencesPanel';

export default function AccountPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">My Account</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        <AccountOrders />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Saved Addresses</h2>
        <AddressBook />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Promo Wallet</h2>
        <PromoWallet />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Preferences</h2>
        <PreferencesPanel />
      </section>
    </main>
  );
}
