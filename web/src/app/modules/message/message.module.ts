import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SendMessagePage } from '@web/modules/message/pages/send-message/send-message.page';
import { MaterialModule } from '@web/core/material.module';
import { MessageApiService } from '@web/modules/message/services/message-api.service';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageResultPage } from '@web/modules/message/pages/message-result/message-result.page';
import { MessageRoutingModule } from '@web/modules/message/message-routing.module';
import { SharedModule } from '@web/shared/shared.module';

/**
 * The message module containing necessary configuration.
 */
@NgModule({
    declarations: [
        SendMessagePage,
        MessageFormComponent,
        MessageResultPage
    ],
    imports: [
        CommonModule,
        MessageRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    exports: [],
    providers: [
        MessageApiService
    ]
})
export class MessageModule { }
