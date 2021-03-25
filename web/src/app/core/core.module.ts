import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AboutPage } from '@web/core/pages/about-page/about.page';
import { CORE_ROOT_GUARD, coreRootGuardFactory } from '@web/core/guards/core-root.guard';
import { CoreRoutingModule } from '@web/core/core-routing.module';
import { environment } from '@web/environments/environment';
import { FooterComponent } from '@web/core/components/footer/footer.component';
import { HeaderComponent } from '@web/core/components/header/header.component';
import { LoadingSpinnerComponent } from '@web/core/components/loading-spinner/loading-spinner.component';
import { MaterialModule } from '@web/core/material.module';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LoadingSpinnerComponent,
        AboutPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        LoadingSpinnerComponent
    ],
})
export class CoreModule {
    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: CORE_ROOT_GUARD,
                    useFactory: coreRootGuardFactory,
                    deps: []
                }
            ]
        };
    }
}
