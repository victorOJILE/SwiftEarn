import { Link } from 'next/link';

export default function generateList({ product }) {

	return (
	 <li className="grid grid-cols-7 md:grid-cols-1 border-b-2 border-gray-400 py-4">
   <div className="col-span-2 p-3 md:p-0">
			 <img src={product.productImageUrl || 'product.png'} />
		 </div>
		 <div className="col-span-5 py-2 pr-2">
 			<a onClick={ Link(e, paths.product, { prdid: encodeURIComponent(product.product_id) })
 			 } className="pr-1" href={'/product/' + product.product_id }>
 				<h3 className="font-bold line-clamp text-xs sm:text-sm">{ product.name || 'Check for more information' }</h3>
 				<p className="font-light text-gray-400 text-xs sm:text-sm">{ 'By ' + (product.vendor_name || '') }</p>
 				<div className="text-xs">
 					<span className="font-bold">{ new Intl.NumberFormat('en', { 
        style: 'currency', currency: 'USD' 
       }).format(product.price) }</span>
 					<span className="px-2 text-gray-400">
 						<span>|</span>
 					</span>
 					<span className="text-yellow-600">{ (product.commission || '0') + '% comm' }</span>
 				</div>
 			</a>
			 <button className="bg-green-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded">Promote</button>
		 </div>
		</li>
	);
}