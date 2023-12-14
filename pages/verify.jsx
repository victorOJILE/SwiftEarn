import { useState, useEffect } from 'react';
import { useRouter } from 'useRouter';

let loader = <svg className="spin" stroke="gray" fill="gray" strokeWidth="0" viewBox="0 0 512 512" width="1.6em" height="1.6em" xmlns="http://www.w3.org/2000/svg"> 
	<path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>;

let successIcon = <svg stroke="green" fill="green" strokeWidth="0" viewBox="0 0 16 16" width="3.5em" height="3.5em" xmlns="http://www.w3.org/2000/svg">
 <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" /><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
</svg>;

let failedIcon = <svg stroke="red" fill="red" strokeWidth="0" viewBox="0 0 16 16" width="3.5em" height="3.5em" xmlns="http://www.w3.org/2000/svg">
 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
</svg>;
/*
let data2 = {
	"status": true,
	"message": "Verification successful",
	"data": {
		"id": 2009945086,
		"domain": "test",
		"status": "success",
		"reference": "rd0bz6z2wu",
		"amount": 20000,
		"message": null,
		"gateway_response": "Successful",
		"paid_at": "2022-08-09T14:21:32.000Z",
		"created_at": "2022-08-09T14:20:57.000Z",
		"channel": "card",
		"currency": "NGN",
		"ip_address": "100.64.11.35",
		"metadata": "",
		"log": {
			"start_time": 1660054888,
			"time_spent": 4,
			"attempts": 1,
			"errors": 0,
			"success": true,
			"mobile": false,
			"input": [],
			"history": [
				{
					"type": "action",
					"message": "Attempted to pay with card",
					"time": 3
        },
				{
					"type": "success",
					"message": "Successfully paid with card",
					"time": 4
        }
      ]
		},
		"fees": 100,
		"fees_split": null,
		"authorization": {
			"authorization_code": "AUTH_ahisucjkru",
			"bin": "408408",
			"last4": "4081",
			"exp_month": "12",
			"exp_year": "2030",
			"channel": "card",
			"card_type": "visa ",
			"bank": "TEST BANK",
			"country_code": "NG",
			"brand": "visa",
			"reusable": true,
			"signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
			"account_name": null
		},
		"customer": {
			"id": 89929267,
			"first_name": null,
			"last_name": null,
			"email": "hello@email.com",
			"customer_code": "CUS_i5yosncbl8h2kvc",
			"phone": null,
			"metadata": null,
			"risk_action": "default",
			"international_format_phone": null
		},
		"plan": null,
		"split": {},
		"order_id": null,
		"paidAt": "2022-08-09T14:21:32.000Z",
		"createdAt": "2022-08-09T14:20:57.000Z",
		"requested_amount": 20000,
		"pos_transaction_data": null,
		"source": null,
		"fees_breakdown": null,
		"transaction_date": "2022-08-09T14:20:57.000Z",
		"plan_object": {},
		"subaccount": {}
	}
}

let data = {
	"status": true,
	"message": "Transactions retrieved",
	"data": {
			"id": 5833,
			"domain": "test",
			"status": "failed",
			"reference": "icy9ma6jd1",
			"amount": 100,
			"message": null,
			"gateway_response": "Declined",
			"paid_at": null,
			"created_at": "2016-09-29T00:00:05.000Z",
			"channel": "card",
			"currency": "NGN",
			"ip_address": null,
			"metadata": null,
			"timeline": null,
			"customer": {
				"first_name": "Test",
				"last_name": "Dummy",
				"email": "test@dummy.com",
				"phone": "16504173147",
				"metadata": null,
				"customer_code": "CUS_1uld4hluw0g2gn0"
			},
			"authorization": {},
			"plan": {},
			"requested_amount": 100
	 }
}
*/
export default function VerifyPayment() {
	const [data, setData] = useState(null);
	const router = useRouter();
	
	useEffect(() => {
		if(!router.query.reference) return;
		
		sessionStorage.removeItem('swfsub');
		sessionStorage.removeItem('swfpayid');
		sessionStorage.removeItem('swfpayuser');
		
		fetch(`/verify_payment.js?ref=${router.query.reference}code=${router.query.code}`)
		.then(res => res.json())
		.then(data => {
			setData(data.data);
		})
		.catch(err => {
			alert('Failed to get data! Please check your internet connection and reload the page.');
		});
	}, []);
	
	return (
		<main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto text-center" style={{ background: 'url("photo-1528459801416-a9e53bbf4e17_2.jpg")', backgroundSize: 'cover' }}>
				<div className="bg-gray-900">
					<img src="Logo.png" className="w-4/5 mx-auto" />
			</div>
			<div style={{ backgroundColor: '#FFFFFFAF', height: '60vh', minHeight: '25rem', boxShadow: '0px 7px 9px -1px darkgray' }}>
				{
					data ? (
						data.status == 'success' ? <PaymentSuccess data={data} /> : <PaymentFailed data={data} />
					) : (
					<>
					<h2 className="py-8 text-xl">Verifying your payment</h2>
					<p>{decodeURIComponent(router.query.detail)}</p>
					<div className="flex flex-col items-center py-4 bg-gray-30">
					{ loader }
					<p className="py-2">Please wait...</p>
					</div>
				</>)
				}
			</div>
		</main>
	);
}

function PaymentSuccess({ data }) {

	return (
		<>
			<h2 className="py-8 text-xl">{ 'Payment ' + data.gateway_response }</h2>
			<div className="flex flex-col items-center py-4 bg-gray-30">
				{ successIcon }
				<h2 className="py-2">{ `${data.currency} ${new Intl.NumberFormat('en').format(data.amount)}` }</h2>
			</div>
			<div className="border rounded-sm p-1 w-11/12 bg-white max-w-md mx-auto">
				<div className="flex items-center justify-between p-1">
					<span className="font-bold">Email</span>
					<span>{ data.customer.email }</span>
				</div>
				<div className="flex items-center justify-between p-1">
					<span className="font-bold">ID</span>
					<span>{ data.id }</span>
				</div>
				<div className="flex items-center justify-between p-1">
					<span className="font-bold">Reference</span>
					<span>{ data.reference }</span>
				</div>
				<div className="flex items-center justify-between p-1">
					<span className="font-bold">Date</span>
					<span>{ new Date(data.paid_at || data.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) }</span>
				</div>
			</div>
		</>
	);
}

function PaymentFailed({ data }) {
	return (
		<>
			<h2 className="py-8 text-xl">{'Payment ' + data.gateway_response }</h2>
			<div className="flex flex-col items-center py-4 bg-gray-30">
				{ failedIcon }
				<h2 className="py-2">{ `${data.gateway_response}` }</h2>
			</div>
		</>
	);
}