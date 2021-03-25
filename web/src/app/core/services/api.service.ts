import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * The available content types for using in API requests.
 * @internal
 */
type ContentType = 'application/json' | 'application/xml' | 'application/zip' | 'application/x-www-form-urlencoded';

/**
 * The base API service class containing common functionality for API communication (i.e. settings headers).
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(protected readonly http: HttpClient) { }

    /**
     * Creates the appropriate `HttpHeaders` given a specific content type.
     * @param contentType The value to set the 'Content-Type' header to.
     * @returns A new `HttpHeaders` object correctly configured with the proper content type.
     * @internal
     */
    protected contentTypeHeader(contentType: ContentType = 'application/json'): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': contentType });
    }
}
