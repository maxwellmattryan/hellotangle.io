import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { ExtendedLogger } from '@api/utils/extended-logger';

/**
 * The filter for HTTP exceptions and errors that also logs them to the console.
 */
export class HttpExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new ExtendedLogger('HttpExceptionLogger');

    catch(exception: Record<string, unknown>, host: ArgumentsHost) {
        this.logger.errorResponse(String(exception));

        super.catch(exception, host);
    }
}
