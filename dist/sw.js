/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
);

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉");

  workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.ico",
    "revision": "7cdfed241e2edb7e7ed37eaaf9bae94a"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "59b2a5f4e0884d7c2d4e2324e3727ecc"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "77b08750ba54d3a8f21f331d04530637"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "84cb614c066d965f784c2ed810dc31e1"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "2f95a518fbfc169e32fd5fb7a5b063fd"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "87029203db3903aab4be829b030b3514"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "ad2869f40002d4f268f6b60a0c115136"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "e70a2704695d7026ab6fe403f4604867"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "0bfc17b6ea552774646836236d7e5954"
  },
  {
    "url": "index.html",
    "revision": "cab212c143d34037ab0b640362bce03f"
  },
  {
    "url": "manifest.json",
    "revision": "1902079dc63081da4f976d545c3d896e"
  }
]);
} else {
  console.log("Boo! Workbox didn't load 😬");
}
