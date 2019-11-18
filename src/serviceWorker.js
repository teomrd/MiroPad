let currentVersion;

const checkForNewerVersion = currentVersion =>
  setInterval(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/teomrd/miropad/master/package.json"
      );
      const { version } = await res.json();
      console.log("Latest Version", version);
      console.log("Current Version is ", currentVersion);
      if (currentVersion !== version) {
        self.registration.showNotification("✍️ MiroPad has been updated", {
          body: `Version ${version} is available, refresh to update!`
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }, 5000);

// self.addEventListener("message", event => {
//   console.log(event.data); // outputs {'hello':'world'}
// });

self.addEventListener("install", () => {
  currentVersion = new URL(location).searchParams.get("v");
  console.log("currentVersion is ", currentVersion);
  checkForNewerVersion(currentVersion);
});
