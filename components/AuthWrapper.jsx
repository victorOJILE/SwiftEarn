export default function AuthWrapper({ children }) {
	return (
		<header>
			<nav className="container mx-auto flex items-center justify-between p-3">
				<a href="/">
					<img src="Logo.png" alt="SwiftEarn official logo" className="w-32" />
				</a>
				<a href="/blog" className="py-2 mx-4 px-4 text-gray-300 hover:text-green-500">Blog</a>
			</nav>
			<section className="container mx-auto pt-12 pb-20 md:pr-8 md:pt-24 md:pb-32 grid md:grid-cols-2 items-center">
				<div className="hidden md:block px-4 py-8 md:pr-6 color2">
					<small className="color4 md:block">Welcome to Swift Earn</small>
					<h1 className="text-4xl font-bold leading-normal">Simplify Your Online Business Journey and Boost Your Profits</h1>
					<p className="mt-2">Our entire team is dedicated to providing you with the highest standard of quality affiliate marketing services.</p>
				</div>
				{children}
			</section>
		</header>
	);
}