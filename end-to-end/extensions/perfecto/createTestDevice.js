var axios = require('axios');

module.exports = function async(testId, testDeviceId) {
    return deleteFromDevice(this, "card:/soluto-automation/*")
        .then(() => {
            const uploads = testDeviceId.split('')
                .map(x=> x.charCodeAt(0))
                .map(characterAsciiCode => Array(characterAsciiCode).fill('a')) 
                .map(s => new Buffer(s).toString('base64'))
                .map((file, i) => {
                    const repositoryPath = `PRIVATE:tests/${testId}/deviceId/${i}.txt`;
                    const cardPath = `card:/soluto-automation/${i}.txt`;
                    return uploadToRepository(repositoryPath, file)
                        .then(() => transferToDevice(this, repositoryPath, cardPath));
                });

            return Promise.all(uploads);
        })
}

function deleteFromDevice(driver, handsetFile) {
    console.log(`deleting ${handsetFile} from the device`)    
    return driver.execute('mobile:media:delete', {handsetFile});    
}

function uploadToRepository(repositoryFile, data) {
    console.log(`uploading to repositry at ${repositoryFile}`)
    return axios({
        method: 'post',
        url: `https://beta.perfectomobile.com/services/repositories/media/${repositoryFile}?operation=upload&user=guy@soluto.com&password=Test123`,
        data
    });
}

function transferToDevice(driver, repositoryFile, handsetFile) {
    console.log(`transering ${repositoryFile} to device at ${handsetFile}`)    
    return driver.execute('mobile:media:put', {repositoryFile, handsetFile});
}
