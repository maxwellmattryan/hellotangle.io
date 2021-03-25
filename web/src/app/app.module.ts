import { NgModule } from '@angular/core';

import { AppComponent } from '@web/app.component';
import { AppRoutingModule } from '@web/app-routing.module';

import { AboutModule } from '@web/modules/about/about.module';
import { CoreModule } from '@web/core/core.module';
import { MessageModule } from '@web/modules/message/message.module';

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

        AboutModule,
        MessageModule
    ],
    exports: [],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
