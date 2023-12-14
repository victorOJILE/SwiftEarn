const https = require('https');

export default async function handler(req, res) {
	try {
		const { ref, code } = req.query;

		const options = {
			hostname: 'api.paystack.co',
			port: 443,
			path: '/transaction/verify/' + ref,
			method: 'GET',
			headers: {
				Authorization: process.env.PS_SECRET_KEY,
				'Content-Type': 'application/json'
			}
		}
		// client request to paystack API
		https.request(options, res => {
				let data = ''

				res.on('data', (chunk) => {
					data += chunk
				});

				res.on('end', () => {
					res.status(200).json(data);
					// TODO:
					if(code == 'sale') {
						// update transaction document in firestore
					} else if(code == 'subscription') {
						// update user document to be subscribed 
					}
				});

			})
			.on('error', error => {
				res.status(500).json({ data: { status: 'failed' } });
			});
	} catch (e) {
		return res.status(500).send('Error');
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '300kb'
		},
	}
}