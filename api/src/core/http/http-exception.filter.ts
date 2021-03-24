import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { ExtendedLogger } from '@api/utils/extended-logger';

/**
 * The filter for HTTP exceptions and errors that also logs them to the console.
 */
export class HttpExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new ExtendedLogger('HttpExceptionFilter');

    /**
     * Catches all exceptions thrown in the server, mainly for logging purposes.
     * @param exception The exception that was thrown.
     * @param host The method provider for retrieving arguments for handler.
     */
    catch(exception: Error, host: ArgumentsHost): void {
        const isHttpError: boolean = exception instanceof HttpException;
        if(!isHttpError)
            this.handleException(exception);
        else
            this.handleHttpException((exception as HttpException));

        super.catch(exception, host);
    }

    /**
     * Logs general exception data to the console.
     * @param exception The exception that was thrown.
     * @internal
     */
    private handleException(exception: Error): void {
        this.logger.error(String(exception));
    }

    /**
     * Logs specific HTTP exception data to the console.
     * @param exception The HTTP exception that was thrown.
     * @internal
     */
    private handleHttpException(exception: HttpException): void {
        // @ts-ignore
        const { statusCode, message, error } = exception.response;

        this.logger.error(message);
    }
}
