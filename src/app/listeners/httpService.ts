import * as http from 'http';
import * as router from 'router';
import { Loggy } from '../loggies/loggy';
import { ILogInfo } from '../models/iLogInfo';
import { AppConfig } from '../models/appConfig';
import * as bodyParser from 'body-parser';
import * as finalHandler from 'finalhandler';
import * as compression from 'compression';

import { ILogUser } from '../models/authentication/iLogUser';
import { UserTokenGeneratorService } from '../services/userTokenGeneratorService';

export class HttpService {

  private _loggy : Loggy;
  private _authService : UserTokenGeneratorService;

  constructor(private _config: AppConfig) {
    this._loggy = new Loggy(_config);
    this._authService = new UserTokenGeneratorService(_config);
  }

  start() {
    let self = this;

    var route = router();
    const server = http.createServer((req, res) => {
      route(req, res, finalHandler(req, res));
    });

    route.use(compression());

    var api = router();
    route.use('/api/', api);  
    api.use(bodyParser.json());
    
    api.post('/auth', function (req, res) {
     let logUser : ILogUser;
     
     console.log(req.body);     
     
     try{
        logUser = <ILogUser>req.body;       
      } catch (e){
        console.log(e);        
      }       

      if(logUser != null){
        let token = self._authService.generate(logUser);
        console.log(token);        
       
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(token + '\r\n');
      }
      else 
      {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Parametrelerinizi kontrol edin. \r\n');
      }
    });

    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });

    server.listen(self._config.connection.port);
  }

  handler(req: http.IncomingMessage, res: http.ServerResponse) {
    let self = this;
    let rawData = '';

    req.on('data', (chunk: string | Buffer) => {
      rawData += chunk;    
    });

    req.on('end', () => {
      res.end();     
      self._loggy.log(rawData);
    });    
  }
}