import { useState, useLayoutEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { Link } from 'next/link';
import { useAuthContext, callSignout, passwordReset } from '../firebase/auth';
import * as icons from './icons.js';

const currentTheme = localStorage.getItem("swf-theme");
if (currentTheme == "dark") {
	document.body.classList.toggle("dark-theme");
}

export default function HeaderWrapper({ children, data }) {
	const [openLeftNav, setOpenLeftNav] = useState(' -left-full');
	const [openRightNav, setOpenRightNav] = useState(' hidden -top-full');
	const [rightNavValue, setRightNavValue] = useState(false);
	
	useLayoutEffect(() => {
		let waiting = false;
		window.addEventListener('scroll', function(e) {
			if (waiting) return;
			waiting = true;

			if (this.oldScroll <= window.pageYOffset && window.pageYOffset > window.innerHeight) {
				setTimeout(() => {
					document.getElementsByTagName('header')[0].classList.add('-top-full');
					waiting = false;
				}, 300);
			} else {
				setTimeout(() => {
					document.getElementsByTagName('header')[0].classList.remove('-top-full');
					waiting = false;
				}, 300);
			}
			this.oldScroll = window.pageYOffset;
		});
	}, []);
	
	return (
		<>
			<AsideLeft open={openLeftNav} setOpen={setOpenLeftNav} data={data} />
			<div className="md:col-span-4 bg-custom-main-bg overflow-auto pt-20 md:pt-0">
				<header className="trans fixed w-full left-0 top-0 z-10 md:static">
					<div className="p-2 md:p-3 flex items-center justify-between container mx-auto">
						<div className="hamburger inline-block md:hidden mr-3" id="hamburger" onClick={() => {
								setOpen("");
								document.body.style.overflow = 'hidden';
							}}><span></span><span></span><span></span></div>
						<div></div>
						<div>
							<span className="mr-2 inline-block hover:bg-gray-500 p-2 text-blue-200 rounded-full transition duration-700 relative">
								<span className="p-1 absolute top-0 right-0 bg-green-500 rounded-full font-bold" style={{ fontSize: '0.65rem' }}></span>
								{icons.notification}
							</span>
							<span onClick={() => {
								let value1 = !rightNavValue ? ' hidden' : '';
								let value2 = !rightNavValue ? ' hidden -top-full' : 'top-20';
								setOpenRightNav(value1);
								setOpenRightNav(value2);
								setRightNavValue(prev => !prev);
							}} className="inline-block hover:bg-gray-500 p-2 text-blue-200 rounded-full transition duration-700" id="profileIcon">{icons.user}</span>
						</div>
					</div>
				</header>
				{ children }
			</div>
			<AsideRight open={openRightNav} />
		</>
	);
}

function AsideLeft({ open, setOpen, data }) {
	const lists = [
  [
			{
				href: '/overview',
				icon: icons.dashboard,
				text: 'Overview'
			},
			{
				href: '/membership',
				icon: icons.buildingUp,
				text: 'Membership'
			},
			{
				href: '/marketplace',
				icon: icons.marketplace,
				text: 'Marketplace'
		},
			{
				href: '/vendors',
				icon: icons.vendors,
				text: 'Vendors'
		},
			{
				href: '/contests',
				icon: icons.contests,
				text: 'Contests'
		},
			{
				href: '/transactions',
				icon: icons.transaction,
				text: 'Transactions'
		},
			{
				href: '/withdrawal',
				icon: icons.withdrawal,
				text: 'Withdrawal'
		}
	],
	 [
			{
				href: '/profile',
				icon: icons.gear,
				text: 'Settings'
		},
			{
				href: '/help',
				icon: icons.help,
				text: 'Help'
		}
	],
	 [
			{
				href: 'javascript:(void)',
				icon: icons.logout,
				text: 'Log out',
				click: callSignout
		}
	 ]
 ];

	let vendorNavs = {
		icon: icons.products,
		text: 'Products',
		children: [
			{
				href: '/product/addProduct',
				icon: icons.cartPlus,
				text: 'Add Product'
  },
			{
				href: '/product/products',
				icon: icons.products,
				text: 'My Products'
  },
			{
				href: '/vendors/signup',
				icon: icons.personGear,
				text: 'Vendor Profile'
  },
			{
				href: '/vendors/signup',
				icon: icons.contests,
				text: 'Set Up Contest'
  }
  ]
	};

	data.role === 'vendor' && lists[0].splice(2, 0, vendorNavs);

	return (
		<aside className={"bg-main fixed top-0 md:static h-screen md:col-span-1 w-9/12 md:w-auto max-w-sm z-20 overflow-auto scroll-bar text-blue-200 text-md" + open} ariaHidden>
 		<div className="flex items-center p-3 md:pt-10">
 				<a href="/" className="flex-grow md:mx-auto">
 					<img src="Logo.png" />
 				</a>
 			<div onClick={() => {
 				setOpen('-left-full');
 				document.body.style.overflow = 'auto';
 			}}>{icons.closeSidebar}</div>
 		</div>
 		<Navs lists={lists} />
 		<div className="flex items-center justify-between px-4 mt-4 mb-12">
 			Theme
 			<span className="flex justify-between items-center ml-2">
 				{icons.sun}
 				<input	className="switch-input"	type="checkbox"	id="switch"
 					checked={currentTheme == 'dark'} onChange={() => {
 							document.body.classList.toggle("dark-theme");
 				
 							localStorage.setItem("swf-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
 						}
 					} />
   		<label className="switch-label cursor-pointer" htmlFor="switch"></label>
   		{icons.moon}
   	</span>
   </div>
 	</aside>
	);
}

const AsideRight = memo(function AsideRight({ open }) {
	const router = useRouter();
	
	return (
		<aside className={"bg-gray-900 border-2 border fixed right-2 w-48 z-10 p-1 color2 trans profileBar text-sm font-light" + open}>
			<ul className="text-blue-200">
				<li	className="p-2 pr-1 flex items-center trans mb-1 hover:bg-gray-800" onClick={router.push('/profile')}>{icons.settings} Profile</li>
				<li onClick={passwordReset}	className="p-2 pr-1 flex items-center trans mb-1 hover:bg-gray-800">{icons.lockIcon} Reset password</li>
				<li	onClick={callSignout}	className="p-2 pr-1 flex items-center trans mb-1 hover:bg-gray-800">{icons.logout} Log out</li>
				<li className="p-2 pr-1 flex items-center trans hover:bg-gray-800"> {icons.help} Help</li>
			</ul>
		</aside>
	);
});

const Navs = memo(function Navs({ lists }) {
	return (
		<>
		{
			lists.map(nav => <GenerateNav nav={nav} />)
			}
		</>
	);
});

function GenerateNav({ nav }) {
	const router = useRouter();

	return (
		<nav className="border-b-2 border-gray-600 py-3">
			<ul>
				{	nav.map(li => <GenerateLists li={li} path={router.pathname} />)	}
			</ul>
		</nav>
	);
};

function GenerateLists({ li, path }) {

	if (li.children) {
		return (
			<GenerateLists2 li={li} path={path} />
		);
	} else {
		return (
			list.click ? (
				<li onClick={list.click}>
				<Link href={list.href}><a className={'p-3 pr-1 flex items-center trans ' + (list.href === path ? 'bg-blue-800 hover:bg-blue-800' : 'hover:bg-gray-800')}>
					<div className="flex-grow flex items-center">
						{list.icon}
						{list.text}
					</div>
					</a>
				</Link>
			</li>) : (
				<li>
					<Link href={list.href}><a className={'p-3 pr-1 flex items-center trans ' + (list.href === path ? 'bg-blue-800 hover:bg-blue-800' : 'hover:bg-gray-800')}>
						<div className="flex-grow flex items-center">
							{list.icon}
							{list.text}
						</div>
						</a>
					</Link>
				</li>
			)
		);
	}
}

function GenerateLists2({ li, path }) {
	const [open, setOpen] = useState(false);

	return (
		<li>
			<Link href='javascript:(void)'><a className={'p-0 pr-1 flex items-center trans justify-between'} onClick={() => setOpen(prev => !prev)}>
				<div className="flex-grow flex items-center">
						{li.icon}
						{li.text}
				</div>
				{icons.chevronDown}</a>
			</Link>
			<ul className={"mx-2 text-sm bg-gray-900" + ( open ? '' : ' hidden' )}>
				{
					li.children.map(l => <GenerateLists li={l} path={path} />)
				}
			</ul>
		</li>
	);
}