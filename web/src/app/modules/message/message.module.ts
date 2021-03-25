import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateMessagePage } from '@web/modules/message/pages/create-message/create-message.page';
import { MessageRoutingModule } from '@web/modules/message/message-routing.module';
import { SharedModule } from '@web/shared/shared.module';

/**
 * The message module containing necessary configuration.
 */
@NgModule({
    declarations: [
        CreateMessagePage
    ],
    imports: [
        CommonModule,
        MessageRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [],
    providers: []
})
export class MessageModule { }
