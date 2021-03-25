import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from '@web/modules/about/about-routing.module';

/**
 * The about module, which mostly displays static information.
 */
@NgModule({
    declarations: [],
    imports: [
        AboutRoutingModule,
        CommonModule
    ]
})
export class AboutModule { }
