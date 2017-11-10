import { ILogUser } from "app/models/authentication/iLogUser";
import * as jwt from 'jsonwebtoken';
import * as base64url from 'base64url';
import { AppConfig } from "app/models/appConfig";

export class UserTokenGeneratorService{
  
    config  : AppConfig;

    constructor(private _config : AppConfig) {
        this.config = _config;
    }
    
    generate(logUser : ILogUser) {
        let token = jwt.sign(JSON.stringify(logUser), this.config .tokenizer.payload, { algorithm : 'HS256', header : { alg: 'HS256', 'typ' : 'JWT' } });
        return token;
    }
}