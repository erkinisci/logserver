import { AppConfig } from "app/models/appConfig";
import * as ini from "./core/ini";
import { MasterWorker } from "./workers/masterWorker";
import * as fs from 'fs';


var config = ini.parse<AppConfig>(fs.readFileSync('./config.ini', 'utf-8'))

if (!fs.existsSync(config.file.main)) {
    fs.mkdirSync(config.file.main);
}

var listener = new MasterWorker(config);
listener.start();
