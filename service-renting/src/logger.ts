import {createLogger, format, transports} from "winston";
import pkg from "../package.json";

const loggerTransports = [
    new transports.File({
        filename: `${pkg.name}-error.log`,
        level: "error",
    }),
    new transports.File({
        filename: `${pkg.name}-combined.log`,
    }),
    new transports.Console({
        format: format.combine(
            format.colorize({all: false}),
            format.printf(({level, service, message, timestamp}) => `${timestamp} [${service}] ${level}: ${message}`),
        ),
    }),
];

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({stack: true}),
        format.splat(),
        format.json(),
    ),
    defaultMeta: {service: pkg.name},
    transports: loggerTransports,
});
