const { exec } = require('child_process');

const sampleSize = +process.argv[2];
const workerProcess = +process.argv[3]

const eachWorkerSampleSize = Math.floor((sampleSize / workerProcess));
const firstWorkerSampleSize = Math.floor((sampleSize / workerProcess)) + (sampleSize % workerProcess);

console.log(sampleSize, workerProcess);
console.log(firstWorkerSampleSize, eachWorkerSampleSize);

let start = 1;

while (start <= sampleSize) {
    if (start == 1) {
        console.log(`node gen_dataset ${start} ${start+firstWorkerSampleSize-1}`);
        exec(`node gen_dataset ${start} ${start+firstWorkerSampleSize-1}`);
        
        start = start + firstWorkerSampleSize;
    } else {
        console.log(`node gen_dataset ${start} ${start+eachWorkerSampleSize-1}`);
        exec(`node gen_dataset ${start} ${start+eachWorkerSampleSize-1}`);

        start = start + eachWorkerSampleSize;
    }
    
}
