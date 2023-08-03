import loader from './loader.js';

export default function Transactions(data) {
	let tableData;
	data = [
		{
			date: '10 Jul 2023, 12:30',
			status: 'Completed',
			amount: '$350'
		},
		{
			date: '10 Jul 2023, 12:30',
			status: 'Completed',
			amount: '$120'
		},
		{
			date: '10 Jul 2023, 12:30',
			status: 'Rejected',
			amount: '$35'
		},
		{
			date: '10 Jul 2023, 12:30',
			status: 'Completed',
			amount: '$60'
		},
		{
			date: '10 Jul 2023, 12:30',
			status: 'Completed',
			amount: '$350'
		},
		{
			date: '10 Jul 2023, 12:30',
			status: 'Completed',
			amount: '$120'
		},
		{
			date: '10 Jul 2023, 12:30',
			status: 'Rejected',
			amount: '$35'
		},
		{
			date: '10 Jul 2023, 12:30',
			status: 'Completed',
			amount: '$60'
		}
	];
	
	if(data && data.length) {
		tableData = cEl('table', { class: "text-xs", width: "100%", style: { minWidth: "20rem" } },
			cEl('thead', {}, 
				cEl('tr', {},
					cEl('th', { class: 'p-2', textContent: 'No.' }),
					cEl('th', { class: 'text-left pl-3', textContent: 'Date' }),
					cEl('th', { textContent: 'Status' }),
					cEl('th', { textContent: 'Status' })
				)
			),
			cEl('tbody', { class: 'text-center color2' },
			...data.slice(0, 5).map((each, ind) => createRow(each, ind+1))
			)
		);
	} else {
		tableData = loader();
	}
	const section = cEl('section', { class: 'mt-6' },
			cEl('div', { class: 'overflow-auto' },
				cEl('h2', { class: 'text-xl', textContent: 'Transactions' }),
				cEl('div', { class: 'bg-custom-main-bg overflow-auto my-2' }, tableData),
				(data && data.length && data.length > 5) && cEl('div', { class: 'text-center border-2 border' },
					cEl('a', { href: '', class: 'block p-2 text-green-500 text-sm', textContent: 'View all' })
				) || ''
			)
		);
		
		return section;
}

function createRow(data, ind) {
	return cEl('tr', {},
		cEl('td', { textContent: ind }),
		cEl('td', { textContent: data.date }),
		cEl('td', { textContent: data.status }),
		cEl('td', { textContent: data.amount, class: 'text-green-400' })
	);
}