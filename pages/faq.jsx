import { Head } from 'next/head';
import { Link } from 'next/link';
import { useState } from 'react';
import Footer from '../components/footer.jsx';

export default function FAQ() {
	let faqs = [
		{
			question: 'How do I become an affiliate on SwiftEarn?',
			answers: ["Getting started with SwiftEarn is simple. Just sign up for free on our website, and upon registration, explore our marketplace's offerings, select the products you wish to promote, and start earning commissions.", "Signing up as an affiliate on SwiftEarn is absolutely free, because we earn only if you earn."]
		}, {
			question: 'Is there a cost to join SwiftEarn?',
			answers: ['Absolutely not. Joining SwiftEarn is completely free. We firmly believe in the principle of "pay when you get paid."', 'There are no registration fees or annual subscriptions required. We only earn a small transaction fee when you earn (make a sale and receive payment).', "Whether you're a beginner or an experienced marketer, SwiftEarn offers opportunities for everyone."]
		}, {
			question: 'How does SwiftEarn help me track my sales and performance?',
			answers: ['SwiftEarn offers a robust analytics system integrated into your personalized dashboard, ensuring you have a clear understanding of your sales performance, earnings, and payment schedules.']
		},
		{
			question: 'How often are payments made to affiliates?',
			answers: ['At SwiftEarn, we believe in rewarding your efforts promptly. As an affiliate, you will receive payments on a weekly basis.', 'This allows you to enjoy the fruits of your sales efforts more frequently and helps you maintain a steady income stream.']
		}, {
			question: 'How do I withdraw my earnings from SwiftEarn?',
			answers: ['Withdrawing your earnings from SwiftEarn is simple and convenient. Once you have accumulated sufficient funds in your account, you can initiate a withdrawal request.', 'SwiftEarn pays both vendors and affiliates via bank deposit. Your money is sent to a valid bank account bearing your registered name.', 'Affiliates and vendors are paid on a weekly basis at the end of the week.']
		}, {
			question: 'Is there a minimum sales threshold to receive payments as an affiliate on SwiftEarn?',
			answers: ['SwiftEarn does not impose a minimum sales threshold for affiliates to receive payments.', 'You will receive payments for your successful sales regardless of the quantity or value of those sales.']
		}, {
			question: 'Does SwiftEarn provide training or resources for beginners in affiliate marketing?',
			answers: ['Yes. We provide comprehensive training resources, guides, and tutorials to help beginners understand the fundamentals of affiliate marketing and navigate the platform effectively.']
		}
	];
	
	return (
		<>
			<Head>
			 <title>FAQ - Frequently Asked Questions</title>
			 <meta name="description" content="Frequently Asked Questions. You've got questions? We've got answers!" />
			 <meta name="twitter:card" content="" />
			 <meta name="twitter:site" content="@SwiftEarn" />
			 <meta name="twitter:title" content="FAQ - Frequently Asked Questions" />
			 <meta name="twitter:description" content="Frequently Asked Questions. You've got questions? We've got answers!" />
			 <meta property="og:site_name" content="SwiftEarn" />
			 <meta property="og:title" content="FAQ - Frequently Asked Questions" />
			 <meta property="og:description" content="Frequently Asked Questions. You've got questions? We've got answers!" />
			</Head>
		 <header className="relative text-gray-300">
		  <nav className="container mx-auto flex items-center justify-between p-3">
		   <Link href="/"><a>
		    <img className="w-32" src="Logo.png" alt="SwiftEarn official logo" /></a>
		   </Link>
		   <div className="flex items-center">
		    <Link href="/login"><a className="green-btn rounded md:order-2">Login</a></Link>
		   </div>
		  </nav>
		 </header>
		 <main>
			 <section className="bg-white my-12">
			  <div className="max-w-xl bg-gray-50 mx-auto px-6">
			   <div className="text-center">
			    <h5 className="text-xs">FAQs</h5>
			    <h2 className="text-3xl font-special color1 py-5">Frequently Asked Questions</h2>
			    <p className="text-sm font-bold color4">You've got questions? We've got answers!</p>
			   </div>
			   <GenFaqs faqs={faqs} />
			   </div>
			  </section>
			 </main>
			 <Footer />
		 </>
		)
	}
	
	function GenFaqs({ faqs }) {
		
		return (
			<ul className="my-12 text-sm faqs">
				{
					faqs.map(faq => <GenerateFaq data={faq} />)
				}
			</ul>
		);
	}
	
	function GenerateFaq({ data }) {
		const [open, setOpen] = useState(false);
	
		return (
			<li className="mb-3 border-2 border-gray-200 rounded-lg">
				<div className="flex items-center justify-between p-3" onClick={() => setOpen(prev => !prev)}>
					<GetTogglers question={data.question} open={open} />
				</div>
				<div className={"p-4" + open ? "" : " hidden" }>
					{
						data.answers.map(ans => (
							<p className="leading-relaxed mb-4">{ans}</p>
						))
					}
				</div>
			</li>
		);
	}
	
	function GetTogglers({ question, open }) {
		
		return (
		<>
			<h2 className="mr-3 text-sm">{question}</h2>
			<span className="pr-1">
				<svg className={open ? 'hidden' : ''} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
			<svg className={open ? '' : 'hidden'} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.2em" height="1.2em"  xmlns="http://www.w3.org/2000/svg"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" /></svg></span>
		</>
		);
	}