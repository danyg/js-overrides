// Here You can type your custom JavaScript...
if(window.location.toString().indexOf('https://www.google.es/maps') === -1) {
    injectDarkStyles();
}

function injectDarkStyles() {
	var s = document.createElement('style');
	s.type = 'text/css';
	s.innerHTML = `
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #222;
	}
	::-webkit-scrollbar {
		width: 6px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #444;
	}

	body {
		background: #222;
		color: #aaa;
	}
	body * {
		color: #aaa !important;
		border-color: #333;
		background: transparent;
	}
	a,
	body a,
	body * a,
	body .vk_bk,
	body .w8qArf .fl,
	body a.myLink,
	body * a.myLink {
		color: skyblue !important;
		background-color: transparent !important;
	}
	a:hover,
	body a:hover,
	body * a:hover{
	/* background-color: #666 !important; */
	}

	a *,
	body a *,
	body * a *,
	a *:hover,
	body a *:hover,
	body * a *:hover
	{
		background-color: transparent !important;
	}

	.jhp input[type="submit"], .sbdd_a input, .gbqfba {
		background: #333 !important;
		border-color: #333;
		color:#aaa !important;
	}
	*[role=button] {
		background: #333 !important;
		border-color: #333;
	}
	.jhp input[type="submit"]:hover, .sbdd_a input:hover, .gbqfba:hover {
		background: #555;
		color:#fff;
	}
	#fbar,.fbar {
		background: #222;
		color: #aaa;
		border-color: #333;
	}
	#gb#gb a.gb_b,
	#gb#gb a.gb_P, #gb#gb span.gb_P {
		color: #aaa;

	}
	.gb_ka {
		background: #333;
		color: #aaa;
	}
	.gb_b.gb_5b{filter: invert(100%);}
	.gstl_0.sbib_a {
		background: #444;
	}
	.sbico-c,
	.sbdd_b {
		background: #222;
		border-color: #333;
	}
	.sbsb_a {background: transparent;}
	.sfbgg,
	.sfbgx,
	body .minidiv .sfbg {
		background: #2a2a2a !important;
		border-color: #444 !important;
	}
	body .aajZCb,
	body .RNNXgb {
		background: #555;
		border-color: #333;
	}
	#top_nav {
		background: #2a2a2a !important
	}
	#appbar,
	#sfdiv,
	#top_nav *{background: #2a2a2a !important;}
	#hdtb {border-color: #333;}
	.ab_dropdown {background: #222 !important;}
	.gb_la.gb_5e {background: #2a2a2a;}
	[role="region"] {border-color: #111;background: transparent;}
	.gb_lb{border-bottom-color: #111}
	g-menu {background: #222 !important;}
	._xdb a.fl {color: #aaa !important;}
	.vk_aru,.vk_ard {background-color: rgba(0,0,0,.2) !important;}
	.vk_aru:before, .vk_ard:before {border-top-color: rgba(0,0,0,.2) !important;}
	._tX {color: skyblue !important;}
	.gws-local-map__map-expando img {filter: invert(80%);}
	._OKe, .card-section { background-color: #2a2a2a !important; }
	._OKe *, .card-section * {color: #aaa !important;}
	.cwtlwm {background: transparent !important;}
	span.cwbts {color: #333 !important;}
	select,
	body select,
	body * select,
	select:hover,
	body select:hover,
	body * select:hover,
	body ._OKe select,
	body ._OKe * select,
	body ._OKe select:hover,
	body ._OKe * select:hover,
	body .card-section select,
	body .card-section * select,
	body .card-section select:hover,
	body .card-section * select:hover,
	._eif,
	.waTp2e,
	.zDBTmf>div
	{
		color: #aaa !important;
		background-color: #333;
		border-color: #222;
	}
	._eif {
		background-color: transparent !important;
	}
	`;
	document.body.appendChild(s);

}
