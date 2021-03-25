import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * The Angular Material module used mainly for the `SnackBar` notification service.
 */
@NgModule({
    exports: [
        MatButtonModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }
