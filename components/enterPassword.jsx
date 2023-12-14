import { useState, memo } from 'react';

const lockIcon = <svg stroke="darkslategray" fill="darkslategray" strokeWidth="0" viewBox="0 0 448 512" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg">
<path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" /></svg>;

const eyeOpen = <svg className="w-5 hidden" focusable="false" viewBox="64 64 896 896" title="Hide password"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
<path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" /></svg>;

const eyeClose = <svg className="w-5" focusable="false" viewBox="64 64 896 896" title="View password">
<path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" />
<path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" /></svg>;


const PasswordInput = memo(function PasswordInput({ value, setData, children }) {
	const [eyeView, setEyeView] = useState(false);
	
	function toggleEye(e) {
		e.target.addEventListener('click', function() {
			for (let eye of e.target.children) {
				eye.classList.toggle('hidden');
			}
			setEyeView(prev => !prev);
		});
	}

	return (
		<div>
			<label className="font-bold text-sm" htmlFor="password">Password:</label>
			<br />
			<div className="flex items-center bg-white mt-1">
				<div className="w-10 pl-2 border-r-2">
					{lockIcon}
				</div>
				<input className="bg-white w-3/4 p-3 text-sm" type={ eyeView ? 'text' : 'password' } name="password" id="password" pattern=".[A-Za-z0-9]{8,35}" placeholder="abcABC123#$&" value={value} onInput={setData} required />
				<span className="flex items-center px-4 eyeicon" onClick={toggleEye}>
					{eyeOpen}{eyeClose}</span>
			</div>
			{children}
		</div>
	);
});

export default PasswordInput;