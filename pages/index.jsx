import { Head } from 'next/head';
import { Link } from 'next/link';
import { useLayoutEffect } from 'react';
import Footer from '../components/footer.jsx';

export default function Home() {

	useLayoutEffect(() => {
		const carousel = elCls("carousel")[0];

			const buttonLeft = elCls("prev")[0];
			const buttonRight = elCls("next")[0];
			const carousel_dots = elCls('carousel-dots')[0];
			if (!carousel_dots) return;

			function getTargIndex(targ) {
				let parent = targ.parentElement;
				let index = 0;
				for (let child of parent.children) {
					if (child == targ) return index;
					index++
				}
				return -1;
			}

			observeElem(
				carousel.children[0], carousel, {
					isVisible: () => buttonLeft.classList.add('hidden'),
					notVisible: () => buttonLeft.classList.remove('hidden')
				});

			observeElem(carousel.children[carousel.children.length - 1], carousel, {
				isVisible: () => buttonRight.classList.add('hidden'),
				notVisible: () => buttonRight.classList.remove('hidden')
			});

			observeElem(carousel.children, carousel, {
				isVisible: function(elem) {
					let index = getTargIndex(elem);
					let dot = carousel_dots.children[index];
					for (let dot of carousel_dots.children) {
						dot.classList.remove('bg-white');
					}
					dot.classList.add('bg-white');
				}
			});

			carousel_dots.addEventListener('click', function(ev) {
				let targ = ev.target;
				if (targ.nodeName.toLowerCase() == 'span') {
					let index = getTargIndex(targ);
					let li = carousel.children[index];
					let liOffset = li.offsetLeft;
					if (liOffset > carousel.scrollLeft) {
						carousel.scrollBy({
							left: carousel.scrollLeft + liOffset,
							behavior: "smooth"
						});
					} else {
						carousel.scrollBy({
							left: -(carousel.scrollLeft - liOffset),
							behavior: "smooth"
						});
					}
				}
			});

			buttonLeft.addEventListener("click", () => {
				carousel.scrollBy({
					left: -carousel.offsetWidth / 2,
					behavior: "smooth"
				});
			});

			buttonRight.addEventListener("click", () => {
				carousel.scrollBy({
					left: carousel.offsetWidth / 2,
					behavior: "smooth"
				});
			});
		
		const bounceInElem = elCls('bounceInAnim')[0];
		if (!bounceInElem) return;
		if (bounceInElem) {
			observeElem(
				bounceInElem, undefined, {
					isVisible: (elem) => setTimeout(() => elem.classList.add('bounceIn'), 1000),
					notVisible: (elem) => setTimeout(() => elem.classList.remove('bounceIn'), 1000)
				});
		} else {
			return
		}

		function addFadeInUpFunc(par, cls, mar) {
			observeElem(
				par.children, undefined, {
					isVisible: (elem) => elem.classList.remove(cls),
					notVisible: true,
					rootMargin: mar,
					intersect: 0.5
				}
			);
		}

		addFadeInUpFunc(elCls('fadeInUp1')[0], 'fadeInUp', '80%');
		for (let elem of elCls('fadeIn')) addFadeInUpFunc(elem, 'fadeInUp', "20%");

		let fadeInCorner = Array.from(elCls('fadeInCorner'));

		let scrollBusy = false;
		if (fadeInCorner) {
			window.addEventListener('scroll', function watch() {
				if (scrollBusy) return;
				scrollBusy = true;
				for (let elem of fadeInCorner) {
					if (isVisible(elem)) {
						elem.classList.remove(elem.dataset.corner);
						fadeInCorner.splice(fadeInCorner.findIndex(el => el == elem), 1);
						if (!fadeInCorner.length) window.removeEventListener('scroll', watch);
					}
				}
				setTimeout(() => scrollBusy = false, 200);
			});
		}
	}, []);

	return (
		<>
			<Head>
			 <title>SwiftEarn - Simplify Your Online Business Journey and Boost Your Profits</title>
			 <meta name="description" content="Welcome to the official website. At SwiftEarn, we connect you with top-tier course creators, Instagram influencers, and established offline vendors. Through our partnership model, you can become their affiliate and earn substantial profits by promoting and selling their products." />
			 <meta name="keywords" content="swiftearn,affiliate marketing,best affiliate marketing platform in africa,best affiliate marketing platform in nigeria,digital marketing,make money online,earn in dollars 2023,best way to earn in dollars in nigeria" />
			 <meta itemprop="name" content="SwiftEarn - Simplify Your Online Business Journey and Boost Your Profits" />
			 <meta itemprop="description" content="Welcome to the official website. At SwiftEarn, we connect you with top-tier course creators, Instagram influencers, and established offline vendors. Through our partnership model, you can become their affiliate and earn substantial profits by promoting and selling their products." />
			 <meta name="twitter:card" content="" />
			 <meta name="twitter:site" content="@SwiftEarn" />
			 <meta name="twitter:title" content="SwiftEarn - Simplify Your Online Business Journey and Boost Your Profits" />
			 <meta name="twitter:description" content="At SwiftEarn, we connect you with top-tier course creators, Instagram influencers, and established offline vendors. Through our partnership model, you can become their affiliate and earn substantial profits by promoting and selling their products." />
			 <meta property="og:site_name" content="SwiftEarn" />
			 <meta property="og:title" content="SwiftEarn | Simplify Your Online Business Journey and Boost Your Profits" />
			 <meta property="og:description" content="At SwiftEarn, we connect you with top-tier course creators, Instagram influencers, and established offline vendors. Through our partnership model, you can become their affiliate and earn substantial profits by promoting and selling their products." />
			</Head>
		 <header className="relative text-gray-300">
		  <div className="relative">
		   <nav className="container mx-auto flex items-center justify-between p-3">
		    <Link href="/">
		     <a><img className="w-32" src="Logo.png" alt="SwiftEarn official logo" /></a></Link>
		    <div className="flex items-center">
		     <Link href="/login"><a className="green-btn rounded md:order-2">Login</a></Link>
		    </div>
		   </nav>
		  </div>
		  <section aria-label="Hero" className="container mx-auto px-4 pt-12 pb-20 md:pr-8 md:pt-24 md:pb-32 grid md:grid-cols-2 items-center">
		   <div>
		    <h3 className="color4 hidden md:block">Welcome to Swift Earn</h3>
		    <h1 className="text-4xl font-bold leading-normal">Simplify Your Online Business Journey and Boost Your Profits</h1>
		    <p className="mt-2">Our entire team is dedicated to providing you with the highest standard of quality affiliate marketing services.</p>
		    <div className="inline-block my-6 bounceInAnim">
		     <Link href="/signup"><a className="spec-btn spec-btn-white spec-btn-animate">Get started</a></Link>
		    </div>
		   </div>
		   <div className="absolute top-full md:static py-8">
		    <img src="Home-7-Web-Marketing-Image.png" alt="" />
		   </div>
		  </section>
		  <div className="custom-shape-divider-bottom-1688678486 bottom-0">
		   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
		    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="ghostwhite"></path>
		   </svg>
		  </div>
		 </header>
		 <main>
		  <div className="md:hidden" style={{ height: "100vw" }}></div>
		  <section className="text-center container mx-auto my-16 px-6">
		   <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 fadeInUp1" aria-label="What we do at SwiftEarn">
		    <li className="p-6 fadeInUp shadow-lg rounded hover:bg-blue-100 trans border-b-4 border-red-500">
		     <div className="py-4">
		      <img className="w-24 mx-auto" src="Home-7-Content-Marketing-Image.png" alt="" />
		     </div>
		     <p className="pb-4">Discover high-demand products to promote, eliminating the need for time-consuming and costly product research.</p>
		    </li>
		    <li className="p-6 fadeInUp shadow-lg rounded hover:bg-blue-100 trans border-b-4 border-blue-500">
		     <div className="py-4">
		      <img className="w-24 mx-auto" src="Home-7-Search-Engine-Optimization-Image.png" alt="" />
		     </div>
		     <p className="pb-4">Amplify your profitability by promoting multiple products simultaneously, diversifying your revenue streams.</p>
		    </li>
		    <li className="p-6 fadeInUp shadow-lg rounded hover:bg-blue-100 trans border-b-4 border-green-500">
		     <div className="py-4">
		      <img className="w-24 mx-auto" src="Home-7-Real-Time-Analytics-Image.png" alt="" />
		     </div>
		     <p className="pb-4">Leverage our product ranking system to identify top-performing items and maximize your earning potential.</p>
		    </li>
		    <li className="p-6 fadeInUp shadow-lg rounded hover:bg-blue-100 trans border-b-4 border-yellow-500">
		     <div className="py-8">
		      <img className="w-24 mx-auto" src="Home-7-Link-Building-Service-Image.png" alt="" />
		     </div>
		     <p className="pb-4">Enjoy the convenience of getting paid weekly for your sales, while we handle the product delivery logistics on your behalf.</p>
		    </li>
		   </ul>
		  </section>
		  <section className="relative pinkish-bg pb-12 sm:py-12">
		   <div className="custom-shape-divider-top-1688678486 top-0">
		    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
		     <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="ghostwhite"></path>
		    </svg>
		   </div>
		   <div className="container mx-auto p-6 grid md:grid-cols-2 items-center">
		    <div className="pb-8">
		     <h2 className="text-4xl font-special py-5 color1 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Get your Online Business Roaring & Climbing</h2>
		     <p className="pb-3 leading-relaxed trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">We are committed to supporting you every step of the way, offering resources, comprehensive training, and a dedicated support team to address any inquiries or concerns you may have.</p>
		     <div className="inline-block my-6">
		      <Link href="/signup"><a className="bg-green-700 hover:bg-green-500 py-4 px-8 text-white rounded transition transition-colors duration-500"><svg stroke="currentColor" className="inline-block mr-4 moveRight" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
		        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
		       </svg> Grab your account</a></Link>
		     </div>
		    </div>
		    <img src="service-bottom-image.png" className="img-placeholder" onload="this.classList.remove('img-placeholder')" alt="" />
		   </div>
		  </section>
		  <h2 className="text-3xl mt-12 color1 font-special px-4 mb-8 mx-auto sm:text-center max-w-md">Don't just take our word for it. Hear it from our customers</h2>
		  <section className="py-12 bg-gray-900">
		   <div className="container mx-auto px-4">
		    <div className="relative">
		     <ul className="mx-auto font-light carousel overflow-auto text-center flex">
		      <li className="mx-4 bg-gray-800 rounded-lg">
		       <div className="h-16 bg-gray-700 mb-16 rounded-t relative">
		        <div className="absolute top-1/2 left-1/2 overflow-hidden transform -translate-x-1/2 w-20 h-20 rounded-full border-4 bg-gray-800 border-gray-700">
		         <img src="digital-marketing.jpg" alt="Arnold Schwarzenegger" />
		        </div>
		       </div>
		       <div className="p-5 pt-5">
		        <p>
		         <q className="text-sm text-gray-200 italic leading-relaxed">As a struggling artist, I was uncertain about my future. However, with SwiftEarn's partnership program, I found a new avenue to showcase and sell my artwork. The platform not only expanded my customer base but also increased my earnings exponentially. I went from barely making ends meet to earning over $2,000 per week. SwiftEarn's support has been invaluable, and I'm grateful for this life-changing opportunity.</q>
		        </p>
		        <div className="pt-3">
		         <small className="text-gray-400"> - Arnold Schwarzenegger</small>
		        </div>
		       </div>
		      </li>
		      <li className="mx-4 bg-gray-800 rounded-lg">
		       <div className="h-16 bg-gray-700 mb-16 rounded-t relative">
		        <div className="absolute top-1/2 left-1/2 overflow-hidden transform -translate-x-1/2 w-20 h-20 rounded-full border-4 bg-gray-800 border-gray-700">
		         <img className="w-full" src="my_image.png" alt="Oprah Winfrey" />
		        </div>
		       </div>
		       <div className="p-5 pt-5">
		        <p>
		         <q className="text-sm text-gray-200 italic leading-relaxed">Before I discovered SwiftEarn, I was working multiple jobs to support my family. It was a constant struggle to make ends meet. However, everything changed when I joined SwiftEarn's partnership program. With their ready-made products and marketing support, I turned my passion for crafting into a thriving online business. My customer base grew rapidly, and I started earning over $2,000 per month. </q>
		        </p>
		        <div className="pt-3">
		         <small className="text-gray-400"> - Oprah Winfrey</small>
		        </div>
		       </div>
		      </li>
		      <li className="bg-gray-800 mx-4 rounded-lg">
		       <div className="h-16 bg-gray-700 mb-16 rounded-t relative">
		        <div className="absolute top-1/2 left-1/2 overflow-hidden transform -translate-x-1/2 w-20 h-20 rounded-full border-4 bg-gray-800 border-gray-700">
		         <img className="w-full" src="" alt="Tom Brady" />
		        </div>
		       </div>
		       <div className="p-5 pt-5">
		        <p>
		         <q className="text-sm text-gray-200 italic leading-relaxed">The platform empowered me to turn my expertise into a successful online business. With their support, I quit my job and focused on building my business full-time. Today, I earn an average of $7,000 per month, and I have the flexibility to spend more time with my family. SwiftEarn gave me the opportunity to create a better life for myself and my loved ones.</q>
		        </p>
		        <div className="pt-3">
		         <small className="text-gray-400"> - Tom Brady</small>
		        </div>
		       </div>
		      </li>
		     </ul>
		     <button className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-50 text-black text-2xl outline-none cursor-pointer left-0 prev">
		      <svg style={{ width: "100%", height: "100%" }} viewBox="0 -5 18 20">
		       <path fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="black" strokeWidth="2" d="M10 0 L5 4.5 L10 9" />
		      </svg>
		     </button>
		     <button className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-50 text-black text-2xl outline-none cursor-pointer right-0 next">
		      <svg style={{ width: "100%", height: "100%" }} viewBox="-3 -5 18 20">
		       <path fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="black" strokeWidth="2" d="M5 0 L10 4.5 L5 9" />
		      </svg>
		     </button>
		     <div className="text-center pt-4 carousel-dots">
		      <span className="inline-block w-3 h-3 rounded-full border border-gray-200 mx-1 bg-white transition-colors duration-900"></span>
		      <span className="inline-block w-3 h-3 rounded-full border border-gray-200 mx-1 transition-colors duration-900"></span>
		      <span className="inline-block w-3 h-3 rounded-full border border-gray-200 mx-1 transition-colors duration-900"></span>
		     </div>
		    </div>
		   </div>
		  </section>
		  <section className="relative pinkish-bg bg-white py-12 md:py-24">
		   <div className="container mx-auto">
		    <div className="p-6 fadeIn md:py-12 md:mb-12">
		     <p className="mb-4 leading-relaxed trans fadeInUp">You want to start a profitable online business?</p>
		     <p className="mb-4 leading-relaxed trans fadeInUp">We help you to earn massively and make sales easily on SwiftEarn.</p>
		     <p className="mb-4 leading-relaxed trans fadeInUp">SwiftEarn provides you with the best and <b>high demanding digital products</b>, <b>training</b> you need to start a profitable online business today, and we pay you weekly for every single sale made by you.</p>
		     <h2 className="text-4xl font-special mb-4 color4 trans fadeInUp">Our mission</h2>
		     <p className="mb-4 leading-relaxed trans fadeInUp">At SwiftEarn, we have a clear mission: to connect you with <b>top-tier course creators</b>, <b>Instagram influencers</b>, and <b>established offline vendors</b>, all in one place.</p>
		     <p className="mb-4 leading-relaxed trans fadeInUp">Through our innovative partnership model, you can become their affiliate and earn substantial profits by promoting and selling their products.</p>
		     <p className="mb-4 leading-relaxed trans fadeInUp">We have carefully curated a network of registered vendors who offer generous commissions, with some offering up to 50% for each sale.</p>
		    </div>
		    <div className="grid sm:grid-cols-2 sm:px-4">
		     <img className="py-12 md:py-0 img-placeholder" src="krakenimages-376KN_ISplE-unsplash.jpg" alt="" onload="this.classList.remove('img-placeholder')" />
		     <div className="px-6 md:pl-8 fadeIn">
		      <p className="mb-4 leading-relaxed trans fadeInUp">This means that you can focus on sales and marketing, without the hassle of creating, purchasing, or delivering products.</p>
		     </div>
		    </div>
		   </div>
		   <div className="container mx-auto px-6 py-8 my-12 bg-gray-200 sm:text-center">
		    <div className="pb-8">
		     <h2 className="text-3xl font-special max-w-sm mx-auto py-5 color1">Unleash Your Online Business Potential with SwiftEarn</h2>
		     <p className="pb-3 max-w-sm mx-auto">Joining is simple and straightforward. Create an account, explore our marketplace's offerings, select the products you wish to promote, and start earning commissions.</p>
		     <div className="inline-block my-6">
		      <Link href="/signup"><a className="bg-yellow-600 hover:bg-yellow-500 py-4 px-8 text-white rounded transition transition-colors duration-500"><svg stroke="currentColor" className="inline-block mr-4 moveRight" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
		        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
		       </svg> Grab your account</a></Link>
		     </div>
		    </div>
		   </div>
		   <div className="custom-shape-divider-bottom-1688678486 bottom-0">
		    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
		     <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
		    </svg>
		   </div>
		  </section>
		  <section className="bg-white">
		   <div className="container mx-auto px-6 py-8 md:pt-16 fadeIn">
		    <h2 className="mb-4 font-special text-4xl color1 trans fadeInUp">Diverse Product Range
		    </h2>
		    <p className="mb-4 leading-relaxed trans fadeInUp">SwiftEarn offers you a <b>vast array of products, websites, and comprehensive training resources</b> essential for your online business journey.</p>
		    <p className="mb-4 leading-relaxed trans fadeInUp">Our marketplace features 100+ carefully selected products that cover a wide range of categories, including courses, and digital services.</p>
		    <p className="mb-4 leading-relaxed trans fadeInUp">This breadth of options empowers you to choose products that align with your interests and capitalize on current market trends.</p>
		    <div className="grid sm:grid-cols-2">
		     <img src="digital-marketing.jpg" className="my-8 sm:order-2 img-placeholder" onload="this.classList.remove('img-placeholder')" alt="" />
		     <div className="sm:order-1 sm:pr-8 fadeIn">
		      <p className="mb-4 leading-relaxed trans fadeInUp">At SwiftEarn, we firmly believe in empowering entrepreneurs like yourself to thrive in the ever-evolving world of online business.</p>
		      <p className="mb-4 leading-relaxed trans fadeInUp">With our comprehensive marketplace, generous commission structure, and unwavering support, you have the tools and guidance to take your business to new heights.</p>
		      <p className="mb-4 leading-relaxed trans fadeInUp">Begin your transformative journey with SwiftEarn today!</p>
		     </div>
		    </div>
		   </div>
		  </section>
		  <section className="pt-20 bg-gray-800 color2">
		   <div className="container mx-auto grid md:grid-cols-2 text-sm md:text-md">
		    <div className="px-6 mb-12 text-gray-300">
		     <div className="flex items-center overflow-auto mb-4 color2">
		      <div className="bg-gray-400 rounded-full w-16 mr-4 p-4 mb-3 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">
		       <img src="credit-card-payment-svgrepo-com.svg" alt="" />
		      </div>
		      <h2 className="text-3xl font-special trans fadeInCorner fadeInRight" data-corner="fadeInRight">SwiftEarnPay</h2>
		     </div>
		     <div className="fadeIn">
		      <p className="leading-relaxed mb-4 font-light trans fadeInUp">Starting and growing an online business can be challenging, especially when it comes to accepting payments from customers worldwide.</p>
		      <p className="leading-relaxed mb-4 font-light trans fadeInUp">At SwiftEarn, we understand your needs, which is why we provide you with a powerful multi-currency cart system that simplifies the payment process and expands your reach to a global customer base.</p>
		      <p className="text-lg mb-4 trans fadeInUp">With SwiftEarnPay, you:</p>
		     </div>
		     <ul className="list-thumb font-light fadeIn">
		      <li className="leading-relaxed trans fadeInUp">Seamlessly accept payments in multiple currencies through a user-friendly one-page online checkout cart.</li>
		      <li className="leading-relaxed trans fadeInUp">Accept payments in popular currencies like USD, NGN, GHS, ZAR, and enjoy the convenience of receiving funds directly in your local bank account at favorable exchange rates.</li>
		      <li className="leading-relaxed trans fadeInUp">The system automatically generates currency options based on the buyer's location, allowing them to view and pay in their local currency, ensuring you never miss out on international sales.</li>
		     </ul>
		    </div>
		    <div>
		     <img src="web-marketing.jpg" className="my-8 img-placeholder" onload="this.classList.remove('img-placeholder')" alt="" />
		    </div>
		   </div>
		  </section>
		  <hr />
		  <section className="py-20 bg-gray-800 color2">
		   <div className="container mx-auto grid md:grid-cols-2">
		    <div className="px-6 text-gray-300 md:col-start-2 md:row-start-1 text-sm md:text-md">
		     <div className="flex items-center overflow-auto mb-4 color2">
		      <img className="w-16 mr-3 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft" src="analytics.png" alt="" />
		      <h2 className="text-3xl font-special trans fadeInCorner fadeInRight" data-corner="fadeInRight">Robust Analytics</h2>
		     </div>
		     <div className="fadeIn">
		      <p className="leading-relaxed mb-4 font-light trans fadeInUp">Running a successful business requires valuable insights and data.</p>
		      <p className="leading-relaxed mb-4 font-light trans fadeInUp">With SwiftEarn's proprietary tracking system, you gain access to comprehensive analytics, ensuring you have a clear understanding of your sales performance, earnings, and payment schedules.</p>
		      <p className="text-lg mb-4 trans fadeInUp">With SwiftEarn dashboard, you can:</p>
		     </div>
		     <ul className="list-thumb font-light mt-4 fadeIn">
		      <li className="leading-relaxed trans fadeInUp">Monitor your successful and pending sales, providing you with an overview of your revenue stream and enabling efficient customer follow-ups.</li>
		      <li className="leading-relaxed trans fadeInUp">Track the number of clicks on your affiliate links to gauge the effectiveness of your marketing efforts.</li>
		      <li className="leading-relaxed trans fadeInUp">Measure conversion rates for your products and promotions, empowering you to optimize your strategies for better results.</li>
		     </ul>
		    </div>
		    <img src="digital-marketing.jpg" className="mt-8 md:col-start-1 md:row-start-1 img-placeholder" onload="this.classList.remove('img-placeholder')" alt="" />
		   </div>
		  </section>
		  <section className="bg-gray-700 cp-management-bg">
		   <div className="container sm:text-center mx-auto py-12 px-6">
		    <h2 className="text-3xl font-special max-w-sm mx-auto py-5 color2 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Join 55,000+ others currently profiting from our platform</h2>
		    <p className="pb-3 max-w-sm mx-auto text-gray-300 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">It's time for you to earn from affiliate marketing with SwiftEarn, and the best part is that creating an account is in few seconds! </p>
		    <p className="pb-3 max-w-sm mx-auto text-gray-300 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Work at your own pace, in your spare time, and take advantage of all the benefits SwiftEarn has to offer.</p>
		    <div className="inline-block my-6">
		     <Link href="/signup"><a className="bg-indigo-600 hover:bg-indigo-500 py-4 px-8 text-white rounded transition transition-colors duration-500"><svg stroke="currentColor" className="inline-block mr-4 moveRight" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
		       <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
		      </svg> Grab your account	</a></Link>
		    </div>
		   </div>
		  </section>
		  <section className="bg-white">
		   <div className="container py-16 mx-auto px-6">
		    <h2 className="text-3xl font-special py-5 color1 max-w-md sm:mx-auto sm:text-center">Checkout some screenshots from satisfied SwiftEarn users</h2>
		    <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
		     <li className="shadow hover:shadow-lg transition transition-shadows rounded-lg">
		      <img src="Screenshot_20230707-221733.png" className="img-placeholder" onload="this.classList.remove('img-placeholder')" />
		     </li>
		     <li className="shadow hover:shadow-lg transition transition-shadows rounded-lg">
		      <img src="Screenshot_20230707-221733.png" className="img-placeholder" onload="this.classList.remove('img-placeholder')" />
		     </li>
		     <li className="shadow hover:shadow-lg transition transition-shadows rounded-lg">
		      <img src="Screenshot_20230707-221733.png" className="img-placeholder" onload="this.classList.remove('img-placeholder')" />
		     </li>
		     <li className="shadow hover:shadow-lg transition transition-shadows rounded-lg">
		      <img src="Screenshot_20230707-221733.png" className="img-placeholder" onload="this.classList.remove('img-placeholder')" />
		     </li>
		     <li className="shadow hover:shadow-lg transition transition-shadows rounded-lg">
		      <img src="Screenshot_20230707-221733.png" className="img-placeholder" onload="this.classList.remove('img-placeholder')" />
		     </li>
		     <li className="shadow hover:shadow-lg transition transition-shadows rounded-lg">
		      <img src="Screenshot_20230707-221733.png" className="img-placeholder" onload="this.classList.remove('img-placeholder')" />
		     </li>
		    </ul>
		   </div>
		  </section>
	  <section>
	   <div className="container max-w-xl mx-auto py-12 px-6 text-sm">
	    <h2 className="text-3xl font-special py-5 color1 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Join the SwiftEarn Community</h2>
	    <p className="pb-4 trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Experience the numerous benefits and opportunities and elevate your online business to new heights.</p>
	    <ul className="list-thumb mt-2">
	     <li className="leading-relaxed trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Gain access to a supportive and engaged community of like-minded entrepreneurs.</li>
	     <li className="leading-relaxed trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Network and collaborate with fellow business owners, sharing insights and strategies for success.</li>
	     <li className="leading-relaxed trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Stay up-to-date with the latest industry trends, expert advice, and exclusive resources.</li>
	     <li className="leading-relaxed trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Receive ongoing guidance and mentorship from experienced professionals in the field.</li>
	     <li className="leading-relaxed trans fadeInCorner fadeInLeft" data-corner="fadeInLeft">Participate in exclusive events, webinars, and training sessions to enhance your skills and knowledge.</li>
	    </ul>
	    <div className="my-6">
	     <Link href="/login"><a	className="flex items-center rounded-lg p-3 color2" style={{ backgroundColor: "#397CAB" }}>
	      <svg className="grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="6em" height="6em">
	       <style>{`
	        .st0 {
	         fill: url(#path2995-1-0_1_)
	        }
	
	        .st1 {
	         fill: #c8daea
	        }
	
	        .st2 {
	         fill: #a9c9dd
	        }
	
	        .st3 {
	         fill: url(#path2991_1_)
	        }`}
	       </style>
	       <linearGradient id="path2995-1-0_1_" gradientUnits="userSpaceOnUse" x1="-683.305" y1="534.845" x2="-693.305" y2="511.512" gradientTransform="matrix(6 0 0 -6 4255 3247)">
	        <stop offset="0" stopColor="#37aee2" />
	        <stop offset="1" stopColor="#1e96c8" />
	       </linearGradient>
	       <path id="path2995-1-0" className="st0" d="M240 120c0 66.3-53.7 120-120 120S0 186.3 0 120 53.7 0 120 0s120 53.7 120 120z" />
	       <path id="path2993" className="st1" d="M98 175c-3.9 0-3.2-1.5-4.6-5.2L82 132.2 152.8 88l8.3 2.2-6.9 18.8L98 175z" />
	       <path id="path2989" className="st2" d="M98 175c3 0 4.3-1.4 6-3 2.6-2.5 36-35 36-35l-20.5-5-19 12-2.5 30v1z" />
	       <linearGradient id="path2991_1_" gradientUnits="userSpaceOnUse" x1="128.991" y1="118.245" x2="153.991" y2="78.245" gradientTransform="matrix(1 0 0 -1 0 242)">
	        <stop offset="0" stopColor="#eff7fc" />
	        <stop offset="1" stopColor="#fff" />
	       </linearGradient>
	       <path id="path2991" className="st3" d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1L179 82.2c2-8.1-3.1-11.7-8.4-9.3L55 117.5c-7.9 3.2-7.8 7.6-1.4 9.5l29.7 9.3L152 93c3.2-2 6.2-.9 3.8 1.3L100 144.4z" />
	      </svg>
	      <h2 className="mx-4 text-lg">Join the SwiftEarn Community</h2></a>
	     </Link>
	    </div>
	   </div>
	  </section>
	 </main>
	 <Footer />
 </>
	);
}
// <script src="main.js"></script>

function observeElem(elem, par, config) {
	let observer = new IntersectionObserver(
		function(entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					let el = entry.target;
					if (entry.intersectionRatio >= (config.intersect || 1.0)) {
						config.isVisible(el);
						typeof config.notVisible == 'boolean' && observer.unobserve(el);
					}
				} else {
					typeof config.notVisible == 'function' && config.notVisible(entry.target);
				}
			});
		}, {
			root: par,
			rootMargin: config.rootMargin || "0px",
			threshold: 1.0,
		});
	if (elem.length) {
		for (let el of elem) {
			observer.observe(el);
		}
	} else {
		observer.observe(elem);
	}
}