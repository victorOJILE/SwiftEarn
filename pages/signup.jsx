import { Head } from 'next/head';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { auth, loginWithGoogle, signUp } from '../firebase/auth';
import { updateProfile } from 'firebase/auth';
import { db, doc, getDoc, setDoc } from '../firebase/firestore';
import { useRouter } from 'next/router';
import PasswordInput from '../components/enterPassword';

const userIcon = <svg stroke="darkslategray" fill="darkslategray" strokeWidth="0" viewBox="0 0 496 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" /></svg>;

const infoIcon = <svg className="inline-block w-4 mr-1" focusable="false" viewBox="64 64 896 896" fill="rgb(251, 191, 36)">
<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" /></svg>;

const envelope = <svg stroke="darkslategray" fill="darkslategray" strokeWidth="0" viewBox="0 0 512 512" width="1.3em" height="1.3em" xmlns="http://www.w3.org/2000/svg">
	<path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" /></svg>;

const googleIcon = (
	`<svg class="mr-2" width="2.2em" height="2.2em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Capa_1" style="enable-background:new 0 0 150 150;" version="1.1" viewBox="10 5 120 120" xml:space="preserve"><style type="text/css">.st0 {fill: #1A73E8}.st1 {fill: #EA4335}.st2 {fill: #4285F4}.st3 {fill: #FBBC04}.st4 {fill: #34A853}.st5 {fill: #4CAF50}.st6 {fill: #1E88E5}.st7 {fill: #E53935}.st8 {fill: #C62828}

									.st9 {
										fill: #FBC02D;
									}

									.st10 {
										fill: #1565C0;
									}

									.st11 {
										fill: #2E7D32;
									}

									.st12 {
										fill: #F6B704;
									}

									.st13 {
										fill: #E54335;
									}

									.st14 {
										fill: #4280EF;
									}

									.st15 {
										fill: #34A353;
									}

									.st16 {
										clip-path: url(#SVGID_2_);
									}

									.st17 {
										fill: #188038;
									}

									.st18 {
										opacity: 0.2;
										fill: #FFFFFF;
										enable-background: new;
									}

									.st19 {
										opacity: 0.3;
										fill: #0D652D;
										enable-background: new;
									}

									.st20 {
										clip-path: url(#SVGID_4_);
									}

									.st21 {
										opacity: 0.3;
										fill: url(#_45_shadow_1_);
										enable-background: new;
									}

									.st22 {
										clip-path: url(#SVGID_6_);
									}

									.st23 {
										fill: #FA7B17;
									}

									.st24 {
										opacity: 0.3;
										fill: #174EA6;
										enable-background: new;
									}

									.st25 {
										opacity: 0.3;
										fill: #A50E0E;
										enable-background: new;
									}

									.st26 {
										opacity: 0.3;
										fill: #E37400;
										enable-background: new;
									}

									.st27 {
										fill: url(#Finish_mask_1_);
									}

									.st28 {
										fill: #FFFFFF;
									}

									.st29 {
										fill: #0C9D58;
									}

									.st30 {
										opacity: 0.2;
										fill: #004D40;
										enable-background: new;
									}

									.st31 {
										opacity: 0.2;
										fill: #3E2723;
										enable-background: new;
									}

									.st32 {
										fill: #FFC107;
									}

									.st33 {
										opacity: 0.2;
										fill: #1A237E;
										enable-background: new;
									}

									.st34 {
										opacity: 0.2;
									}

									.st35 {
										fill: #1A237E;
									}

									.st36 {
										fill: url(#SVGID_7_);
									}

									.st37 {
										fill: #FBBC05;
									}

									.st38 {
										clip-path: url(#SVGID_9_);
										fill: #E53935;
									}

									.st39 {
										clip-path: url(#SVGID_11_);
										fill: #FBC02D;
									}

									.st40 {
										clip-path: url(#SVGID_13_);
										fill: #E53935;
									}

									.st41 {
										clip-path: url(#SVGID_15_);
										fill: #FBC02D;
									}
								</style>
								<g>
									<path class="st14" d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5   C115,101.8,120,90,120,76.1L120,76.1z" />
									<path class="st15" d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9   L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z" />
									<path class="st12" d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z" />
									<path class="st13" d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3   l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z" />
								</g>
							</svg>`);

let verifiedEmail;

export default function SignUp() {
	const [data, setData] = useState({
		role: "affiliate",
		currency: 'USD',
		subscribed: false
	});
	const [elem, setElem] = useState({
		showEmailInUse: false,
		showEmailNotMatch: false,
		showInvalidPassword: false,
		submitBtnHtml: 'Create account',
		showCover: false
	});
	const router = useRouter();
	
	useEffect(() => router.prefetch('/overview'), []);
	
	const useGoogle = useCallback(async function() {
		const { result, error } = await loginWithGoogle();
		if (!error) {
			// The signed-in user info.
			const user = result.user;

			let [firstName, ...rest] = user.displayName.split(' ');
			
			let usedCode = false;
			if (router.query.sp_code) {
				if (!usedCode) {
					const resp = await getDoc(doc(db, 'allow_sp', router.query.sp_code));
			
					if (resp.exists()) {
						data.subscribed = true;
						done.usedCode = true;
					}
				}
			}
			
			await setDoc(doc(db, 'users', uid),
				Object.assign(data, {
					user_id: user.uid,
					email: user.email,
					firstName,
					lastName: rest.join(' '),
					fullName: user.displayName,
					registration_date: Date.now()
				}));

			document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
			
			if (usedCode) {
				async function send() {
					const res = await fetch('/disable_sp_code?sp=' + router.query.sp_code);
					if (!res.ok) await send();
				}
			
				await send()
			}

			router.push('/overview');
		} else {
			console.error(error);
		}
	}, []);

	const handleSubmit = useCallback(async function(e) {
		e.preventDefault();

		let { fullName, email, confEmail, password } = form;
		email = email.value;
		password = password.value;
		fullName = fullName.value;

		if (fullName.split(' ') < 2) return alert('Invalid Full name');

		if (email !== confEmail.value) {
			setData(prev => ({
				...prev,
				showEmailNotMatch: true
			}));
			
			/*
			let emailNotMatchInput = emailNotMatch.previousElementSibling.lastElementChild;
			emailNotMatchInput.addEventListener('blur', () => emailNotMatch.classList.add('hidden'), { once: true });*/
			return;
		}

		let [firstName, ...rest] = fullName.split(' ');
		
		setData(prev => ({
			...prev,
			submitBtnHtml: <span className="loader"></span>,
			showCover: true
		}));
		
		let done = {};

		async function addUser() {
			try {
				let result;

				if (!done.createdAccount) {
					result = await signUp(email, password);
					done.createdAccount = true;
				}

				if (result.error) throw result.error;
				document.cookie = `lastRefresh=${Date.now()};max-age=14400`;

				if (!done.updatedProfile) {
					await updateProfile(auth.currentUser, { displayName: fullName });
					done.updatedProfile = true;
				}
				
				if (router.query.sp_code) {
					if(!done.usedCode) {
						const resp = await getDoc(doc(db, 'allow_sp', router.query.sp_code));
					
						if (resp.exists()) {
							data.subscribed = true;
							done.usedCode = true;
						}
					}
				}
				
				await setDoc(doc(db, 'users', result.user.uid),
					Object.assign(data, {
						user_id: result.user.uid,
						email,
						firstName,
						lastName: rest.join(' '),
						fullName,
						registration_date: Date.now()
					})
				);
				
				if(done.usedCode) {
					async	function send() {
						const res = await fetch('/disable_sp_code?sp=' + router.query.sp_code);
						if(!res.ok) await send();
					}
					
					await send()
				}
				
				router.push('/overview');
			} catch (error) {
				setData(prev => ({
					...prev,
					showCover: false,
					submitBtnHtml: 'Create account'
				}));
				
				if (error.code == 'auth/email-already-in-use') {
					setData(prev => ({
						...prev,
						showEmailInUse: false
					}));/*
					
					let emailInUseInput = emailInUse.previousElementSibling.lastElementChild;
					emailInUseInput.addEventListener('blur', () => emailInUse.classList.add('hidden'), { once: true })*/
				} else if (error.code == 'auth/network-request-failed') {
					setTimeout(addUser, 5000);
				}
				console.log(error);
			}
		}

		// If verifiedEmail is truthy, email has been verified successfully but there was an error creating the user
		if (verifiedEmail !== email) { // if email changes from the input, re-verify email, else createUser

			function sendEmail() {
				const verificationCode = String(Math.floor(Math.random() * 9999) + 1000).slice(0, 4);

				emailjs.send("service_af1tg34", "template_ps840sm", {
						user_email: email,
						user_fullname: fullName || '',
						code: verificationCode
					})
					.then(() => VerifyOTP(addUser, sendEmail, email, cover, verificationCode))
					.catch(() => {
						setData(prev => ({
							...prev,
							showCover: false,
							submitBtnHtml: 'Create account'
						}));
					});
			}

			sendEmail();
		} else {
			addUser();
		}
	}, []);
	
	useLayoutEffect(() => {
		const emailService = document.createElement('script');
		emailService.async = true;
		emailService.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
		emailService.addEventListener('load', function(e) {
			emailjs.init("uFRTU9gjM5PBsekhn");
		})
		document.body.append(emailService);
	}, []);

	const updateData = function() {
		setData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}
	
	return (
		<>
			<Head>
				<title>SwiftEarn - Sign up</title>
			<meta name="description" content="Welcome to the SwiftEarn official website. Simple, accurate, and the most reliable. Sign up now." />
		 <meta name="twitter:card" content="" />
		 <meta name="twitter:site" content="@SwiftEarn" />
		 <meta name="twitter:title" content="SwiftEarn - Sign up" />
		 <meta name="twitter:description" content="Welcome to the SwiftEarn official website. Simple, accurate, and the most reliable. Sign up now." />
		 <meta property="og:site_name" content="SwiftEarn" />
		 <meta property="og:title" content="SwiftEarn - Sign up" />
		 <meta property="og:description" content="Welcome to the SwiftEarn official website. Simple, accurate, and the most reliable. Sign up now." />
			</Head>
		<form className="relative bg-gray-100 rounded-md py-6 px-8 w-11/12 max-w-sm mx-auto" onSubmit={handleSubmit}>
			<h1 className="text-2xl md:text-4xl font-bold mb-8 leading-normal text-center">GET STARTED</h1>
			<div className="mb-6">
				<label className="font-bold text-sm" htmlFor="fullName">Enter full name:</label>
				<br />
				<div className="flex items-center border bg-white mt-1">
					<div className="w-10 pl-2 border-r-2">
						{userIcon}
					</div>
					<input type="text" name="fullName" className="border-0 text-sm bg-white outline-0 flex-grow p-3" id="fullName" placeholder="John Doe" value={data.fullName} onInput={updateData} required />
				</div>
			</div>
			<div className="mb-6">
				<label className="font-bold text-sm" htmlFor="email">Email address:</label>
				<br />
				<div className="flex items-center bg-white mt-1">
					<div className="w-10 pl-2 border-r-2">
						{envelope}
					</div>
					<input type="email" name="email" className="border-0 text-sm bg-white outline-0 flex-grow p-3" id="email" placeholder="name@yahoo.com" value={data.email} onInput={updateData} required />
				</div>
				{ elem.showEmailInUse && <small className="info text-yellow-500 py-1">
					{infoIcon}
					Email address already used!
				</small> }
			</div>
			<div className="mb-6">
				<label className="font-bold text-sm" htmlFor="confEmail">Confirm email address:</label>
				<br />
				<div className="flex items-center bg-white mt-1">
					<div className="w-10 pl-2 border-r-2">
						{envelope}
					</div>
					<input type="email" name="confEmail" className="border-0 text-sm bg-white outline-0 flex-grow p-3" id="confEmail" placeholder="name@yahoo.com" value={data.confEmail} onInput={updateData} required />
				</div>
				{ elem.showEmailNotMatch && <small className="info text-yellow-500 py-1">
					{infoIcon}
					Email address does not match!
					</small> }
			</div>
			<PasswordInput value={data.password} setData={updateData}>
			{ elem.showInvalidPassword && <small className="info text-yellow-400 py-1 email-info">
				{infoIcon}
					Invalid password!</small>	}
			</PasswordInput>
			<div className="mb-4 text-center text-xs">
				By clicking on sign-up, you agree to the 
				<a href="/tos.html" className="text-green-500 font-bold underline leading-relaxed">SwiftEarn Terms and Conditions</a> ' and '
				<a href="/" className="text-green-500 font-bold underline">Privacy Policy.</a>
			</div>
			<div className="text-center">
				<button type="submit" className="py-3 px-8 bg-blue-900 color2 rounded-lg font-bold">{elem.submitBtnHtml}</button>
				<p className="py-2 text-xs">
					Already have an account. 
					<Link href="/login"><a className="text-green-500 font-bold underline">Login</a></Link>
				</p>
			</div>
			<div className="mt-8 text-center font-special text-md">
				<hr />
				<span className="inline-block px-3 bg-gray-100" style={{ transform: "translateY(-50%)" }}>OR</span>
			</div>
			<div className="py-5 font-semibold text-md text-gray-500">
				<a href="javascript:(void)" className="flex items-center py-2 px-3 mb-5 w-full rounded-xl border-2 border-gray-300" onClick={signUpWithGoogle}>
					{svg(googleIcon)}
					Continue with Google
				</a>
			</div>
			{ elem.showCover && <div className="form-cover rounded-lg"></div> }
		</form>
		</>
	);
}

function VerifyOTP(addUser, sendEmail, email, cover, verificationCode) {
	const modal = cEl('dialog');

	// Verification code timeout countdown timer
	const timeout = Date.now() + (60 * 60 * 1000);
	let minutes = cEl('span', { textContent: '59' }),
		seconds = cEl('span', { textContent: '59' });

	let countdown = setInterval(function() {
		let remainingTime = timeout - Date.now();

		if (remainingTime <= 0) {
			clearInterval(countdown);
			modal.remove();
			cover.remove();
		}

		// Display the remaining time
		minutes.textContent = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(0, 2);
		seconds.textContent = String(Math.floor((remainingTime / 1000) % 60)).padStart(0, 3);
	}, 1000);

	// open a dialogue to collect verification code from the user

	let focusIsBackspaceTriggered = false;

	function inputValidation(e) {
		if (e.target.value) {
			e.target.value = e.target.value[0];
			if (e.target.nextElementSibling) e.target.nextElementSibling.focus();
		} else if (e.key === 'Backspace') {
			if (e.target.previousElementSibling) {
				focusIsBackspaceTriggered = true;
				e.target.previousElementSibling.focus();
			}
		}
	}

	modal.empty();
	modal.append(
		cEl('form', {
				class: 'p-4 bg-white text-sm text-center relative',
				event: {
					submit(e) {
						e.preventDefault();
						let data = '';
						iter(new FormData(this), key => data += key[1]);
						if (data == verificationCode) {
							// In case of user creation error, save the verified email, which indicates that the user has verified the email
							verifiedEmail = email;
							modal.close()
							addUser();
						}
					}
				}
			},
			cEl('img', { src: 'inbox1.png', class: 'w-3/5 mx-auto' }),
			cEl('div', { class: 'mt-2' },
				cEl('h2', { textContent: 'OTP Verification', class: 'text-xl mb-1' }),
				cEl('p', { class: 'text-gray-600 leading-relaxed', innerHTML: "We've sent a verification code to: <b>" + email + '</b>' })
			),
			cEl('div', { class: 'p-3 mt-4 flex justify-between text-lg',
			event: {
				focusin(e) {
					if (focusIsBackspaceTriggered) {
						focusIsBackspaceTriggered = false;
						e.target.focus();
						return;
					}
			
					let inputs = this.children;
					for (let input of inputs) {
						if (!input.value) {
							input.focus();
							break;
						}
					}
				}
			}
			},
			cEl('input', { type: 'number', class: 'border rounded-lg p-2 text-center w-12', name: 'num1', event: { keyup: inputValidation }
			}),
			cEl('input', { type: 'number', name: 'num2', class: 'border rounded-lg p-2 w-12 text-center', event: { keyup: inputValidation }
			}),
			cEl('input', { type: 'number', name: 'num3', class: 'border rounded-lg p-2 w-12 text-center', event: { keyup: inputValidation }
			}),
			cEl('input', { type: 'number', name: 'num4', class: 'border rounded-lg p-2 w-12 text-center', event: { keyup: inputValidation }
			})
			),
			cEl('center', {},
				cEl('p', { class: 'mt-2 text-gray-600' }, "Didn't get the OTP? ", 
					cEl('b', {	class: "text-green-500 hover:bg-gray-200",
						textContent: 'RESEND OTP',
						event: {
							click: function() {
								clearInterval(countdown);
								modal.remove();
								sendEmail();
							}
						}
					})
					)
				), 
			cEl('button ', { class: 'mt-6 mb-3 w-full p-3 rounded-md bg-blue-700 text-gray-50 text-sm font-bold', textContent: 'Verify code'
			}),
			cEl('p', { class: 'text-gray-600' }, 'OTP expires in ',
				cEl('b', {}, '00:', minutes, ': ', seconds)
			)
			)
		);
			
		document.body.append(modal);
		modal.showModal();
}

    