module.exports = function async(testId, testDeviceId) {
    const uploads = testDeviceId.split('')
        .map(x=> x.charCodeAt(0))
        .map(characterAsciiCode => Array(characterAsciiCode).fill('a')) 
        .map(s => new Buffer(s).toString('utf8'))
        .map((file, i) => {
            const path = `/sdcard/soluto-automation/${i}.txt`;
            return () => Promise.resolve()
                .then(() => console.log("pusing file to: " + path))
                .then(() => this.pushFile(path, file));            
        });
    
    return runSerial(uploads);
}

function runSerial(tasks) {
  var result = Promise.resolve();
  tasks.forEach(task => {
    result = result.then(() => task());
  });
  return result;
}