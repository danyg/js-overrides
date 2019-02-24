# js-overrides
Collection of Javascript Overrides for webs to be used with Chrome extension Custom Javascript for Websites 2

#HOW TO
## Option One
Copy content of file, open CJS on the wanted domain and paste the content, save and enjoy

## Option two
Keep it updated
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
The `URL` in line 2 could be:
https://cdn.jsdelivr.net/gh/danyg/js-overrides/youtube.js
https://cdn.jsdelivr.net/gh/danyg/js-overrides/google-dark.js
