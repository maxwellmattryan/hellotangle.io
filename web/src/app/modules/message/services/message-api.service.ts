import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '@web/core/services/api.service';
import { environment } from '@web/environments/environment';
import { Message } from '@web/modules/message/models/message.model';

/**
 * The Message API service for handling message-related endpoints.
 */
@Injectable({
    providedIn: 'root'
})
export class MessageApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    /**
     * Sends a message to the API server to broadcast to the IOTA Tangle.
     * @param message The message data to send to the API server.
     * @returns An `Message` observable to subscribe to.
     */
    sendMessage(message: Message): Observable<Message> {
        return this.http.post<Message>(
            `${environment.API_URL}/messages/send`,
            message,
            { headers: this.contentTypeHeader() }
        );
    }
}
