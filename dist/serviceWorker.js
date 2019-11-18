let currentVersion;

self.addEventListener('install', event => {
  currentVersion = new URL(location).searchParams.get('v');
  console.log('currentVersion is ', currentVersion);
});

setInterval(async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/teomrd/miropad/master/package.json"
    );
    const { version } = await res.json();
    console.log("Latest Version", version);
    console.log('Current Version is ', currentVersion);
  } catch (error) {
    console.log("error", error);
  }
}, 5000);
