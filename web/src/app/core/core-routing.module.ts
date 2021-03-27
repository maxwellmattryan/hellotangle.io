import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPage } from '@web/modules/about/pages/about-page/about.page';

const routes: Routes = [
    {
        path: 'about',
        component: AboutPage
    }
];

/**
 * The core routing module for assigning components to routes.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
