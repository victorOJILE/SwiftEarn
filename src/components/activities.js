import loader from './loader.js';

export default function activities(data) {
	let comp;
	data = [
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Alexander McQueen',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '35%',
			earning: '$10'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Alexander McQueen',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '35%',
			earning: '$10'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Alexander McQueen',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '45%',
			earning: '$15'
		}
];

	if(data && data.length) {
		comp = cEl('table', { class: "text-sm", width: "100%", style: { minWidth: "30rem" } },
			cEl('thead', {},
				cEl('tr', {},
					cEl('th', { class: 'p-2', textContent: 'No.' }),
					cEl('th', { textContent: 'Vendor' }),
					cEl('th', { textContent: 'Date' }),
					cEl('th', { textContent: 'Commission' }),
					cEl('th', { textContent: 'Earnings' })
				)
			),
			cEl('tbody', { class: 'text-center color2' },
				...data.slice(0, 5).map((each, ind) => generateRow(each, ind+1))
			)
		);
	} else {
		comp = loader();
	}
	
	const div = cEl('div', { class: 'overflow-auto' },
		cEl('h2', { class: 'text-xl', textContent: 'Latest Activities' }),
		cEl('div', { class: 'bg-custom-main-bg overflow-auto my-2' },
		comp
		),
		(data && data.length && data.length > 5) && cEl('div', { class: 'text-center border-2 border' },
			cEl('a', { href: urlPrefix + '/analytics.html', class: 'block p-2 text-green-500 text-sm', textContent: 'View more'})
		) || ''
	);

	return div;
}

function generateRow(data, ind) {
	
	return cEl('tr', {},
		cEl('td', { textContent: ind }),
		cEl('td', { textContent: data.vendor }),
		cEl('td', { textContent: data.date }),
		cEl('td', { textContent: data.commission }),
		cEl('td', { textContent: data.earning, class: 'text-green-400' })
	);
}