import { Head } from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signIn, loginWithGoogle, passwordReset } from '../firebase/auth';
import PasswordInput from '../components/enterPassword';

const envelope = <svg stroke="darkslategray" fill="darkslategray" strokeWidth="0" viewBox="0 0 512 512" width="1.3em" height="1.3em" xmlns="http://www.w3.org/2000/svg">
	<path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" /></svg>;

const infoIcon = <svg className="inline-block w-4 mr-1" focusable="false" viewBox="64 64 896 896" fill="rgb(251, 191, 36)">
<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" /></svg>;

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

export default function Login() {
	const [data, setData] = useState({});
	const [elem, setElem] = useState({
		showEmailNotRecognized: false,
		showWrongPassword: false,
		submitBtnHtml: 'Continue',
		showCover: false
	});
	const router = useRouter();
	
	const linkTo = router.query.redirect ? router.query.page : '/overview';
	
	useEffect(() => router.prefetch(linkTo), []);
	
	const useGoogle = useCallback(async function() {
		let { error } = await loginWithGoogle();

		if (!error) {
			document.cookie = `lastRefresh=${Date.now()};max-age=14400`;

			router.push(linkTo);
		}
	}, []);
	
	const handleSubmit = useCallback(async function handleSubmit(e) {
		e.preventDefault();

		let { email, password } = this;
		email = email.value;
		password = password.value;
		
		setElem(prev => ({
			...prev,
			submitBtnHtml: <span className="loader"></span>,
			showCover: true
		}));
		
		const { result, error } = await signIn(email.value, password.value);

		if (error) {
			setElem(prev => ({
				...prev,
				submitBtnHtml: 'Continue',
				showCover: false
			}));
			
			if (error.code == 'auth/user-not-found') {
				setElem(prev => ({
					...prev,
					showEmailNotRecognized: true
				}));
				/*
				let emailInput = emailNotRecognized.previousElementSibling.lastElementChild;
				emailInput.addEventListener('blur', () => emailNotRecognized.classList.add('hidden'), { once: true });*/
			}
			if (error.code == "auth/wrong-password") {
				setElem(prev => ({
					...prev,
					showWrongPassword: true
				}));
				/*
				let passwordInput = wrongPassword.previousElementSibling.lastElementChild;
				// TODO: 
				// blur event not added to input
				passwordInput.addEventListener('blur', () => wrongPassword.classList.add('hidden'), { once: true })*/
			}
			console.log(error);
		} else {
			document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
			
			router.push(linkTo);
		}
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
				<title>SwiftEarn - Login</title>
				<meta name="description" content="Login to your SwiftEarn account" />
			 <meta name="twitter:card" content="" />
			 <meta name="twitter:site" content="@SwiftEarn" />
			 <meta name="twitter:title" content="SwiftEarn - Login" />
			 <meta name="twitter:description" content="Login to your SwiftEarn account" />
			 <meta property="og:site_name" content="SwiftEarn" />
			 <meta property="og:title" content="SwiftEarn - Login" />
			 <meta property="og:description" content="Login to your SwiftEarn account" />
			</Head>
		<form className="relative bg-gray-100 rounded-md py-6 px-8 w-11/12 max-w-sm mx-auto" onSubmit={handleSubmit}>
			<h1 className="text-2xl md:text-4xl font-bold mb-8 leading-normal text-center">LOGIN</h1>
			<div className="mb-6">
				<label className="font-bold text-sm" htmlFor="email">Email address:</label>
				<br />
			<div className="flex items-center bg-white mt-1">
				<div className="w-10 pl-2 border-r-2">
					{envelope}
				</div>
				<input type="email" name="email" className="border-0 text-sm bg-white outline-0 flex-grow p-3" id="email" placeholder="name@yahoo.com" value={data.email} onInput={updateData} required />
			</div>
			{ elem.showEmailNotRecognized && <small className="info text-yellow-500 py-1">infoIcon
				Email address does not exist!</small>}
		</div>
		<PasswordInput value={data.password} setData={updateData}>{ elem.showWrongPassword && <small className="info text-yellow-400 py-1 email-info">{infoIcon}
						Wrong password!</small>
		}</PasswordInput>
		<div className="p-3 mb-2 text-right">
			<a onClick={passwordReset} className="text-xs underline text-green-500">Forgot password</a>
		</div>
		<div className="text-center">
			<button type="submit" className="py-3 px-8 bg-blue-900 color2 rounded-lg font-bold">{elem.submitBtnHtml}</button>
			<p className="py-2 text-xs">
				You do not have an account. 
				<Link href="/signup"><a className="text-green-500 font-bold underline">Sign up</a></Link>
			</p>
		</div>
		<div className="mt-8 text-center font-special text-md">
			<hr />
			<span className="inline-block px-3 bg-gray-100" style={{ transform: 'translateY(-50%)' }}>OR</span>
		</div>
		<div className="py-5 font-semibold text-md text-gray-500">
			<a href="javascript:(void)" className="flex items-center py-2 px-3 mb-5 w-full rounded-xl border-2 border-gray-300" onClick={useGoogle}>
				{svg(googleIcon)}
				Continue with Google
			</a>
		</div>
		{ elem.showCover && <div className="form-cover rounded-lg"></div> }
		</form>
		</>
	);
}