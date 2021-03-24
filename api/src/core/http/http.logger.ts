import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { ExtendedLogger } from '@api/utils/extended-logger';

/**
 * The logger for HTTP requests and responses.
 */
@Injectable()
export class HttpLogger implements NestMiddleware {
    private readonly logger = new ExtendedLogger('HttpLogger');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, baseUrl } = request;
        const userAgent = request.get('user-agent') || '';

        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length') || 0;
            const message = `${method} ${baseUrl} ${contentLength} - ${userAgent} ${ip}`;

            const isError: boolean = Number(statusCode) >= 400;
            if(isError)
                this.logger.errorResponse(message, statusCode);
            else
                this.logger.infoResponse(message, statusCode);
        });

        next();
    }
}
