
export default async function handler(req, res) {
	try {
		await res.revalidate('/product/' + res.query.id);
		
		return res.json({ revalidated: true });
	} catch(e) {
		return res.status(500).send('Error');
	}
}