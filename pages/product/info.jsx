import { useRouter } from 'next/router';

// Redirect affiliate customers to the product page

export default function Purchase() {
	const router = useRouter();
	
	const params = router.query;
	const aff_id = params.aff_id;
	
	if (aff_id) {
		let productPage = params.prdpg;
		if (productPage) {
			location.href = decodeURIComponent(productPage);
			return;
		}
	}
	
	router.push('/marketplace');

	return null;
}