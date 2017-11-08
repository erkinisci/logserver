import { AppConfig } from "app/models/appConfig";
import * as ini from "./core/ini";
import { MasterWorker } from "./workers/masterWorker";
import * as fs from 'fs';
import { UserTokenGeneratorService } from "./services/userTokenGeneratorService";
import { LogUser } from "./models/authentication/logUser";


var config = ini.parse<AppConfig>(fs.readFileSync('./config.ini', 'utf-8'))

if (!fs.existsSync(config.file.main)) {
    fs.mkdirSync(config.file.main);
}

var auth : UserTokenGeneratorService;
var user : LogUser;

auth = new UserTokenGeneratorService(config);
user = new LogUser();

user.userName = 'erkin';
user.ipAddress = '192.168.2.1';
user.applicationName = 'dblogger';
user.appVersion =1;

let token = auth.generate(user);
console.log(token);

// var listener = new MasterWorker(config);
// listener.start();
