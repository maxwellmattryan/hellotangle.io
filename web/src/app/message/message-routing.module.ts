import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateMessagePageComponent } from '@web/message/pages/create-message-page/create-message-page.component';

const routes: Routes = [
    {
        path: '',
        component: CreateMessagePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessageRoutingModule { }
