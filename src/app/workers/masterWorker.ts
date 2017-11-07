import * as cluster from 'cluster';
import * as os from 'os';
import { SlaveWorker } from './SlaveWorker';
import * as ini from '../core/ini';
import * as fs from 'fs';
import { AppConfig } from '../models/appConfig';

export class MasterWorker {
 
  start(): void {

    if (cluster.isMaster) 
    {
      this.masterRun();
    } 
    else 
    {
      this.slaveRun();
      this.logAppend();
    }
  }

  private masterRun(): void {
    console.log(`Master ${process.pid} is running`);
    var config = ini.parse<AppConfig>(fs.readFileSync('./config.ini', 'utf-8'))

    if (config.app.workerSize > os.cpus().length) {
      throw 'Worker size error!';
    }

    var workserSize =  config.app.workerSize;
    if(workserSize <= 0)
      workserSize = 1;
       
    for (let i = 0; i < workserSize; i++) {
      cluster.fork({ config: JSON.stringify(config) });
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  }

  private slaveRun() {
    let config = JSON.parse(process.env['config']);
    let slave = new SlaveWorker();
    slave.start(config);
  }

  private logAppend() {
    console.log(`Worker ${process.pid} started`);
  }
}