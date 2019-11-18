import main from "./js/main";
import { registerServiceWorkers } from "./js/serviceWorkers";

(() => {
  console.log("VERSION: ", VERSION);
  main();
  registerServiceWorkers();
})();
