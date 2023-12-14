import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />{/*
							 <link rel="icon" href="https://www.skysports.com/favicon.ico?bypass-service-worker" />
							 <link rel="icon" href="https://www.skysports.com/icon.svg?bypass-service-worker" type="image/svg+xml" />
							 <link rel="apple-touch-icon" href="logo192.png" />
								<link rel="canonical" href="http://localhost:3000" />*/}
				<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.17/dist/tailwind.min.css" rel="stylesheet" />
				<link rel="stylesheet" href="style.css" />
				<link rel="stylesheet" href="project64ar7r4.css" />
				<script src="swiftearn.js"></script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}