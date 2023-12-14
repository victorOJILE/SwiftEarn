import { Head } from 'next/head';
import AddProductComp from '../../components/addProductComp.js';

export default function AddProduct({ uid }) {
 return (
 	<>
	 	<Head>
	 		<title>SwiftEarn - Add new product</title>
				<meta name="description" content="Effortlessly add, update, and showcase your offerings with a few clicks. Elevate your online presence with hassle-free product management – your success starts here!" />
	 	</Head>
	 	<AddProductComp uid={uid} />
 	</>
 );
}