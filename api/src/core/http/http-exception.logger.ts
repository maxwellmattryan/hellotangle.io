import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import { ExtendedLogger } from '@api/core/utils/extended-logger';

@Catch(HttpException)
export class HttpExceptionLogger implements ExceptionFilter<HttpException> {
    private readonly logger = new ExtendedLogger('HttpLogger');

    catch(exception: HttpException, host: ArgumentsHost) {
        const statusCode = ((exception as any).response as any).statusCode;
        const message = ((exception as any).response as any).message;

        this.logger.errorResponse(message, statusCode);
    }
}
