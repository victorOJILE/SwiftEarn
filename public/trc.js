
document.addEventListener('DOMContentLoaded', function() {
 const aff_id = Array.from(document.querySelectorAll('a')).find(link => link.classList.contains('_swiftearn_aff_')).dataset.aff_id;
 
 fetch('https://swiftearn.com/analytics?visits', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    aff_id,
    url: window.location.href,
    timestamp: Date.now()
   })
  })
  .catch(e => null);

 function sendClickData(url, aff_id) {
  const data = JSON.stringify({
   url,
   aff_id,
   timestamp: Date.now()
  });

  if (navigator.sendBeacon) {
   // Use Beacon API if supported by the browser
   navigator.sendBeacon('https://swiftearn.com/analytics?clicks', data);
   window.location.href = url;
  } else {
   fetch('https://swiftearn.com/analytics?clicks', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
     },
     body: data
    })
    .then(() => window.location.href = url)
    .catch((error) => null);
  }
 }

 // Add a click event listener to all links with class "_swiftearn_aff_"
 document.addEventListener('DOMContentLoaded', function() {

  const affiliateLinks = document.querySelectorAll('._swiftearn_aff_');
  
  affiliateLinks.forEach(link => {
   link.addEventListener('click', function(event) {
    event.preventDefault();

    // Call the function to send click data to the server
    sendClickData(event.currentTarget.href, event.currentTarget.dataset.aff_id);
   });
  });
 });
});