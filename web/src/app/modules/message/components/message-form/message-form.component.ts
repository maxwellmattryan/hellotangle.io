import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Message } from '@web/modules/message/interfaces/message.interface';

/**
 * The form component for sending IOTA protocol messages.
 */
@Component({
    selector: 'web-message-form',
    templateUrl: './message-form.component.html',
    styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
    messageForm: FormGroup = this.initMessageForm();

    constructor(private readonly formBuilder: FormBuilder) { }

    ngOnInit(): void { }

    /**
     *
     * @internal
     */
    private initMessageForm(): FormGroup {
        const recipientAddressPlaceholder =
            'eg. HZYKLMOYJYAYBZRTKAQPUOVUSZTC999JDJCVTXRKOS9WEHR9QEKWBFJRRHVKGXJ9CEZXEPIDLVOBEBD9DCNJNML9PL';
        const contentPlaceholder = 'eg. "Hello, Tangle!"';

        return this.formBuilder.group({
            recipient_address: this.formBuilder.control(recipientAddressPlaceholder, []),
            content: this.formBuilder.control(contentPlaceholder, [])
        });
    }

    /**
     * Constructs form data and sends request to the API when called.
     */
    public onSendMessage(): Message {
        const message: Message = this.buildMessageFormData();
        console.log(message);

        return message;
    }

    /**
     * @internal
     */
    private buildMessageFormData(): Message {
        return {
            ...this.messageForm.value
        };
    }
}
