const { defineConfig } = require('cypress')

module.exports = defineConfig({

  projectId:'ag5qdq',

  'cypress-cucumber-preprocessor': {

    nonGlobalStepDefinitions: true,

    step_definitions: './cypress/e2e/**/*.feature',

  },

  e2e: {

    baseUrl: 'https://oxi.matr.io/',
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalSkipDomainInjection: [ '*.matr.io'],

    setupNodeEvents(on, config) {

      return require('./cypress/plugins/index.js')(on, config)

    },

    specPattern: 'cypress/e2e/**/*.feature',

    supportFile:false

  },

})

