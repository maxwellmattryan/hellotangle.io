import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import { ExtendedLogger } from '@api/utils/extended-logger';

/**
 * The logger for HTTP errors and exceptions.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    private readonly logger = new ExtendedLogger('HttpExceptionLogger');

    catch(exception: HttpException, host: ArgumentsHost) {
        const statusCode = ((exception as any).response as any).statusCode;
        const message = ((exception as any).response as any).message;

        this.logger.errorResponse(message, statusCode);
    }
}
