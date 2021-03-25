import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@web/modules/message/message.module').then(m => m.MessageModule)
    },
    {
        path: 'about',
        loadChildren: () => import('@web/modules/about/about.module').then(m => m.AboutModule)
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
