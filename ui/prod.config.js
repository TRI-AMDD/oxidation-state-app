const { defineConfig } = require('cypress')

module.exports = defineConfig({
        projectId:'ag5qdq',
      
        chromeWebSecurity: false,
      
        'cypress-cucumber-preprocessor': {
      
          nonGlobalStepDefinitions: true,
      
          step_definitions: './cypress/e2e/**/*.feature',
      
        },

    e2e: {
        ENV: "prod",
        baseUrl: 'https://oxi.matr.io/',
        setupNodeEvents(on, config) {

            return require('./cypress/plugins/index.js')(on, config)
      
          },
      
          //retries: 1,
      
          testIsolation: false,
      
          specPattern: 'cypress/e2e/**/*.feature',
          supportFile: 'cypress/support/commands.js',
      
        },
      
      })