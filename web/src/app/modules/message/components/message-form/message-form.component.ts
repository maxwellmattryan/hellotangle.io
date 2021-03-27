import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from '@web/modules/message/interfaces/message.interface';
import { MessageApiService } from '@web/modules/message/services/message-api.service';

/**
 * The form component for sending IOTA protocol messages.
 */
@Component({
    selector: 'web-message-form',
    templateUrl: './message-form.component.html',
    styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
    public isSendingMessage: boolean = false;
    public messageForm: FormGroup = this.initMessageForm();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly messageApiService: MessageApiService,
        private readonly router: Router
    ) { }

    ngOnInit(): void { }

    /**
     * Builds the form group model.
     * @returns A form group with the necessary attributes for an IOTA protocol message
     * @internal
     */
    private initMessageForm(): FormGroup {
        const recipientAddressRegex: RegExp = /^[A-Z0-9]{90}$/;
        const contentRegex: RegExp = /^[\x00-\x7F]{1,256}$/;

        return this.formBuilder.group({
            recipient_address: this.formBuilder.control('', [Validators.pattern(recipientAddressRegex)]),
            content: this.formBuilder.control('', [Validators.pattern(contentRegex)])
        });
    }

    /**
     * Constructs form data and sends request to the API when called.
     */
    public onSendMessage(): void {
        this.isSendingMessage = true;

        const message: Message = this.buildMessageFormData();
        this.messageApiService.sendMessage(message).subscribe((res: Message) => {
            this.isSendingMessage = false;

            console.log(res);

            this.router.navigate(['result']);
        }, (error: HttpErrorResponse) => {
            this.isSendingMessage = false;
        });
    }

    /**
     * Creates a message object from form data.
     * @returns A message object with data from the form.
     * @internal
     */
    private buildMessageFormData(): Message {
        return {
            ...this.messageForm.value
        };
    }
}
