import { HttpService } from "../listeners/httpService"
import { AppConfig } from "../models/appConfig";

export class SlaveWorker {

  start(config: AppConfig) {
    let service = new HttpService(config);
    service.start();
  }
  
}