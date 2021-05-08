/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//
// }

const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
    on('task', {
        deleteFile(fileName) {

            const fs = require('fs').promises;

            const directory = 'cypress/downloads';

            fs.rmdir(directory, { recursive: true })
                .then(() => console.log('directory removed!'));
            return null;

        }
    });
    initPlugin(on, config);
    require('@cypress/code-coverage/task')(on, config)
    return config;
};