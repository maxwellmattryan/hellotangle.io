import { NgModule } from '@angular/core';

import { AppComponent } from '@web/app.component';
import { AppRoutingModule } from '@web/app-routing.module';
import { CoreModule } from '@web/core/core.module';
import { MessageModule } from '@web/message/message.module';

/**
 * The top-level application module that composes all of the other modules and bootsraps the app.
 */
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        CoreModule.forRoot(),
        MessageModule
    ],
    exports: [],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
