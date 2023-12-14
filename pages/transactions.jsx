import { Head } from 'next/head';
import Transactions from '../components/transactions.js';

export default function Transactions({ uid }) {
 return (
 	<>
 		<Head>
 			<title>SwiftEarn - View your Account Transactions</title>
 		</Head>
	  <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto">
	   <Transactions uid={uid} />
	  </main>
  </>
 );
}