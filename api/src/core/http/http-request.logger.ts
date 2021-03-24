import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ExtendedLogger } from '@api/utils/extended-logger';

/**
 * The logger for HTTP requests, which also logs HTTP method.
 */
@Injectable()
export class HttpRequestLogger implements NestInterceptor {
    private readonly logger = new ExtendedLogger('HttpRequestLogger');

    private readonly methodMap: object = {
        get: 'GET',
        put: 'PUT',
        delete: 'DELETE',
        post: 'POST'
    };

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();

        let method: string = '';
        Object.keys(req.route.methods).forEach(k => {
            // @ts-ignore
            if(req.route.methods[k]) method = this.methodMap[k];
        });

        const url = req.originalUrl;
        this.logger.info(`${method} ${url}`);

        return next.handle();
    }
}