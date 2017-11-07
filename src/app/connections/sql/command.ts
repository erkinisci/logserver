type DbParameterDirection = 'INPUT' | 'OUTPUT';

export interface IDbCommand {
  query: string;
  parameters?: IDbParameter[];
}

export interface IDbParameter {
  name?: string;
  type?: string;
  value?: any;
  direction?: DbParameterDirection;
}

export class IDbError {
  static ConnectionError: IDbConnectionError;
  static TransactionError: IDbTransactionError;
  static RequestError: IDbRequestError;
}

export class IDbConnectionError {
  static ELOGIN = 'ELOGIN';
  static ETIMEOUT = 'ETIMEOUT';
  static EDRIVER = 'EDRIVER';
  static EALREADYCONNECTED = 'EALREADYCONNECTED';
  static EALREADYCONNECTING = 'EALREADYCONNECTING';
  static ENOTOPEN = 'ENOTOPEN';
  static EINSTLOOKUP = 'EINSTLOOKUP';
  static ESOCKET = 'ESOCKET';
  static ECONNCLOSED = 'ECONNCLOSED';

  static GetMessage(code: string) {
    switch (code) {
      case IDbConnectionError.ELOGIN: return 'Login failed.';
      case IDbConnectionError.ETIMEOUT: return 'Connection timeout.';
      case IDbConnectionError.EDRIVER: return 'Unknown driver.';
      case IDbConnectionError.EALREADYCONNECTED: return 'Database is already connected!';
      case IDbConnectionError.EALREADYCONNECTING: return 'Already connecting to database!';
      case IDbConnectionError.ENOTOPEN: return 'Connection not yet open.';
      case IDbConnectionError.EINSTLOOKUP: return 'Instance lookup failed.';
      case IDbConnectionError.ESOCKET: return 'Socket error.';
      case IDbConnectionError.ECONNCLOSED: return 'Connection is closed.';
      default: return 'Unknown Error!'
    }
  }
}


export class IDbTransactionError {
  static ENOTBEGUN = 'ENOTBEGUN';
  static EALREADYBEGUN = 'EALREADYBEGUN';
  static EREQINPROG = 'EREQINPROG';
  static EABORT = 'EABORT';

  static GetMessage(code: string) {
    switch (code) {
      case IDbTransactionError.ENOTBEGUN: return 'Transaction has not begun.';
      case IDbTransactionError.EALREADYBEGUN: return 'Transaction has already begun.';
      case IDbTransactionError.EREQINPROG: return 'Cant commit/rollback transaction. There is a request in progress.';
      case IDbTransactionError.EABORT: return 'Transaction has been aborted.!';
      default: return 'Unknown Error!'
    }
  }
}

export class IDbRequestError {
  static EREQUEST = 'EREQUEST';
  static ECANCEL = 'ECANCEL';
  static ETIMEOUT = 'ETIMEOUT';
  static EARGS = 'EARGS';
  static EINJECT = 'EINJECT';
  static ENOCONN = 'ENOCONN';

  static GetMessage(code: string) {
    switch (code) {
      case IDbRequestError.EREQUEST: return 'Message from SQL Server. Error object contains additional details.';
      case IDbRequestError.ECANCEL: return 'Cancelled.';
      case IDbRequestError.ETIMEOUT: return 'Request timeout.';
      case IDbRequestError.EARGS: return 'Invalid number of arguments.';
      case IDbRequestError.EINJECT: return 'SQL injection warning.';
      case IDbRequestError.ENOCONN: return 'No connection is specified for that request.';
      default: return 'Unknown Error!'
    }
  }
}