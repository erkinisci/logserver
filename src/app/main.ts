import { MasterWorker } from "./workers/masterWorker";
import * as fs from 'fs';


const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

var listener = new MasterWorker();
listener.start();
