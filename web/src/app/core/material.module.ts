import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * The Angular Material module used mainly for the `SnackBar` notification service.
 */
@NgModule({
    exports: [
        MatSnackBarModule
    ]
})
export class MaterialModule { }
