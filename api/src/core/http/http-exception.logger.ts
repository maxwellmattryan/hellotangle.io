import { ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

export class HttpExceptionLogger extends BaseExceptionFilter {
    private readonly logger: Logger = new Logger('HttpExceptionLogger');

    catch(exception: Record<string, unknown>, host: ArgumentsHost) {
        try {
            const statusCode = ((exception as any).response as any).statusCode;
            const error = ((exception as any).response as any).error;
            const message = ((exception as any).response as any).message;

            this.logger.error(`[${statusCode} | ${error}] ${message}`);
        } catch (e) {
            this.logger.error(`[500 - Internal Server Error] ${e}`);
        }

        super.catch(exception, host);
    }
}
