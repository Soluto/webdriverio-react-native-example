describe("sample suite", () => {
    it("should show test device id", () => {
        console.log("launching app");
        browser.launch();

        console.log(`searching for test device id: ${browser.testDeviceId}`);
        browser.waitForVisible("~device-id");
        const deviceIdText = browser.getText("~device-id");
        expect(deviceIdText).to.equal(browser.testDeviceId);
        console.log("device id was found succssfully");
        browser.pause(5000);    
    })
})