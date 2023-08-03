import otherAuthOptions from '../components/otherAuthOptions.js';
import { auth, db, doc, setDoc } from '../project368hdo37.js';

export default function Signup(config) {
	const googleProvider = new config.GoogleAuthProvider();
	const facebookProvider = new config.FacebookAuthProvider();
	
	let emailInUse = cEl('small', { class: 'hidden info text-yellow-500 py-1' },
		svg(infoIcon),
		document.createTextNode('Email address already used!')
	);

	let emailNotMatch = cEl('small', { class: 'hidden info text-yellow-500 py-1' },
		svg(infoIcon),
		document.createTextNode('Email address does not match!')
	);

	let eyes = cEl('span', { class: 'flex items-center px-4 eyeicon' },
		svg(eyeOpen), svg(eyeClose)
	);
	let eyesChildren = eyes.children;

	eyes.addEventListener('click', function() {
		for (let eye of eyesChildren) {
			eye.classList.toggle('hidden');
		}
	});

	eyesChildren[0].onclick = () => eyes.previousElementSibling.type = 'password';

	eyesChildren[1].onclick = () => eyes.previousElementSibling.type = 'text';

	let submitClicked = cEl('button', { type: 'submit', class: 'py-3 px-8 bg-blue-900 color2 rounded-lg font-bold', textContent: 'Create account' });

	function handleSubmit(e) {
		e.preventDefault();

		let { fullName, email, confEmail, password } = form;
		email = email.value;
		password = password.value;
		let names = fullName.value.split(' ');
		if(names.length < 2) return alert('Invalid Full name');
		
		if (email !== confEmail.value) {
			emailNotMatch.classList.remove('hidden');
			let emailNotMatchInput = emailNotMatch.previousElementSibling;
			emailNotMatchInput.addEventListener('blur', function rem() {
				emailNotMatchInput.removeEventListener('blur', rem);
				emailNotMatch.classList.add('hidden');
			});

			return;
		}

		submitClicked.innerHTML = '<span class="loader"></span>';
		let cover = document.createElement('div');
		cover.classList.add('form-cover');
		form.append(cover);

		config.createUserWithEmailAndPassword(auth, email, password)
			.then(result => {
				setDoc(doc(db, 'users', result.user.uid),
					{
						_id: result.user.uid,
						firstName: names[0],
						lastName: names.slice(1).join(' '),
						phoneNumber: '',
						email,
						password,
						country: '',
						role: "affiliate",
						registration_date: Date.now(),
						vendor_id: "",
						profilePictureUrl: "",
						rank: 1,
						bankName: '',
						bankAccName: '',
						bankAccNo: '',
						affiliateEarning: '0',
						currency: '$USD'
					})
				.then(() => location.href = '/overview.html' );
			})
			.catch((error) => {
				if (error.code == 'auth/email-already-in-use') {
					cover.remove();
					submitClicked.innerHTML = 'Create account';
					emailInUse.classList.remove('hidden');
					let emailInUseInput = emailInUse.previousElementSibling;
					emailInUseInput.addEventListener('blur', function rem() {
						emailInUseInput.removeEventListener('blur', rem);
						emailInUse.classList.add('hidden');
					})
				}
				console.log(error);
			});
	}

	const form = cEl('form', { class: 'relative bg-gray-100 rounded-md py-6 px-8 w-11/12 max-w-sm mx-auto', autoComplete: 'on', event: { submit: handleSubmit } },
		cEl('h1', { class: 'text-2xl md:text-4xl font-bold mb-8 leading-normal text-center', textContent: 'GET STARTED' }),
		cEl('div', { class: 'mb-6' },
			cEl('label', { class: 'font-bold text-xs', htmlFor: 'fullName', textContent: 'Full Name:' }),
			cEl('br'),
			cEl('input', { type: 'text', name: 'fullName', class: 'bg-gray-200 text-xs rounded w-full mt-1 p-3', id: 'fullName', required: true })
		),
		cEl('div', { class: 'mb-6' },
			cEl('label', { class: 'font-bold text-xs', htmlFor: 'email', textContent: 'Email:' }),
			cEl('br'),
			cEl('input', { type: 'email', name: 'email', class: 'bg-gray-200 text-xs rounded w-full mt-1 p-3', id: 'email', placeholder: 'name@yahoo.com', required: true }), emailInUse
		),
		cEl('div', { class: 'mb-6' },
			cEl('label', { class: 'font-bold text-xs', htmlFor: 'confEmail', textContent: 'Confirm email address:' }),
			cEl('br'),
			cEl('input', { type: 'email', class: 'bg-gray-200 text-xs rounded w-full mt-1 p-3', id: 'confEmail', name: 'confEmail', placeholder: 'Enter same email', required: true }),
			emailNotMatch
		),
		cEl('div', { class: 'mb-6' },
			cEl('label', { class: 'font-bold text-xs', htmlFor: 'password', textContent: 'Password:' }),
			cEl('br'),
			cEl('div', { class: 'flex items-stretch rounded-lg input-wrapper bg-gray-200 mt-1' },
				cEl('input', { class: 'bg-gray-200 w-4/5 p-3 text-xs rounded-l-lg', type: 'password', name: 'password', id: 'password', pattern: '.[A-Za-z0-9#$&@%]{8,35}', placeholder: 'abcABC123#$&', required: true }),
				eyes
			),
			cEl('small', { class: 'hidden info text-yellow-400 py-1 email-info' },
				svg(infoIcon),
				document.createTextNode('Invalid password!')
			)
		),
		cEl('div', { class: 'text-center' },
			submitClicked,
			cEl('p', { class: "py-2", style: { fontSize: "0.7rem" } },
				document.createTextNode('Already have an account.'),
				cEl('a', { href: "login.html", class: "text-green-500 font-bold underline", textContent: 'Login' })
			)
		),
		otherAuthOptions(
		() => config.signInWithPopup(auth, googleProvider), () => config.signInWithPopup(auth, facebookProvider)
		)
	);
	return form;
}

const infoIcon = `<svg class="inline-block w-4 mr-1" focusable="false" viewBox="64 64 896 896" fill="rgb(251, 191, 36)">
<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" /></svg>`;

const eyeOpen = `<svg class="w-5 hidden" focusable="false" viewBox="64 64 896 896" title="Hide password"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" /><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" /></svg>`;
const eyeClose = `<svg class="w-5" focusable="false" viewBox="64 64 896 896" title="View password">
<path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" /><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" /></svg>`;