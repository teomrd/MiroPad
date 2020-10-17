/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([{"revision":"c7ca344326c00d82091b9eb8be78e01e","url":"027d64fdd2420b538565c80a718f404d.svg"},{"revision":"a69f752fafc2a5f161dbc1c851d4f17b","url":"0996012722226f7380a9e2c486b3e8e8.svg"},{"revision":"642881591601125261f78f3ad5a52c32","url":"1474c04b6cf11f1ebaee773127b3fbee.svg"},{"revision":"7b5b191c36d9d1033ae720febcbd94a0","url":"175c3b43f0ecfe155236689749515db7.svg"},{"revision":"41be43627587fa71a315c9a1d2565283","url":"1cf7b95b90b67c0c8757b511917a9094.svg"},{"revision":"7665092453f7b45c2782db5f16e6ce5c","url":"39bd5df9a07b6debeffb5552048005ee.svg"},{"revision":"f8fc1cc37e1226392cc0cc4c6068cf66","url":"43d84888bd092265756f626eec18683e.svg"},{"revision":"126653c706df1e5655be880ddc02e164","url":"45c483b24c7d633ec4f3a1957ca6a1f3.svg"},{"revision":"2694687077344bc31a1968ce3329660b","url":"4a67b5407e5b2e50f3d387be879212f2.svg"},{"revision":"abef7b4a2eb95c594f45063c3fe372eb","url":"653f096146f8e8fa5c4300c20f1a3919.svg"},{"revision":"08cc87504b693a32d717aaaf13e414a0","url":"7f85e17a9c1e74fb7dfc91fafad96b45.svg"},{"revision":"715ea2f9ed9c32e912d10f1f8cfd1333","url":"8ad0673131c02cc33db0bf297177a27e.svg"},{"revision":"299ddb01bcee73f853049f4ca36e9dc8","url":"933e99a31689bc8c156b4e3a900f0cd6.svg"},{"revision":"d26a9edb2928bbeba1749f454aab95d3","url":"96310b13590780e075194218d2cb0b5d.svg"},{"revision":"1c74f8e5f212764756b46b728d31a97f","url":"9b6b1038afbbfb7751430ad9ae3d9cd6.svg"},{"revision":"b399e36fdd1b4597c9c5036c6a4869f8","url":"a02a8db81c862fbcb3b4071105c7b104.svg"},{"revision":"4e1ab5abca803d8371db0bac365fdf93","url":"ba6e9ad7a7ce64fd8cedcb6f33255707.svg"},{"revision":"1eccb57fd8613bb74b8394400b7b1b1f","url":"bd70845f8334ae5f31e17525d5b05ed0.svg"},{"revision":"fd02fe115943662aa6a6581ab31ce38d","url":"edcc866ae509343cd94e47181c7238ac.svg"},{"revision":"7cdfed241e2edb7e7ed37eaaf9bae94a","url":"favicon.ico"},{"revision":"59b2a5f4e0884d7c2d4e2324e3727ecc","url":"images/icons/icon-128x128.png"},{"revision":"77b08750ba54d3a8f21f331d04530637","url":"images/icons/icon-144x144.png"},{"revision":"84cb614c066d965f784c2ed810dc31e1","url":"images/icons/icon-152x152.png"},{"revision":"2f95a518fbfc169e32fd5fb7a5b063fd","url":"images/icons/icon-192x192.png"},{"revision":"87029203db3903aab4be829b030b3514","url":"images/icons/icon-384x384.png"},{"revision":"ad2869f40002d4f268f6b60a0c115136","url":"images/icons/icon-512x512.png"},{"revision":"e70a2704695d7026ab6fe403f4604867","url":"images/icons/icon-72x72.png"},{"revision":"0bfc17b6ea552774646836236d7e5954","url":"images/icons/icon-96x96.png"},{"revision":"79e59607337b1e6a34e0935965ad4d21","url":"images/icons/maskable_icon.png"},{"revision":"0b35299332614eb238daf8d3d6dedc1e","url":"index.html"},{"revision":"54f010ad49b8e8462a02cbbbc8836db6","url":"main.js"},{"revision":"7b5abf852202f8a8ceea367c80e2d993","url":"manifest.json"}]);

const checkForNewerVersion = (
  currentVersion = new URL(location).searchParams.get("v")
) => {
  const intervalChecker = setInterval(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/teomrd/miropad/gh-pages/version",
        {
          cache: "no-cache",
        }
      );
      const version = await res.text();
      if (currentVersion.trim() !== version.trim()) {
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
  console.log("install");
  checkForNewerVersion();
});

self.addEventListener("activate", () => {
  console.log("activate");
  checkForNewerVersion();
});

self.addEventListener("fetch", function (fetchEvent) {
  if (fetchEvent.request.url.includes("download")) {
    var filename = "Untitled.txt";
    var fileBody = "some data";
    var response = new Response(fileBody, { status: 200, statusText: "ok" });
    response.headers.append(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    fetchEvent.respondWith(Promise.resolve(response));
  }
});
