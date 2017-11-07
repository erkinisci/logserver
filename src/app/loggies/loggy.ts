import { ILogInfo } from 'app/models/iLogInfo';
import * as bunyan from 'bunyan';
import * as MySqlStream from 'bunyan-mysql';
import { AppConfig, DatabaseProvider } from '../models/appConfig';

export class Loggy{
  
    _logger : bunyan;
    _msqlStream : any;

    constructor(private _config: AppConfig) {

        this._msqlStream = new MySqlStream(_config.database);    
        
        this._logger = bunyan.createLogger( 
            { 
                name : _config.databaseOptions.appName, 
                streams : [
                    {
                        level: 'info',
                        path: 'logs/info.log',
                        period: '6h', 
                        count : 3
                    },
                    {
                        level: 'warn',
                        path: 'logs/warn.log',
                        period: '6h',
                        count : 3 
                    },
                    {
                        level: 'error',
                        path: 'logs/error.log' ,
                        period: '6h', 
                        count : 3
                    },
                    {
                        stream : this._msqlStream
                    }
                ],
                serializers : bunyan.stdSerializers
            }
        );

      
       this._logger.info("app started");

        this._msqlStream.on('error', function (err) {
            console.log('MySQL Stream Error:', err.stack);
        });
    }

   
public log(message: ILogInfo | string) {   
    if(typeof message == 'string'){
        var _message = <ILogInfo>JSON.parse(message);
        this.log(_message);
    }
    else
    {
        if(message.level == 'info') {
            console.log('\x1b[46m', message);
            this._logger.info(message.level, message.msg);
        }
        else if(message.level == 'warn') {
            console.log('\x1b[33m', message);
            this._logger.warn(message.level, message.msg);
        }
        else if(message.level == 'error') {
            console.log('\x1b[31m', message);
            this._logger.error(message.level, message.msg);
            
        }
    }    
  }
}

// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"