export default function Img(callback, forProduct) {
 const width = forProduct && forProduct.width || 150;
 
 const height = forProduct && forProduct.height || width;
 
 let canvas = cEl('canvas'), ctx;
 canvas.width = width;
 canvas.height = height;
 
 let originalWidth, originalHeight, imageHeight, y1, y2;

 function renderOnCanvas(e) {
  /**
   * I am recreating the canvas every time because
   * A canvas becomes tainted if it contains data loaded from external sources that aren't served with the appropriate Cross-Origin Resource Sharing (CORS) headers.

   * In this case, if I try to use toBlob on a canvas that has been tainted, the operation would not be allowed.
  */
  let canv = cEl('canvas');
  canv.width = width;
  canv.height = height;
  ctx = canv.getContext("2d");
  
  canv.addEventListener('pointerdown', function(ev) {
    y1 = ev.clientY;
   });

  if(canvas) {
   canvas.parentElement.replaceChild(canv, canvas);
  }
  
  canvas = canv;
  const img = new Image();
  
  img.src = typeof e === 'string' ? e : e.target.result;
 
  img.addEventListener('load', function() {
   originalWidth = img.width;
   originalHeight = img.height;
 
   imageHeight = originalHeight * (width / originalWidth);
 
   y2 = 0; //width > imageHeight ? 0 : -((width / 3) * 2) / 2;
   
   canvas.addEventListener('pointermove', function(ev) {
    y2 += Math.min(2, -(y1 - ev.clientY));
   
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, y2, width, imageHeight);
   });
   
   ctx.clearRect(0, 0, width, height);
   ctx.drawImage(img, 0, y2, width, imageHeight);

   if(typeof e !== 'string' && !forProduct) {
    input.previousElementSibling.addEventListener('click', () => callback.call(input, canvas, button), { once: true });
    input.style.display = 'none';
   }
   
   forProduct && callback(canvas);
  });
 }
 
 const input = cEl('input',
 {
  class: 'absolute top-0 left-0 h-full opacity-0',
  type: 'file',
  name: 'photoUrl',
  event: {
   change() {
    const file = this.files[0];

    if (file) {
     const reader = new FileReader();

     reader.onload = () => {
      // Check the file signature to determine its type
      const arr = new Uint8Array(reader.result).subarray(0, 4);
      const header = Array.from(arr, byte => byte.toString(16)).join('').toUpperCase();

      // let type;
      if (/^(89504E47|FFD8FFDB|FFD8FFE0|47494638|424D)/.test(header)) { // if this is type 'image'
       
       const blob = new Blob([reader.result]);
       
       const reader2 = new FileReader();
       
       reader2.onload = renderOnCanvas;
       
       reader2.readAsDataURL(blob);
      } else {
       return alert('Please upload an image file of these formats: .jpg .png .gif .webp');
      }
      /* else if (header.match(new RegExp('/^52494646|000001BA|66747970|1A45DFA3|6D6F6F76|1A45DFA3/'))) {
             type = 'video';
            } else if(header.match(new RegExp('/^494433|57415645/'))) {
             type = 'audio';
            }
            */
     }
     
     reader.readAsArrayBuffer(file);
    }
   }
  }
 });
 
 const button = cEl('span', { textContent: 'Upload' });
 
 const imageUpload = cEl('div', { class: 'flex flex-col items-center' },
  cEl('div', { class: 'mt-6 mx-auto bg-7 overflow-hidden' + (forProduct ? '' : ' rounded-full') },
   canvas
  ),
  cEl('button', { class: 'relative p-1 px-3 text-sm font-bold bg-gray-700 text-gray-100 rounded-lg mt-2 overflow-hidden', type: 'button' },
   button,
   input
  )
 );
 
 return {
  imageUpload,
  renderImage: renderOnCanvas
 }
}