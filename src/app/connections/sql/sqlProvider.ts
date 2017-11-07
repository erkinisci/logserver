import * as mssql from 'mssql';
import { IDbCommand } from './command';

export class SqlProvider {
  constructor(private _config: any) {
  }

  execute(req: string): Promise<string> {

    let self = this;
    
    return new Promise<string>((resolve, reject) => {

      let sql = new mssql.ConnectionPool(self._config.database);
      
      sql.connect(err => {

        if (err) {
          reject(err.message);
          return;
        }

        let command = <IDbCommand>JSON.parse(req);

        let sqlRequest = sql.request();

        if (command.parameters) {
          command.parameters.forEach(param => {
            if (param.name.startsWith('@')) {
              param.name = param.name.substr(1);
            }
            if (param.direction && param.direction == 'OUTPUT') {
              sqlRequest.output(param.name, param.value);
            }
            else {
              sqlRequest.input(param.name, param.value);
            }
          });
        }

        if (self._config.app.cmdPrefix) {
          if (!command.query.startsWith(self._config.app.cmdPrefix)) {
            command.query = self._config.app.cmdPrefix + command.query;
          }
        }

        sqlRequest.execute(command.query).then(data => {
          resolve(JSON.stringify({
            recordset: data.recordsets,
            rowsAffected: data.rowsAffected,
            output: data.output
          }));
        }).catch(reason => {
          reject(reason.message);
        });
      })
    });
  }
}