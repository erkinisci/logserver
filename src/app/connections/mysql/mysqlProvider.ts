import * as mysql from 'mysql';
import { ILogInfo } from 'app/models/iLogInfo';

export class MysqlProvider {
  
  fields = {
    level : 'level',
    meta: 'meta',
    message : 'message',
    timestamp: 'timestamp'
  }

  constructor(private _config: any) {
  }

  execute(req: string): Promise<string> {

    let self = this;

    let log = <ILogInfo>JSON.parse(req);
    log[self.fields.level] = log.level;
    log[self.fields.message] = log.msg;
    log[self.fields.meta] = JSON.stringify(log.meta);
    log[self.fields.timestamp] = new Date();
    
    return new Promise<string>((resolve, reject) => {

      let config ={
        localAddress: self._config.server,
        port :self._config.port,
        user:  self._config.user,
        password: self._config.password,
        database : self._config.database
      };
      
      console.log(config);
      
      let connection = mysql.createConnection(config);
     connection.connect();
     console.log(connection.state);

    //   let query =  connection.query('INSERT INTO  SET ? + ', log, function (err, result) {
    //     console.log(err);
    //     console.log(result);
        
    //     // Neat!
    // });
    // console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'


    });
  }
}