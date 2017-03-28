module.exports = function async(testId, testDeviceId) {
    const uploads = testDeviceId.split('')
        .map(x=> x.charCodeAt(0))
        .map(characterAsciiCode => Array(characterAsciiCode).fill('a')) 
        .map(s => new Buffer(s).toString('base64'))
        .map((file, i) => {
            const path = `/sdcard/soluto-automation/${i}.txt`;
            return () => {
                console.log("pusing file to: " + path)
                return this.pushFile(path, file).then(() => delay(5000));                
            }
        });
    
    return runSerial(uploads)
}

function runSerial(tasks) {
  var result = Promise.resolve();
  tasks.forEach(task => {
    result = result.then(() => task());
  });
  return result;
}

function delay(duration) {
	return function(){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				resolve();
			}, duration)
		});
	};
};