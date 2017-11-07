import * as cluster from 'cluster';
import * as os from 'os';
import { SlaveWorker } from './SlaveWorker';
import * as ini from '../core/ini';
import * as fs from 'fs';
import { AppConfig } from '../models/appConfig';

export class MasterWorker {
 
  config : AppConfig;

  constructor(private _config : AppConfig) {
    this.config = _config;   
  }

  start(): void {
    if (cluster.isMaster) 
    {
      this.masterRun();
    } 
    else 
    {
      this.slaveRun();
    }

    this.logAppend();
  }

  private masterRun(): void {   
    var workerSize =  this.config.app.workerSize;
    
    if (workerSize > os.cpus().length) {
      workerSize = os.cpus().length;
      console.log(`Ideal Worker Size is seted as ${workerSize}.`);     
    }
    else if(workerSize <= 0)
      workerSize = 1;
       
    for (let i = 0; i < workerSize; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });    
  }

  private slaveRun() {
    let slave = new SlaveWorker();
    slave.start(this.config);
  }

  private logAppend() {
    if (cluster.isMaster) 
      console.log(`Master ${process.pid} is running`);
    else
      console.log(`Worker ${process.pid} started`);
  }

}