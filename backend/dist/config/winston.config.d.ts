import * as winston from 'winston';
export declare function WinstonLogger(context: string): winston.Logger;
export declare const winstonConfig: {
    level: string;
    format: winston.Logform.Format;
    transports: (winston.transports.FileTransportInstance | winston.transports.ConsoleTransportInstance)[];
};
