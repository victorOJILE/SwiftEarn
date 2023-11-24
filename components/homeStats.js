export default function homeAnalytics() {
 const totalEarning = cEl('span', { class: 'text-2xl text-gray-100 font-bold', textContent: 'Loading...' + '💸' });
 const weeklyEarning = cEl('span', { class: 'text-2xl text-gray-100 font-bold', textContent: 'Loading...' + '💸' });

 EventBus.subscribe('loaded-data', function(data) {
  totalEarning.textContent = (data.totalEarning || '$0') + ' 💸';
  weeklyEarning.textContent = (data.weeklyEarning || '$0') + ' 💸';
 });

 return cEl('div', { class: 'grid sm:grid-cols-2 gap-4 my-6 rounded-lg' },
  cEl('div', {},
   cEl('h2', { class: 'text-xl color4 font-special mt-2', textContent: 'Total Earning:' }),
   cEl('div', { class: 'bg-blue-900 py-4 px-6 rounded-xl' },
    totalEarning,
    cEl('br'),
    cEl('div', { class: 'text-gray-400' },
     cEl('span', { class: 'text-xs', textContent: 'Last updated: ' + '0min' })
    ),
   )
  ),
  cEl('div', {},
   cEl('h2', { class: 'text-xl color4 font-special mt-2', textContent: 'Weekly Earning:' }),
   cEl('div', { class: 'bg-blue-900 py-4 px-6 rounded-xl' },
    weeklyEarning,
    cEl('br'),
    cEl('div', { class: 'text-gray-400' },
     cEl('span', { class: 'text-xs', textContent: 'Last updated: ' + '0min' })
    ),
   )
  )
 );
}