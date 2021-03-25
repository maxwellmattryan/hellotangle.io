import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateMessagePage } from '@web/modules/message/pages/create-message-page/create-message.page';

const routes: Routes = [
    {
        path: '',
        component: CreateMessagePage
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
