import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CORE_ROOT_GUARD, coreRootGuardFactory } from '@web/core/guards/core-root.guard';
import { FooterComponent } from '@web/core/components/footer/footer.component';
import { HeaderComponent } from '@web/core/components/header/header.component';
import { LoadingSpinnerComponent } from '@web/core/components/loading-spinner/loading-spinner.component';

import { environment } from '@web/environments/environment';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        BrowserModule,
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
