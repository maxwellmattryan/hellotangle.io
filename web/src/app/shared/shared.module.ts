import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppearDirective } from '@web/shared/directives/appear.directive';

/**
 * The shared module containing things used by various other modules in the app.
 */
@NgModule({
    declarations: [
        AppearDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AppearDirective
    ],
    providers: []
})
export class SharedModule { }
