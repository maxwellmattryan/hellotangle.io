import { NgModule } from '@angular/core';

import { AppComponent } from '@web/app.component';
import { AppRoutingModule } from '@web/app-routing.module';
import { CoreModule } from '@web/core/core.module';
import { MessageModule } from '@web/message/message.module';

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
    bootstrap: [AppComponent]
})
export class AppModule { }
