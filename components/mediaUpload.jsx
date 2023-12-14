import { useRef } from 'react';

let canvas, ctx, useCanvasRef = 0;

let imageHeight, y1, y2;

export default function Img(callback, forProduct) {
 const canvasRef = useRef(null);
 const inputRef = useRef(null);
 const buttonRef = useRef(null);
 
 const width = forProduct && forProduct.width || 150;
 
 const height = forProduct && forProduct.height || width;

 function renderOnCanvas(e) {
  /**
   * I am recreating the canvas every time because
   * A canvas becomes tainted if it contains data loaded from external sources that aren't served with the appropriate Cross-Origin Resource Sharing (CORS) headers.

   * In this case, if I try to use toBlob on a canvas that has been tainted, the operation would not be allowed.
  */
  let canv = document.createElement('canvas');
  canv.width = width;
  canv.height = height;
  
  ctx = canv.getContext("2d");
  
  canv.addEventListener('pointerdown', function(ev) {
   y1 = ev.clientY;
  });
  
  if(!useCanvasRef) {
   canvasRef.current.parentElement.replaceChild(canv, canvasRef.current);
   useCanvasRef++;
  } else {
   canvas.parentElement.replaceChild(canv, canvas);
  }
  
  canvas = canv;
  const img = new Image();
  
  img.src = typeof e === 'string' ? e : e.target.result;
 
  img.addEventListener('load', function() {
   imageHeight = img.height * (width / img.width);
 
   y2 = 0; //width > imageHeight ? 0 : -((width / 3) * 2) / 2;
   
   canvas.addEventListener('pointermove', function(ev) {
    y2 += Math.min(2, -(y1 - ev.clientY));
   
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, y2, width, imageHeight);
   });
   
   ctx.clearRect(0, 0, width, height);
   ctx.drawImage(img, 0, y2, width, imageHeight);

   if(typeof e !== 'string' && !forProduct) {
    inputRef.current.previousElementSibling.addEventListener('click', () => callback.call(inputRef.current, canvas, buttonRef.current), { once: true });
    inputRef.current.style.display = 'none';
   }
   
   forProduct && callback(canvas);
  });
 }
 
 const input = <input ref={inputRef} className="absolute top-0 left-0 h-full opacity-0" type="file" name="photoUrl" onChange={(e) => {
    const file = e.target.files[0];

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
   }} />;
 
 return {
  ImageUpload: (
   <div className="flex flex-col items-center">
    <div className={ "mt-6 mx-auto bg-7 overflow-hidden" + (forProduct ? '' : ' rounded-full') }>
     <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
    <button className="relative p-1 px-3 text-sm font-bold bg-gray-700 text-gray-100 rounded-lg mt-2 overflow-hidden" type="button">
     <span ref={buttonRef}>Upload image</span>
     {input}
    </button>
   </div>
  ),
  renderImage: renderOnCanvas
 }
}