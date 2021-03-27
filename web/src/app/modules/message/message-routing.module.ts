import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageResultPage } from '@web/modules/message/pages/message-result/message-result.page';
import { SendMessagePage } from '@web/modules/message/pages/send-message/send-message.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: SendMessagePage
    },
    {
        path: 'result/:id',
        component: MessageResultPage
    }
];

/**
 * The message routing module for assigning components to routes.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessageRoutingModule { }
