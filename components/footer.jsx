import { Link } from 'next/link';
import { useState, useEffect, memo } from 'react';

const Footer = memo(function Footer() {
	
	return (
		<footer className="bg-gray-800 py-6 text-center text-xs">
		  <nav className="container mx-auto p-4 text-gray-200 max-w-sm leading-relaxed">
		   <Link href="faq.html"><a className="px-3 font-light hover:text-green-600">FAQ</a></Link>
		   <Link href=""><a className="px-3 font-light hover:text-green-600">Contact&nbsp;Us</a></Link>
		   <Link href="/tos"><a className="px-3 font-light hover:text-green-600">Terms&nbsp;of&nbsp;Service</a></Link>
		   <Link href=""><a className="px-3 font-light hover:text-green-600">Privacy&nbsp;Policy</a></Link>
		  </nav>
		  <ScrollToTop />
		  <p className="text-gray-400">&copy; 2023 SwiftEarn.com. All rights reserved.</p>
		 </footer>
	);
});

export default Footer;

function ScrollToTop() {
	const [showScrollToTop, setShowScrollToTop] = useState('hidden');
	
	useEffect(() => {
		function show() {
			if (document.documentElement.scrollTop >= window.innerHeight) {
				setShowScrollToTop('');
			} else {
				setShowScrollToTop('hidden');
			}
		}
		
		window.addEventListener('scroll', show);
		
		return () => window.removeEventListener('scroll', show);
	}, []);
	
	return (
		<div className={"inline-block fixed bottom-2 right-2 opacity-60 bg-blue-800 p-3 rounded scrollToTop" + showScrollToTop} onClick={() => document.body.scrollIntoView()}>
			<svg stroke="white" fill="white" strokeWidth="0" viewBox="0 0 448 512" width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg">
				<path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
			</svg>
		</div>
	);
}