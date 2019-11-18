const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

export const registerServiceWorkers = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      navigator.serviceWorker.register("/sw.js");
      await requestNotificationPermission();
      await navigator.serviceWorker.register(`/serviceWorker.js?v=${VERSION}`);
      // navigator.serviceWorker.controller.postMessage({ hello: "world" });
    });
  }
};
