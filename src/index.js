import main from "./js/main";

(() => {
  console.log('VERSION: ', VERSION); // eslint-disable-line
  main();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(registration => console.log("SW registered: ", registration))
        .catch(registrationError =>
          console.log("SW registration failed: ", registrationError)
        );

      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(registration => console.log("SW registered: ", registration))
        .catch(registrationError =>
          console.log("SW registration failed: ", registrationError)
        );
    });
  }
})();
