import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPage } from '@web/core/pages/about-page/about.page';

const routes: Routes = [
    {
        path: 'about',
        component: AboutPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
