import { Logger } from '@nestjs/common';

/**
 * The custom logger implementation, which exists mainly to adding specific log formatting for HTTP requests.
 */
export class ExtendedLogger extends Logger {
    private static createResponseLog(message: string, statusCode: number | string): string {
        return `[${statusCode}] ${message}`;
    }

    debug(message: string, ctx: string | undefined = ''): void {
        super.debug(message, ctx);
    }

    debugResponse(message: string, statusCode: number = 200, ctx: string | undefined = ''): void {
        super.debug(ExtendedLogger.createResponseLog(message, statusCode), ctx)
    }

    info(message: string, ctx: string | undefined = ''): void {
        super.log(message, ctx);
    }

    infoResponse(message: string, statusCode: number = 200, ctx: string | undefined = ''): void {
        super.log(ExtendedLogger.createResponseLog(message, statusCode), ctx);
    }

    error(message: string, trace: string = '', ctx: string | undefined = ''): void {
        super.error(message, trace, ctx);
    }

    errorResponse(message: string, statusCode: number = 400, trace: string = '', ctx: string | undefined = ''): void {
        super.error(ExtendedLogger.createResponseLog(message, statusCode), trace, ctx);
    }
}
