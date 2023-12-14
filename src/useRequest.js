let requestQueue = [];

window.addEventListener('online', function() {
 if(requestQueue.length) {
 	iter(requestQueue, async (request) => {
 		await request();
 		requestQueue.shift();
 	});
 }
});

export default function useRequest(query, callback) {
 let loadedData;

 async function getData() {
  try {
   const res = await query;
   loadedData = true;

   callback(res);
  } catch (e) {
   !loadedData && (navigator.onLine && setTimeout(getData, 5000) || requestQueue.push(getData));
  }
 }
 getData();
}
