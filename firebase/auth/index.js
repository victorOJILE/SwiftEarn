import firebase_app from '../config.js';
import {
	getAuth,
	signOut,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';
import { useRouter } from 'next/router';

export const auth = getAuth(firebase_app);
const google = new GoogleAuthProvider();

export async function signUp(email, password) {
	let result, error;
	try {
		result = await createUserWithEmailAndPassword(auth, email, password);
	} catch (e) {
		error = e;
	}

	return { result, error };
}

export async function signIn(email, password) {
	let result, error;
	try {
		result = await signInWithEmailAndPassword(auth, email, password);
	} catch (e) {
		error = e;
	}

	return { result, error };
}

export async function loginWithGoogle() {
	let result, error;

	try {
		result = await signInWithPopup(auth, google);
	} catch (e) {
		error = e;
	}

	return { result, error };
}

export function callSignout(callAlert, url = '/login') {
	const router = useRouter();

	signOut(auth).then(() => {
		callAlert && alert('Your session has expired! Please Login.');
		router.push(url);
	});
}

export function passwordReset() {
	sendPasswordResetEmail(auth, auth.currentUser.email)
		.then(() => {
			alert('A password reset link has been sent to your email.\n\nPlease follow that link to reset your account password!');
		});
}