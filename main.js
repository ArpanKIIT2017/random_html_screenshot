const { exec } = require('child_process');

const sampleSize = +process.argv[2];
const workerProcess = +process.argv[3]

const eachWorkerSampleSize = Math.floor((sampleSize / workerProcess));
const firstWorkerSampleSize = Math.floor((sampleSize / workerProcess)) + (sampleSize % workerProcess);

console.log(`Sample Size = ${sampleSize}`);
console.log(`No of worker processes = ${workerProcess}`);
console.log(`No of samples processed by first worker = ${firstWorkerSampleSize}`);
console.log(`No of samples processed by other workers = ${eachWorkerSampleSize}`);

let start = 1;

while (start <= sampleSize) {
    if (start == 1) {
        exec(`node gen_dataset ${start} ${start+firstWorkerSampleSize-1}`);
        
        start = start + firstWorkerSampleSize;
    } else {
        exec(`node gen_dataset ${start} ${start+eachWorkerSampleSize-1}`);

        start = start + eachWorkerSampleSize;
    }
    
}

console.log("All workers ready! Waiting for workers to finish...");