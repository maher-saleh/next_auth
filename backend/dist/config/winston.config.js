"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
exports.WinstonLogger = WinstonLogger;
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
function WinstonLogger(context) {
    return winston.createLogger({
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike(context, { colors: true, prettyPrint: true })),
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' }),
            new winston.transports.Console(),
        ],
    });
}
exports.winstonConfig = {
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console(),
    ],
};
//# sourceMappingURL=winston.config.js.map