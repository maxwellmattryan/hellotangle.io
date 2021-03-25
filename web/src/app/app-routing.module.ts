import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPage } from '@web/core/pages/about-page/about.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@web/message/message.module').then(m => m.MessageModule)
    },
    {
        path: 'about',
        component: AboutPage
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

/**
 * The app routing module for assigning components to routes and lazy loading modules.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
