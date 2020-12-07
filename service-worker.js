/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([{"revision":"715ea2f9ed9c32e912d10f1f8cfd1333","url":"checkmark-circle.IG4YFITL.svg"},{"revision":"642881591601125261f78f3ad5a52c32","url":"cloud-sync.LGORKJTE.svg"},{"revision":"7b5b191c36d9d1033ae720febcbd94a0","url":"cloud-upload.WUMUDSOF.svg"},{"revision":"f8fc1cc37e1226392cc0cc4c6068cf66","url":"download.UXGLRYO4.svg"},{"revision":"08cc87504b693a32d717aaaf13e414a0","url":"enter-down.GJQCIYUE.svg"},{"revision":"a69f752fafc2a5f161dbc1c851d4f17b","url":"envelope.NA4RULZ7.svg"},{"revision":"7665092453f7b45c2782db5f16e6ce5c","url":"exit-up.RSOAVPSH.svg"},{"revision":"fd02fe115943662aa6a6581ab31ce38d","url":"frame-expand.BLE6SD4I.svg"},{"revision":"59b2a5f4e0884d7c2d4e2324e3727ecc","url":"images/icons/icon-128x128.png"},{"revision":"77b08750ba54d3a8f21f331d04530637","url":"images/icons/icon-144x144.png"},{"revision":"84cb614c066d965f784c2ed810dc31e1","url":"images/icons/icon-152x152.png"},{"revision":"2f95a518fbfc169e32fd5fb7a5b063fd","url":"images/icons/icon-192x192.png"},{"revision":"87029203db3903aab4be829b030b3514","url":"images/icons/icon-384x384.png"},{"revision":"ad2869f40002d4f268f6b60a0c115136","url":"images/icons/icon-512x512.png"},{"revision":"e70a2704695d7026ab6fe403f4604867","url":"images/icons/icon-72x72.png"},{"revision":"0bfc17b6ea552774646836236d7e5954","url":"images/icons/icon-96x96.png"},{"revision":"79e59607337b1e6a34e0935965ad4d21","url":"images/icons/maskable_icon.png"},{"revision":"59b2a5f4e0884d7c2d4e2324e3727ecc","url":"images/images/icons/icon-128x128.png"},{"revision":"77b08750ba54d3a8f21f331d04530637","url":"images/images/icons/icon-144x144.png"},{"revision":"84cb614c066d965f784c2ed810dc31e1","url":"images/images/icons/icon-152x152.png"},{"revision":"2f95a518fbfc169e32fd5fb7a5b063fd","url":"images/images/icons/icon-192x192.png"},{"revision":"87029203db3903aab4be829b030b3514","url":"images/images/icons/icon-384x384.png"},{"revision":"ad2869f40002d4f268f6b60a0c115136","url":"images/images/icons/icon-512x512.png"},{"revision":"e70a2704695d7026ab6fe403f4604867","url":"images/images/icons/icon-72x72.png"},{"revision":"0bfc17b6ea552774646836236d7e5954","url":"images/images/icons/icon-96x96.png"},{"revision":"79e59607337b1e6a34e0935965ad4d21","url":"images/images/icons/maskable_icon.png"},{"revision":"e2633d224d3c0cac7eaecd4af338c614","url":"index.html"},{"revision":"85488dce5b7a3d6befc5419c9ee583fc","url":"index.js"},{"revision":"4e1ab5abca803d8371db0bac365fdf93","url":"lighter.OZSFQPBU.svg"},{"revision":"2694687077344bc31a1968ce3329660b","url":"list.YMZJDUX7.svg"},{"revision":"b399e36fdd1b4597c9c5036c6a4869f8","url":"magic-wand.UXY4WMEN.svg"},{"revision":"7b5abf852202f8a8ceea367c80e2d993","url":"manifest.json"},{"revision":"126653c706df1e5655be880ddc02e164","url":"page-break.B3CAPK4X.svg"},{"revision":"d26a9edb2928bbeba1749f454aab95d3","url":"pencil.7VBUJCK5.svg"},{"revision":"1c74f8e5f212764756b46b728d31a97f","url":"picture.2JEZTBRR.svg"},{"revision":"299ddb01bcee73f853049f4ca36e9dc8","url":"printer.PUGRUPDW.svg"},{"revision":"1eccb57fd8613bb74b8394400b7b1b1f","url":"rocket.GLIQYS2T.svg"},{"revision":"41be43627587fa71a315c9a1d2565283","url":"spell-check.BKL7S4GU.svg"},{"revision":"abef7b4a2eb95c594f45063c3fe372eb","url":"trash.7KDMOP7R.svg"}]);

const checkForNewerVersion = (currentVersion) => {
  const intervalChecker = setInterval(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/teomrd/miropad/gh-pages/version",
        {
          cache: "no-cache",
        }
      );
      const version = await res.text();
      if (currentVersion !== version.trim()) {
        self.registration.showNotification("✍️ MiroPad has been updated", {
          body: `Version ${version} is available, refresh to update!`,
        });
        clearInterval(intervalChecker);
      }
    } catch (error) {
      self.registration.showNotification("✍️ MiroPad Error", {
        body: error.message,
      });
    }
  }, 5000);
};

self.addEventListener("install", () => {
  const currentVersion = new URL(location).searchParams.get("v");
  checkForNewerVersion(currentVersion.trim());
});
