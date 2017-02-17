var path = require('path');
var uuid = require('node-uuid');
var chai = require('chai');
var argv = Object.assign(require('minimist')(process.argv));

module.exports.config = {
     specs: [
        './test.js'
    ],

    capabilities: [{
        app: argv.app,        
        browserName: '',
        deviceName: 'Android',
        'device-orientation': 'portrait',
        platformName: 'Android',
        autoLaunch: false,
        noReset : true,
    }],

    port: 4723,

    sync: true,

    waitforTimeout: 30000,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 3000000
    },

    reporters: ['spec'],

    before: function (capabilities, specs) {
        global.expect = chai.expect;
        
        browser.addCommand("createTestDevice", require('./extensions/createTestDevice'), true);
        
        console.log("running test on Android")
        console.log("generating device id");
        console.log("pusing device id to file");        
        const testDeviceId = uuid.v4();
        const testId = Math.floor(Math.random() * 1000000)
        
        browser.createTestDevice(testId, testDeviceId);
        console.log("using generated device id - " + testDeviceId);

        browser.testDeviceId = testDeviceId;
    }
};
