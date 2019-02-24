# js-overrides
Collection of Javascript Overrides for webs to be used with Chrome extension Custom Javascript for Websites 2

# YouTube
- Volume change using mouse wheel
- Header is hidden, and appear when mouse is move to the top
- Left Click + Wheel Click, makes header to be visible (usable when needed to use filter controls)
- Video player in Cinema mode, acts as fullbrowser mode, will resize videoplayer to the entire available space in the window (pushing down comments and description box)

# Google Dark
Tries to change all the elements for google to be dark. As the css of google is so poorly done, (I only imagine is for backwards compatible to Mozaic and so :P ), and the background color is set thousands of times, for each component, every time they add new components, this are with white color. I try to keep this update, but there are component that I never use, so there is that.
The ideal solution would be like google get notice of this, and does a fricking dark mode of their own, as they done for YouTube.
I use applied to the following regexp: `https://www.\.google.*`

# How to use these
First you should [Install Custom Javascript for Websites 2](https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk) or something similar. I recommend this one as it store the modifications on the synchronised storage, so changes are applied among all your computers (except mobiles at 02/2019).
Then there is 2 options you can use, first one is safer, as using option 2, and my account gets hacked and someone changes the scripts you might be in some trouble, so don't hack my account please, don't be that guy/gal.

## Option One
Copy content of file, open CJS on the wanted domain and paste the content, save and enjoy.

## Option two
Keep it updated. It might be risky for you if I get hacked!.

Paste the following code in CJS, in the wanted domain, **and change** `<JAVASCRIPT_FILENAME>` for the one you want.

**VERY IMPORTANT NOTE, PLEASE READ:** CHANGE THE `<JAVASCRIPT_FILENAME>` FOR THE FILE NAME OF OVERRIDES YOU WANT.

:point_up: ☝ **DON'T COPY PASTE LIKE AN IDIOT, READ FIRST.** :point_up: ☝ ️
```
(() => {
  var URL = 'https://cdn.jsdelivr.net/gh/danyg/js-overrides/<JAVASCRIPT_FILENAME>'
  var s=document.createElement('script');
  s.src=URL;
  s.async=true;
  s.type='text/javascript';
  document.head.appendChild(s);
})();
```
The `JAVASCRIPT_FILENAME` in line 2 could be:
- [youtube.js](https://cdn.jsdelivr.net/gh/danyg/js-overrides/youtube.js)
- [google-dark.js](https://cdn.jsdelivr.net/gh/danyg/js-overrides/google-dark.js)
