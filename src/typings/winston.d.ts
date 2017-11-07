declare module 'winston' {
    interface Winston extends Winston {
      createLogger(opts : any);
      format : any;
    }

    interface Transports extends Transports {
      Rotate : RotateTransportInstance;
    }

    interface RotateTransportInstance extends TransportInstance {
      

      new(options?: any): RotateTransportInstance;
  }
  }

  declare module 'winston-logrotate'{
    declare function Rotate(params:any);
  }

  declare const winston: Winston;
  export = winston;
  