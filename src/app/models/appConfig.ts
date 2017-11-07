export interface AppConfig {
  [key: string]: any;
  app: AppTagConfig;
  connection: ConnectionTagConfig;
  database: DatabaseTagConfig;
  databaseOptions : DatabaseOptionsTagConfig
}

export interface AppTagConfig {
  workerSize?: number;
}

export interface ConnectionTagConfig {
  port?: number;
}

export interface DatabaseTagConfig {
  host?            : string,
  user?            : string,
  password?        : string,
  database?        : string,
  port?            : number
}

export interface DatabaseOptionsTagConfig {
  appName?: string;
  encrypt?: boolean;
  provider?: DatabaseProvider
} 

export enum DatabaseProvider {
  mysql = "mysql",
  sql= "sql",
  elasticSearch= "elasticSearch",
  mongoDb = "mongoDb",
}