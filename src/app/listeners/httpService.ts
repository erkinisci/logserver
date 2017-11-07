import * as http from 'http';

import { Loggy } from '../loggies/loggy';
import { ILogInfo } from '../models/iLogInfo';
import { AppConfig } from '../models/appConfig';

export class HttpService {

  private _loggy : Loggy;
  
  constructor(private _config: AppConfig) {
    this._loggy = new Loggy(_config);;
  }

  start() {
    let self = this;

    const server = http.createServer((req, res) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Encoding': 'utf8',
      });
      
      self.processRequest(req, res);
    });

    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });

    server.listen(self._config.connection.port);
  }

  processRequest(req: http.IncomingMessage, res: http.ServerResponse) {
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