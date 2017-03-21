var path = require('path');
var uuid = require('node-uuid');
var chai = require('chai');
var argv = Object.assign(require('minimist')(process.argv));

module.exports.config = {
     specs: [
        './test.js'
    ],

    host: 'beta.perfectomobile.com',
    path: '/nexperience/perfectomobile/wd/hub',
    port: 80,    

    capabilities: [{
        framework: "XCUITest",        
        app: argv.app, 
        bundleId: argv.bundleId,               
        platformName: 'iOS',
        browserName: 'mobileOS',
        deviceName: argv.deviceName,
        processArguments: '{ "args": ["'+uuid.v4()+'"] }',           
        autoLaunch: false,
        noReset : true,
        user: argv.user,
        password: argv.password,
    }],

    maxInstances: 1,

    sync: true,

    logLevel: 'silent',

    coloredLogs: true,

    screenshotPath: 'screenshots/',

    baseUrl: 'http://localhost',

    waitforTimeout: 30000,

    connectionRetryTimeout: 900000,

    connectionRetryCount: 0,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 3000000
    },

    reporters: ['dot'],

    before: function (capabilities, specs) {
        global.expect = chai.expect;
        console.log("running test on iOS")
        const deviceId = JSON.parse(capabilities.processArguments).args[0];
        console.log("using device id from processArguments capability - " + deviceId);
        browser.testDeviceId = deviceId;
    }
};
