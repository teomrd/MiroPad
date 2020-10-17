/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute(self.__WB_MANIFEST);

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
