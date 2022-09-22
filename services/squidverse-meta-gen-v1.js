const { Worker, isMainThread, parentPort, workerData} = require('node:worker_threads');
const metadataWorker = __dirname+"../../services/worker-meta-gen";

let internalIdWithUri = [] 

const meta_worker1 = new Worker(metadataWorker);
const meta_worker2 = new Worker(metadataWorker);
const meta_worker3 = new Worker(metadataWorker);
const meta_worker4 = new Worker(metadataWorker);

meta_worker1.postMessage([0, 3]);
meta_worker2.postMessage([3, 6]);
meta_worker3.postMessage([6, 9]);
meta_worker4.postMessage([9, 11]);

meta_worker1.on('message', async (msg) => {
    internalIdWithUri.push(msg) ;
    console.log(msg)
});
meta_worker2.on('message', async (msg) => {
    internalIdWithUri.push(msg) ;
    console.log(msg)
});
meta_worker3.on('message', async (msg) => {
    internalIdWithUri.push(msg) ;
    console.log(msg)
});
meta_worker4.on('message', async (msg) => {
    internalIdWithUri.push(msg) ;
    console.log(msg)
});
module.exports = internalIdWithUri;