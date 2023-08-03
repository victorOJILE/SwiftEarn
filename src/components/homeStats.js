export default function homeAnalytics(data) {
	let user;
	return cEl('div', 
		{ class: 'grid sm:grid-cols-2 gap-4 my-6 rounded-lg' },
		cEl('div', {},
			cEl('h2', { class: 'text-xl color4 font-special mt-2', textContent: 'Affiliate Total Earning:' }),
			cEl('div', { class: 'bg-blue-900 py-4 px-6 rounded-xl' },
				cEl('span', { class: 'text-2xl text-gray-100 font-bold', textContent: '$3,600' + '💸' }),
				cEl('br'),
				cEl('div', { class: 'text-gray-400' },
					cEl('span', { class: 'text-xs', textContent: 'Last updated:' + '4hrs' })
				),
			)
		),
		user && cEl('div', {},
			cEl('h2', { class: 'text-xl color4 font-special mt-2', textContent: 'Product Sales Earning:' }),
			cEl('div', { class: 'bg-blue-900 py-4 px-6 rounded-xl' },
				cEl('span', { class: 'text-2xl text-gray-100 font-bold', textContent: '$750' + '💸' }),
				cEl('br'),
				cEl('div', { class: 'text-gray-400' },
					cEl('span', { class: 'text-xs', textContent: 'Last updated:' + '4hrs' })
				),
			)
		) || '',
		!user && cEl('div', {},
			cEl('h2', { class: 'text-xl color4 font-special mt-2', textContent: 'Weekly Affiliate Earning:' }),
			cEl('div', { class: 'bg-blue-900 py-4 px-6 rounded-xl' },
				cEl('span', { class: 'text-2xl text-gray-100 font-bold', textContent: '$150' + '💸' }),
				cEl('br'),
				cEl('div', { class: 'text-gray-400' },
					cEl('span', { class: 'text-xs', textContent: 'Last updated:' + '4hrs' })
				),
			)
		) || ''
	);
}