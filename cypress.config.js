const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      "USERNAME": "ChrisTest",
      "PASSWORD": "Pass1234!",
      "API_BASE_URL": "https://api.demoblaze.com"
    },
    baseUrl: "https://www.demoblaze.com",
    failOnStatusCode: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter'
  },
  reporterOptions: {
    charts: true,
    reportPageTitle: 'demoblaze-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  }
});
