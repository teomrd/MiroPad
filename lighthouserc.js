module.exports = {
  ci: {
    collect: {
      staticDistDir: "./out",
    },
    upload: {
      target: "temporary-public-storage",
    },
    // assert: {
    //   preset: "lighthouse:recommended",
    // },
  },
};