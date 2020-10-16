/* eslint-disable indent */

export const notifier = (() => {
  return {
    isGranted: Notification.permission === "granted",
    requestPermission: async function () {
      switch (Notification.permission) {
        case "granted":
          return Promise.resolve("granted");
        case "denied":
          return Promise.reject("denied");
        default:
          await Notification.requestPermission();
          return this.requestPermission();
      }
    },
    notify: async function (message) {
      try {
        await this.requestPermission();
        new Notification(message);
      } catch (error) {
        // do nothing
      }
    },
  };
})();
