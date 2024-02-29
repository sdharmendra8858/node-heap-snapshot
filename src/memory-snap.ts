import { writeHeapSnapshot } from 'node:v8';
import * as path from 'path';
import * as fs from 'fs';

const getPathName = (timestamp?: number) => {
  return (
    path.resolve('./temp') +
    `/Heap-${timestamp || new Date().getTime()}-${process.pid}.heapsnapshot`
  );
};

setInterval(() => {
  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }

  const heapSnapshots = fs.readdirSync(path.resolve('./temp'));
  // NOTE :: not more than 5 heap snapshots should be there
  if (heapSnapshots.length > 4) {
    const fileTimestamp = heapSnapshots.map((file) => +file.split('-')[1]);
    fileTimestamp.sort(); // To get the oldest heap snapshot
    fs.unlinkSync(getPathName(fileTimestamp[0]));
  }

  const fileName = getPathName();

  writeHeapSnapshot(fileName);
}, 60 * 1000); // NOTE :: take a snapshot every fixed time; here 1 hr
