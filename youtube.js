(function() {
	const TOPLAYER = '#page-manager';
	const TRANS_TIME = '333';
	const LEFT_BUTTON = 0b0001;
	const RIGHT_BUTTON = 0b0010;
	const WHEEL_BUTTON = 0b0100;
	const STEP = 5;
	const videoSelector = '.html5-main-video';
	const videoPlayerAPISelector = '.html5-video-player';
	const containerSelector = '.html5-video-container';
	let CV_STYLE = `
	#masthead-container { opacity: 0; transition: opacity ${TRANS_TIME}ms !important; }
	.custom-volume--normal #masthead-container,
	#masthead-container:hover{ opacity:1; }
	${TOPLAYER} { margin-top: 0px !important; transition: margin 333ms; }
	.custom-volume--normal ${TOPLAYER} { margin-top: 56px !important; }
	.html5-video-container { height: 100%; }
	ytd-watch-flexy[theater] #player-theater-container.ytd-watch-flexy, ytd-watch-flexy[fullscreen] #player-theater-container.ytd-watch-flexy { height: 100vh !important; max-height: 100vh; min-height: 10px !important; }
	.html5-video-container video { left: initial !important; width: 100% !important; height: 100% !important; top: 0 !important;}
	.ytp-gradient-bottom {opacity: 0 !important;}
	.ytp-gradient-top {opacity: 0 !important;}
	.custom-vol__OSD {
		position: absolute;
		opacity: 0;
		transition: opacity 333ms;
		background: transparent;
		color: yellow;
		text-shadow: 2px 2px 5px rgba(0,0,0,.6);
		font: normal 16px/20px "Trebuchet MS", Sans-Serif;
		text-align: right;
		right: 20px;
		top: 10px;
		z-index: 20000
	}
	.is-hidden {display:none !important;}
	/* SCROLL BAR */
	:not([hide-scrollbar]) ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); background-color: #222; }
	:not([hide-scrollbar]) ::-webkit-scrollbar { width: 6px; }
	:not([hide-scrollbar]) ::-webkit-scrollbar-thumb { background-color: #444; }
	`;
	if (window._OVERRIDE_OPTIONS && window._OVERRIDE_OPTIONS.POST_VIDEO_ELEMENTS_REMOVED) {
		CV_STYLE += '.ytp-ce-element { display: none !important; }';
	}

	const isOn = (bit) => (data) => (bit & data) === bit;
	const isLeftButtonOn = isOn(LEFT_BUTTON);
	const isRightButtonOn = isOn(RIGHT_BUTTON);
	const isWheelButtonOn = isOn(WHEEL_BUTTON);

	const classToggle = (el) => (cN) => el.classList.contains(cN) ? el.classList.remove(cN) : el.classList.add(cN);

	const addStyle = (styleTxt) => {
		var s = document.createElement('style');
		s.type = 'text/css';
		s.innerHTML = styleTxt;
		document.body.appendChild(s);
	};

	const osdWriter = ({osd, osdTimer}) => (msg) => {
		clearTimeout(osdTimer);
		osd.style.display = 'block';
		if(parseFloat(osd.style.opacity) === 0) {
			osd.style.opacity = '1';
		}

		osd.innerHTML = msg;

		osdTimer = setTimeout(() =>{
			osd.style.opacity = '0';
			osdTimer = setTimeout(() => {
				osd.style.display = 'none';
				osd.innerHTML = '';
			}, 500);
		}, 1000)
	}

	const onReady = (cbk) => {
		let h = false;
		const protCbk = () => {
			if(!h) {
				h = true;
				cbk();
			}
		}
		const checkReadyState = () => {
			if(document.readyState === 'interactive' || document.readyState === 'complete') {
				protCbk();
			}
		}
		document.addEventListener('readystatechange', protCbk);
		document.addEventListener('DOMContentLoaded', protCbk);
		checkReadyState();
	}

	const addMouseShortcutsBehaviour = () => {
		let prevent = false;
		const preventIt = (e) => {
			prevent = true;
			e.preventDefault();
			return false;
		}
		document.addEventListener('mousedown', (e) => {
			if(isLeftButtonOn(e.buttons) && isWheelButtonOn(e.buttons)) {
				const pm = document.body;
				classToggle(pm)('custom-volume--normal');
				preventIt(e);
			}
			if(isLeftButtonOn(e.buttons) && isRightButtonOn(e.buttons)) {
				document.querySelectorAll('.ytp-ce-element').forEach((el) => classToggle(el)('is-hidden'))
				preventIt(e);
			}
		 });
		 document.addEventListener('mouseup', (e) => {
			 if (prevent) {
				 e.preventDefault();
				 prevent = false;
				 return false;
			 }
		 });
	}

	// SCRIPT INIT
	addStyle(CV_STYLE);
	const start = () => {
		const video = () => document.querySelector(videoSelector);
		const videoPlayerApi = () => document.querySelector(videoPlayerAPISelector);
		const container = document.querySelector(containerSelector);

    if (!video || !videoPlayerApi || !container) return setTimeout(start, 100);

		// OSD Init
		const osd = document.createElement('div');
		osd.className = 'custom-vol__OSD';
		container.appendChild(osd);
		let osdTimer;
		const writeOSD = osdWriter({osd, osdTimer});

		addMouseShortcutsBehaviour();

		video().style.left = 'initial';

		function getVolume() {
			let ytVol = null;
			let cVVol = null;
			try {
				ytVol = parseInt(JSON.parse(JSON.parse(localStorage.getItem('yt-player-volume')).data).volume);
			} catch(e){}
			if (localStorage.hasOwnProperty('#customVol')) {
				const customVol = localStorage.getItem('#customVol');
				cVVol = parseInt(localStorage.getItem('#customVol'));
			}
			let vol = 50;
			if (ytVol !== null && ytVol !== cVVol) {
				vol = ytVol;
			} else if (cVVol !== null) {
				vol = cVVol;
			}
			return vol;
		}

		const saveYtVol = (v) => {
			let base = localStorage.getItem('yt-player-volume');
			if (base) {
				base = base.replace(/volume\\":(\d+),/, `volume\\":${v},`);
				localStorage.setItem('yt-player-volume', base);
			}
		}
		const setVolume = (v, showIt) => {
			showIt = showIt === undefined ? true : showIt;
			v = v>100?100:v<0?0:v;
			videoPlayerApi().setVolume(v);
			saveYtVol(v);
			localStorage.setItem('#customVol', v);
			showIt ? writeOSD(Math.floor(v) + '%') : '';
		}

		video().addEventListener('wheel', (e) => {
			const direction = e.deltaY < 0 ? 1 : -1;
			const step = e.ctrlKey ? 1 : STEP;
			try {
				setVolume(getVolume() + (step * direction));
			} catch(e){}
			e.preventDefault();
			return false;
		});
		setVolume(getVolume());

		window.scroll(0,0);
	};
	onReady(start);
})();
