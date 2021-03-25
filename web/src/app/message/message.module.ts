import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MessageRoutingModule } from '@web/message/message-routing.module';
import { CreateMessagePageComponent } from '@web/message/pages/create-message-page/create-message-page.component';

@NgModule({
    declarations: [
        CreateMessagePageComponent
    ],
    imports: [
        CommonModule,
        MessageRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: []
})
export class MessageModule { }
