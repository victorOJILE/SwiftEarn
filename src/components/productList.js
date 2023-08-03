export default function generateList(product) {

	return cEl('li', { class: 'grid grid-cols-7 md:grid-cols-1 border-b-2 border-gray-400 py-4' },
		cEl('div', { class: 'col-span-2 p-3 md:p-0' },
			cEl('img', { src: '/static/images/' + product.imgsrc || '' })
		),
		cEl('div', { class: 'col-span-5 py-2 pr-2' },
			cEl('a', { class: 'pr-1', href: product.href || './marketplace/product.html' },
				cEl('h3', { class: 'font-bold line-clamp text-xs sm:text-sm', textContent: product.title || '' }),
				cEl('p', { class: 'text-gray-400 text-xs sm:text-sm', textContent: product.vendor || '' }),
				cEl('div', { class: 'text-xs' },
					cEl('span', { class: 'font-bold', textContent: product.currentPrice || '' }),
					cEl('span', { class: 'px-2 text-gray-400' },
						cEl('span', { textContent: '|' })
					),
					cEl('span', { class: 'text-yellow-600', textContent: (product.commission || '') + '% comm' })
				),
				cEl('button', { class: 'bg-green-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded', textContent: 'Promote' })
			)
		)
	);
}