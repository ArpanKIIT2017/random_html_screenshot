const { exec } = require('child_process');

const sampleSize = +process.argv[2];
const workerProcess = +process.argv[3]

const rem = sampleSize % workerProcess;

const distribution = new Array(workerProcess).fill((sampleSize - rem) / workerProcess);

for (let i = 0; i < rem; i++) {
    distribution[i % workerProcess] += 1;
}

console.log(`Sample Size = ${sampleSize}`);
console.log(`No of worker processes = ${workerProcess}`);
console.log(`Sample Distribution in Workers = ${distribution}`);

// exec(`node gen_dataset ${start} ${end}`);
let offset = 1
for (let i = 0; i < workerProcess; i++) {
    exec(`node gen_dataset ${offset} ${distribution[i]+offset-1}`);
    offset += distribution[i];
}

console.log("All workers ready! Waiting for workers to finish...");