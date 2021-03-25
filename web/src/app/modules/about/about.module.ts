import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutPage } from '@web/modules/about/pages/about-page/about.page';
import { AboutRoutingModule } from '@web/modules/about/about-routing.module';

/**
 * The about module, which mostly displays static information.
 */
@NgModule({
    declarations: [
        AboutPage
    ],
    imports: [
        AboutRoutingModule,
        CommonModule
    ]
})
export class AboutModule { }
