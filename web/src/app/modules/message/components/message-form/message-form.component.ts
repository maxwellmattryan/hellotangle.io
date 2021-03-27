import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from '@web/modules/message/models/message.model';
import { MessageApiService } from '@web/modules/message/services/message-api.service';
import { MessageService } from '@web/modules/message/services/message.service';

/**
 * The form component for sending IOTA protocol messages.
 */
@Component({
    selector: 'web-message-form',
    templateUrl: './message-form.component.html',
    styleUrls: ['./message-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageFormComponent implements OnInit {
    public isSendingMessage: boolean = false;
    public messageForm: FormGroup = this.initMessageForm();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly messageApiService: MessageApiService,
        private readonly messageService: MessageService,
        private readonly router: Router
    ) { }

    ngOnInit(): void { }

    /**
     * Builds the form group model.
     * @returns A form group with the necessary attributes for an IOTA protocol message
     * @internal
     */
    private initMessageForm(): FormGroup {
        const recipientAddressRegex: RegExp = /^[A-Z9]*$/;
        const contentRegex: RegExp = /^[\x00-\x7F]*$/;

        return this.formBuilder.group({
            recipient_address: this.formBuilder.control(
                '',
                [Validators.required, Validators.minLength(90), Validators.maxLength(90), Validators.pattern(recipientAddressRegex)]
            ),
            content: this.formBuilder.control(
                '',
                [Validators.required, Validators.maxLength(256), Validators.pattern(contentRegex)]
            )
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

            this.messageService.storeMessage(res);

            this.router.navigate([`result/${res.id}`]);
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

    /**
     * Getter methods for easier form control access in HTML template.
     */
    get content(): AbstractControl { return this.messageForm.get('content') as AbstractControl; }
    get recipient_address(): AbstractControl { return this.messageForm.get('recipient_address') as AbstractControl; }
}
