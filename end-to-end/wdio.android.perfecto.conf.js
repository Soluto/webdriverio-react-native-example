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
        app: argv.app,        
        appPackage: argv.appPackage,
        platformName: 'Android',
        browserName: 'mobileOS',
        deviceName: argv.deviceName,        
        autoLaunch: false,
        noReset : true,
        user: argv.user,
        password: argv.password
    }],

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

        console.log("running test on Android")
        console.log("generating device id");
        console.log("pusing device id to file");        
        const testDeviceId = uuid.v4();             
        var data = new Buffer(testDeviceId).toString('base64');
        browser.pushFile(`card:/perfecto-example/deviceId.txt`, data);    
        console.log("using generated device id - " + testDeviceId);

        browser.testDeviceId = testDeviceId;
    }
};
