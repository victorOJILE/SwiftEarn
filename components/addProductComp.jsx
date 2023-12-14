import { useState, useCallback, useMemo } from 'react';
import { db, addDoc, setDoc, doc, query, collection, where } from '../firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/router';
import { useAuthContext } from '../pages/_app.js';
import Img from './mediaUpload.js';

const storage = getStorage();

export default function AddProduct({ uid, productData }) {
	// productData here means we are trying to edit an existing product using this component
	const edit = productData && productData.product_id;

	return (
		edit ? <Section uid={uid} productData={productData} /> : (
			<main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto">
				<div className="mb-4 max-w-xl">
					<h2 className="text-2xl md:text-3xl mb-2">Add New Product</h2>
					<p className="color4 pr-2 text-sm"> Effortlessly add, update, and showcase your product with a few clicks. Elevate your online presence with hassle-free product management – your success starts here!</p>
					</div>
				<Section uid={uid} productData={productData} />
			</main>
		)
	);
}

function Section({ uid, productData }) {
	const context = useAuthContext();
	const router = useRouter();
	const [data, setData] = useState(edit && productData || {
		vendor_id: uid,
		sales: 0,
		conversion: '0%',
		status: 'Pending',
		affiliates: 0,
		currency: 'USD'
	});
	const [canvas, setCanvas] = useState(undefined);
	const [username, setUsername] = useState(() => productData && productData.vendor_name || (context.data.fullName || 'SwiftEarn vendor'));
	const [submitBtnHml, setSubmitBtnHml] = useState('Continue');
	
	const edit = productData && productData.product_id;

	let product_id = edit;

	const sendRequest = useCallback(async function(data) {
		if (edit) {
			await setDoc(doc(db, 'products', product_id), data, { merge: true });

			return product_id;
		} else {
			let docRef = await addDoc(collection(db, 'products'), data);

			await setDoc(doc(db, 'products', docRef.id), { product_id: docRef.id }, { merge: true });

			return docRef.id;
		}
	}, []);

	let oldProductImage = edit && productData.productImageUrl,
		canvas;

	const { ImageUpload, renderImage } = useMemo(Img(canv => setCanvas(canv), { width: 200, height: 150 }), []);

	oldProductImage && renderImage(oldProductImage);

	const handleSubmit = useCallback(function(e) {
		e.preventDefault();

		for (let key in data) {
			if (data[key] === '') return alert(`Incomplete form: ${data[key]} field is empty!`);
		}

		data.addedAt = Date.now();
		data.vendor_name = username;

		setSubmitBtnHml(Loader);
		console.log(data);
		return alert('Returned after logging to the console!');
		try {
			if (canvas) { // Upload image
				canvas.toBlob(async (blob) => {
					let docRefId;
					try {
						docRefId = await sendRequest(data);
					} catch (e) {
						setSubmitBtnHml('Continue');
						return;
					}

					product_id = product_id || docRefId;

					const imageRef = ref(storage, 'products/' + uid + product_id);

					await uploadBytes(imageRef, blob);

					// Add productImageUrl to product data
					let productImageUrl = await getDownloadURL(imageRef);

					await setDoc(doc(db, 'products', product_id), { productImageUrl }, { merge: true });
					
					// TODO
					// revalidate on server
					// if edit
					
					router.push('/product/products');
				});
			} else {
				if (oldProductImage || confirm('No product image! Do you want to continue?')) {
					sendRequest(data, submit)
						.then(() => {
							// TODO
							// revalidate on server
							// if edit
							router.push('/product/products');
						});
				} else {
					setSubmitBtnHml('Continue');
				}
			}
		} catch (e) {
			setSubmitBtnHml('Continue');
			console.error(e);
		}
	}, []);
	
	function updateData(e) {
		setData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	}
	
	return (
		<section className="color2 bg-9">
			<form	name="setting"	className="text-sm py-8" onSubmit={handleSubmit}>
			<div className="md:grid md:grid-cols-2 items-start">
				<div><ImageUpload /></div>
				<div className="pt-10 md:pt-0">
					<div className="mb-8">
						<label className="block mb-2 font-bold" htmlFor="name">Product Name:</label>
						<input className="w-full p-3 bg-7 color2" id="name" name="name" value={ data.name || (edit && productData.name || '') } onInput={updateData} placeholder="Enter product name" />
					</div>
					<div className="mb-8">
						<label className="block mb-2 font-bold" htmlFor="descr">Product Description:</label>
						<textarea className="w-full p-3 bg-7 color2 h-36" name="description" id="descr" value={ data.description || (edit && productData.description || '') } onInput={updateData} placeholder="Enter product description"></textarea>
					</div>
				</div>
			</div>
			<div className="mb-8 grid">
				<label className="block mb-2 font-bold" htmlFor="category">Product Category:</label>
				<select className="w-full p-3 bg-7 color2" id="category" name="category" defaultValue={ data.category || (edit && productData.category || '') } onInput={updateData}>
					<option value="">Category</option>
					{
						['Sales and Marketing', 'E-commerce', 'Forex', 'CryptoCurrency', 'Amazon KDP', 'Facebook Ads', 'Freelance', 'Sports', 'Education & Study', 'Designs', 'Software', 'Entertainment & Art'].map((cat, i) => <option key={i} value={cat}>{cat}</option>)
					}
				</select>
			</div>
			<div className="grid grid-cols-2 gap-4 mb-8">
				<div>
					<label className="block mb-2 font-bold" htmlFor="price">Product Price:</label>
					<div className="grid grid-cols-5">
						<select className="text-center col-span-2 bg-7 color2" name="currency" disabled>
							<option value="USD">USD</option>
						</select>
						<input className="p-3 col-span-3 bg-7 color2" type="number" name="price" id="price" value={ data.price || (edit && productData.price || '') } onInput={updateData} placeholder="Price" />
					</div>
				</div>
				<div>
					<label className="block mb-2 font-bold" htmlFor="comm">Commission</label>
					<div className="grid grid-cols-6">
						<select className="text-center col-span-2 bg-7 color2" disabled>
							<option value="%">%</option>
						</select>
						<input className="col-span-4 p-3 bg-7 color2" type="number" name="commission" id="comm" value={ data.commission || (edit && productData.commission || '') } onInput={updateData} placeholder="0" />
					</div>
				</div>
			</div>
			<div className="grid md:grid-cols-2 gap-4">
				<div className="mb-4">
					<label className="block mb-2 font-bold" htmlFor="jvPageUrl">JV Page URL:</label>
					<input className="w-full p-3 bg-7 color2" id="jvPageUrl" name="jvPageUrl" value={ data.jvPageUrl || (edit && productData.jvPageUrl || '') } onInput={updateData} placeholder="Enter your JV page URL" />
				</div>
				<div className="mb-8">
					<label className="block mb-2 font-bold" htmlFor="productPageUrl">Product Page URL:</label>
					<input className="w-full p-3 bg-7 color2" id="productPageUrl" name="productPageUrl" value={ data.productPageUrl || (edit && productData.productPageUrl || '') } onInput={updateData} placeholder="Enter your product page URL" />
				</div>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-bold" htmlFor="thankYouPageUrl">Product download or Thank you Page URL:</label>
				<textarea className="w-full p-3 bg-7 color2 h-24" name="thankYouPageUrl" placeholder="Enter your product page URL" id="thankYouPageUrl" value={ data.thankYouPageUrl || (edit && productData.productPageUrl || '') } onInput={updateData}></textarea>
			</div>
			<button	type="submit"	className="py-3 mb-4 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center">{submitBtnHml}</button>
			</form>
		</section>
	);
}

const Loader = <span><svg className="spin" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg></span>;

/*
 <style type="text/css">
  .swf_cta_btn {
   margin: 1rem 0;
   display: block;
   text-decoration: none;
   outline: none;
   cursor: pointer;
   
  }
  .swf_cta_btn > button {
   display: block;
   position: relative;
   text-align: center;
   border: none;
   border-radius: 50px 50px 18px 18px /50px 50px 50px 50px !important;
   color: #FFFFFF !important;
   width: 80%;
   max-width: 420px;
   padding: 1.5rem 0rem !important;
   font-size: 1.3rem;
   font-weight: bold;
   background: blue repeating-linear-gradient(19deg, #BA82A8 0px, #4C72EF 100%);
   box-shadow: inset 0px -4px 7px 0px darkslateblue;
   margin: 0px auto !important
  }
  
  .swf_cta_btn2 > button {
   background: blue repeating-linear-gradient(19deg, #D9BC00 0px, #45A931 100%) !important;
  }
  
  .swf_cta_btn3 > button {
   background: blue repeating-linear-gradient(19deg, #D925A3 0px, #E65831 100%) !important
  }
  
  .swf_cta_btn > button:active {
   box-shadow: inset 0px -4px 10px 5px #484F97
  }
  
  .swf_cta_btn2 > button:active {
   box-shadow: inset 0px -4px 10px 5px #45A931
  }
  
  .swf_cta_btn > button > svg {
   position: absolute;
   right: 8%;
   top: 50%;
   transform: translateY(-50%);
   padding: 9px;
   background-color: whitesmoke;
   border-radius: 50%
  }
 </style>
 <a class="swf_cta_btn" href="">
  <button type="button">
   <span>BUY NOW</span>
   <svg stroke="#484F97" fill="#484F97" stroke-width="0" viewBox="0 0 448 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
   </svg>
  </button>
 </a>
 <a class="swf_cta_btn swf_cta_btn2" href="">
  <button type="button">
   <span>BUY NOW</span>
   <svg stroke="#45A931" fill="#45A931" stroke-width="0" viewBox="0 0 448 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
   </svg>
  </button>
 </a>
 <a class="swf_cta_btn swf_cta_btn3" href="">
  <button type="button">
   <span>BUY NOW</span>
   <svg stroke="#E65831" fill="#E65831" stroke-width="0" viewBox="0 0 448 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
   </svg>
  </button>
 </a>


*/
