//import { firebase_app, unsubscribe } from '../auth.js';
import Header from '../header.js';
import Transactions from '../components/transactions.js';
import HighDemandProducts from '../components/highDemandProducts.js';

let moneybag = (
`<svg class="mx-auto" width="5rem" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 394 511.98"><path fill="#3E7D52" d="M158.912 88.115c-7.903-23.315-15.02-46.892-21.026-70.838 22.398-24.583 108.964-21.316 133.86-.384l-23.05 54.803c12.396-16.286 16.563-22.97 23.958-32.043a71.446 71.446 0 018.787 6.814c6.557 5.936 12.412 12.495 13.597 21.638.768 5.929-.927 11.952-6.203 18.111l-52.884 61.595c-6.807-1.116-13.459-2.75-19.914-5.044 2.999-7.058 6.616-14.823 9.615-21.882l-19.253 20.795c-20.058-4.232-36.188-1.707-51.219 6.242l-53.632-64.366c-3.186-3.839-4.636-7.678-4.624-11.517.051-15.559 23.218-28.987 35.396-34.07l26.592 50.146z" />
							<path fill="#366F49" d="M139.295 22.806l-1.408-5.53C143 11.665 151.46 7.507 161.763 4.679c5.995 22.606 12.85 44.928 20.344 67.037l-29.499-55.63c-3.764 1.569-8.476 3.862-13.313 6.72zm109.086 110.528l-12.431 14.478c-6.806-1.117-13.459-2.75-19.912-5.045 1.85-4.358 3.936-8.983 5.968-13.548 4.105.354 8.356.988 12.779 1.921l21.364-23.07c-3.329 7.831-7.343 16.447-10.667 24.276.963.343 1.929.672 2.899.988zm-30.215-4.365l-11.768 12.711c-20.057-4.231-36.186-1.706-51.217 6.243l-53.633-64.368c-3.185-3.839-4.636-7.676-4.623-11.516.03-9.258 8.247-17.761 17.463-24.201-.668 1.974-1.042 3.993-1.049 6.045-.013 4.259 1.595 8.516 5.128 12.775l59.5 71.407c12.315-6.511 25.294-9.743 40.199-9.096z" />
							<path fill="#3E7D52" d="M227.639 204.409l-10.467-47.871c44.832 8.338 116.691 99.534 139.911 140.998 11.852 21.164 22.232 44.48 30.731 70.545 16.931 63.08.622 122.093-67.807 135.838-42.877 8.614-122.838 9.224-167.93 6.891-48.476-2.509-123.494-2.432-143.09-52.204-31.628-80.338 26.319-176.045 79.155-234.623 6.952-7.708 14.141-14.892 21.579-21.522 19.219-16.91 39.943-36.976 64.682-45.319l-23.895 44.495 34.705-46.011h18.288l24.138 48.783z" />
							<path fill="#499560" d="M227.64 204.408l-10.467-47.871c100.985 37.366 274.435 303.922 75.77 306.108-337.547 3.716-272.661-41.47-183.221-260.184 19.219-16.909 39.944-36.976 64.681-45.32l-23.896 44.496 34.707-46.01h18.287l24.139 48.781z" />
							<path fill="#3E7D52" d="M227.64 204.408l-4.535-20.74c78.872 60.049 179.837 226.097 103.746 274.941-9.691 2.5-20.964 2.775-33.908 4.036-342.946 33.418-276.078-22.116-183.221-260.184 12.559-11.05 25.761-23.448 40.305-33.041l-22.496 41.89 34.707-46.009h7.782l-19.513 36.336 27.41-36.336h2.608l24.139 48.78-10.467-47.871c6.331 2.637 13.063 6.403 20.031 11.094l13.412 27.104z" />
							<circle fill="#68BE7C" transform="scale(24.9353) rotate(-61.974 15.208 .304)" r="3.937" />
							<path fill="#3E7D52" fill-rule="nonzero" d="M176.84 389.739a344.11 344.11 0 01-8.232-1.271c-2.907-.561-5.609-1.196-8.473-1.931a5.014 5.014 0 01-3.716-4.841l-.007-21.937a5.018 5.018 0 015.017-5.017c6.329.402 12.39.905 18.75 1.102a43.1 43.1 0 01-4.227-.983c-12.046-3.478-18.731-11.564-20.572-24.055a53.289 53.289 0 01-.54-7.74v-3.986c0-2.573.204-5.04.614-7.393a33.338 33.338 0 011.888-6.746 27.874 27.874 0 013.291-5.999c3.627-5.067 9.997-9.536 16.012-11.356l.195-.073v-5.745a5.018 5.018 0 015.017-5.018h20.233a5.018 5.018 0 015.018 5.018v4.87c5.51.842 11.051 1.904 16.467 3.228a4.997 4.997 0 013.822 4.858l.02 21.967a5.018 5.018 0 01-5.017 5.018c-9.572-.556-18.687-1.428-28.352-1.241a50.147 50.147 0 00-3.352.328l1.037.043c7.481 0 14.333-.429 21.469 2.263a27.797 27.797 0 013.928 1.845c2.447 1.395 4.602 3.053 6.453 4.956a27.246 27.246 0 014.691 6.537 30.321 30.321 0 011.577 3.637c.455 1.238.837 2.53 1.135 3.859.296 1.318.523 2.657.667 3.989.157 1.411.236 2.791.236 4.13v3.986c0 2.015-.104 4.04-.304 6.056a45.438 45.438 0 01-.884 5.548c-.423 1.869-.953 3.58-1.578 5.119a25.894 25.894 0 01-2.371 4.517 26.55 26.55 0 01-2.957 3.736 25.421 25.421 0 01-3.579 3.111 26.466 26.466 0 01-4.085 2.416 28.22 28.22 0 01-4.536 1.714l-.723.19c-1.345.397-2.516.735-3.764 1.024v6.298a5.018 5.018 0 01-5.018 5.017h-20.233a5.017 5.017 0 01-5.017-5.017v-6.031z" />
							<path fill="#fff" fill-rule="nonzero" d="M181.858 385.337c-1.38-.098-2.224-.238-3.239-.401l-5.68-.815-3.506-.588a81.372 81.372 0 01-3.392-.68 75.17 75.17 0 01-3.277-.797l-1.335-.359v-21.939l6.204.505 4.555.27 4.78.212 4.841.151 4.706.091 4.372.021a39.76 39.76 0 003.49-.135 21.221 21.221 0 002.761-.416 9.117 9.117 0 001.938-.654 4.238 4.238 0 001.169-.805c.259-.258.457-.564.582-.91.146-.404.221-.887.221-1.441v-1.45c0-1.157-.372-2.001-1.113-2.526a5.122 5.122 0 00-1.511-.736c-.554-.172-1.176-.255-1.859-.255h-6.402c-4.822 0-9.099-.541-12.82-1.619-3.793-1.1-6.994-2.76-9.6-4.972-2.664-2.273-4.655-5.28-5.966-9.022-1.278-3.643-1.919-7.979-1.919-13.001v-3.986c0-4.651.711-8.745 2.127-12.279 3.296-8.22 11.275-13.864 19.873-15.301v-9.732h20.232v9.339c3.347.268 5.941.735 9.216 1.327l1.7.297c1.42.25 2.836.524 4.237.815 1.313.27 2.579.552 3.78.843l1.377.335v21.968l-1.953-.172a235.784 235.784 0 00-5.853-.437c-2.138-.134-4.33-.253-6.569-.348-2.34-.1-4.541-.178-6.576-.225a250.158 250.158 0 00-5.971-.068c-1.104 0-2.127.038-3.061.113-.978.076-1.87.188-2.663.333a7.684 7.684 0 00-1.908.586 4.397 4.397 0 00-1.244.857 2.806 2.806 0 00-.66 1.091c-.174.512-.264 1.136-.264 1.866v1.207c0 .777.113 1.435.336 1.962.206.488.518.902.929 1.237.442.359 1.036.639 1.773.834.823.217 1.831.329 3.016.329h7.972c2.929 0 5.646.287 8.14.851 2.522.573 4.797 1.44 6.818 2.59 4.056 2.311 7.114 5.459 9.165 9.435a26.366 26.366 0 012.281 6.301c.506 2.231.762 4.574.762 7.022v3.986c0 3.933-.352 7.439-1.048 10.506-.711 3.129-1.796 5.795-3.243 7.991-1.45 2.199-3.216 4.046-5.283 5.532-2.066 1.483-4.43 2.609-7.075 3.366l-.677.189c-2.581.743-4.448 1.282-7.454 1.611v10.532h-20.232v-10.432z" /></svg>`);
	
function Withdrawal(uid) {
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
		cEl('div', {},
			cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Fund Withdrawal' }),
			cEl('p', { class: 'text-xs color4', textContent: 'Enjoy a seamless withdrawal experience on our platform. Request withdrawals, keep track of your financial activities, and conveniently manage your funds.' })
		),
		cEl('section', 
			{ class: 'pt-2' },
			cEl('div', 
				{ class: 'select-none text-center my-4 relative' },
				cEl('span', { class: 'absolute top-0 right-4 text-xs color4 p-1', textContent: '12/04/2023 12:45AM' }),
				cEl('a', { href: '', class: 'block p-4 bg-green-900 rounded-lg border-2 border-green-700 text-green-100 font-bold' },
					svg(moneybag),
					cEl('span', { class: 'p-2 inline-block py-4 text-sm', textContent: 'Request Withdrawal' })
				)
			)
		),
		Transactions(uid),
		HighDemandProducts()
	);
	return main;
}
/*
unsubscribe.then(res => {
 if(res === 0) alert('Your session has expired!');
 if(res === 0 || res === 1) {
  location.href = '/login.html?redirect=true&page=' + new URL(location.href).pathname;
 }
 
 if(res === 2) {*/
  let myPage = Header('Vendors'/*, res.uid*/);
  myPage.append(Withdrawal(/*res.uid*/));/*
 }
});*/
