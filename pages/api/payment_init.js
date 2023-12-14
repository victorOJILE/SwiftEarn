const https = require('https');

export default async function handler(req, res) {
	if (req.method.toLowerCase() !== 'post') return res.json({ status: 'Rejected', message: 'Not a post request' });

	try {
		const { email, amount, detail, code } = req.body;
		
		if(!email || !amount) return res.status(400).send({ status: 'failed', message: 'No email/amount value' });
		
		const params = JSON.stringify({
			email,
			amount: (amount + 0.1) * 100,
			callback_url: 'mywebsite.com/verify.js?detail=' + detail + 'code=' + code
		});
		
		const options = {
			hostname: 'api.paystack.co',
			port: 443,
			path: '/transaction/initialize',
			method: 'POST',
			headers: {
				Authorization: process.env.PS_SECRET_KEY,
				'Content-Type': 'application/json'
			}
		}
		// client request to paystack API
		const clientReq = https.request(options, apiRes => {
			let data = '';
			
			apiRes.on('data', chunk =>	data += chunk);
			
			apiRes.on('end', () => {
				const response = JSON.parse(data);
				
				if(response.status) {
					return res.redirect(response.data.authorization_url);
				}
				
				throw new Error('');
			});
			
		}).on('error', error => {
			console.error(error)
		});
		
		clientReq.write(params);
		clientReq.end();
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