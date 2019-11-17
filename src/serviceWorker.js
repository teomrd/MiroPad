setInterval(async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/teomrd/miropad/master/package.json"
    );
    const { version } = await res.json();
    console.log("version", version);
  } catch (error) {
    console.log("error", error);
  }
}, 2000);
