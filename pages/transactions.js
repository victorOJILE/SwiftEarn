import transactions from '../components/transactions.js';

export default function Transactions(uid) {
 return cEl('main', { class: 'p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
   transactions(uid)
  );
}