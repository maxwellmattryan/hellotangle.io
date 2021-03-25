import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateMessagePage } from '@web/modules/message/pages/create-message/create-message.page';
import { MaterialModule } from '@web/core/material.module';
import { MessageRoutingModule } from '@web/modules/message/message-routing.module';
import { MessageApiService } from '@web/modules/message/services/message-api.service';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { SharedModule } from '@web/shared/shared.module';

/**
 * The message module containing necessary configuration.
 */
@NgModule({
    declarations: [
        CreateMessagePage,
        MessageFormComponent
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
