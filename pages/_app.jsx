import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, callSignout, signIn } from '../firebase/auth';
import { db, doc, getDoc } from '../firebase/firestore';
import AuthHeader from '../components/AuthWrapper';
import Header from '../components/header.js';
import { useRequest } from './useRequest.js';
import Loader from '../components/loader.js';

let noAuth = ['/', '/index', '/tos', '/faq', '/product/purchase', '/pay', '/verify_payment'];

export const AuthContext = createContext({});

export function useAuthContext() {
	return useContext(AuthContext);
}

export default function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	const [data, setData] = useState(null);
	const [load, setLoad] = useState({
		loading: true,
		error: false
	});
	const router = useRouter();
	
	if(noAuth.indexOf(router.pathname)) {
		return <Component { ...pageProps } />
	}
	
	if (router.pathname === '/login' || router.pathname === '/signup') {
		return (
			<AuthHeader>
				<Component { ...pageProps } />
			</AuthHeader>
		);
	}
	
	if (!user) {
		// User is not authenticated

		router.push('/login?page=' + router.pathname);
		return;
	}
	
	if (!getCookie().lastRefresh) { // if session is expired
		callSignout(true, '/login?page=' + router.pathname);

		return;
	}
	
	/*
		if (!user.reloadUserInfo) {
			// User is authenticated but offline
			throw new Error('') or return null
		}
		
	*/
	// User is authenticated
	
	document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			try {
				setUser(user || null);
				
				setLoad({	loading: false,	error: false	});
				
			} catch (e) {
				console.error(e);
				setLoad({	loading: false,	error: true	});
			}
		});
	
		return () => unsubscribe();
	}, []);
	
	useEffect(() => {
		useRequest(
			getDoc(doc(db, 'users', uid)),
			function(res) {
				alert('Data loaded');
				
				// In case the user tries to sign up but didn't complete all the requests
				// setDoc "users" doc is the last request when signing up
				// if successful, we won't have a problem here
				
				if(!res.data) return;
				const data = res.data();
				console.log(data);
				// Add data to global context
				context.data = data;
			}
		);
	}, []);
	
	if(!load.loading && !load.error && data && !data.subscribed) {
		
		return (
			<AuthContext.Provider value={{ user, data }}>
				<Header data={data}>
					{
						router.pathname === '/marketplace' ? <Component uid={user.uid} { ...pageProps } /> : <Loader />
					}
				</Header>
			</AuthContext.Provider>
		);
	}
	
	return (
		<AuthContext.Provider value={{ user, data }}>
			{
				load.loading ? (
					<div className="h-screen flex items-center justify-center"> 
					 <span className="loader"></span>
					</div>
				) : (
					load.error ? (
						<div className="px-12 text-center text-gray-200 flex items-center justify-center" style={{ height: '80vh' }}>
							<div>
								<p>There was an error while loading this page!</p>
								<a href={location.href} className="inline-block p-3 border bg-gray-300 text-gray-700 my-6 rounded-md">Try again</a>
							</div>
						</div>
					) :
					<Header data={data}>
						{
							data ? (
								!data.subscribed ? router.pathname === 'marketplace' ? <Component uid={user.uid} { ...pageProps } /> : <Loader /> : <Component uid={user.uid} { ...pageProps } />
							) : <Loader />
						}
					</Header>
				)
			}
		</AuthContext.Provider>
	);
}
