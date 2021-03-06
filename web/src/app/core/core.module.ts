import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CORE_ROOT_GUARD, coreRootGuardFactory } from '@web/core/guards/core-root.guard';
import { CoreRoutingModule } from '@web/core/core-routing.module';
import { environment } from '@web/environments/environment';
import { FooterComponent } from '@web/core/components/footer/footer.component';
import { HeaderComponent } from '@web/core/components/header/header.component';
import { HttpErrorInterceptor } from '@web/core/interceptors/http-error.interceptor';
import { HttpRequestInterceptor } from '@web/core/interceptors/http-request.interceptor';
import { LoadingSpinnerComponent } from '@web/core/components/loading-spinner/loading-spinner.component';
import { NotificationService } from '@web/core/services/notification.service';

/**
 * The core module containing most of the necessary configuration for the app.
 */
@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreRoutingModule,
        HttpClientModule,
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
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useFactory: (notificationService: NotificationService) => {
                        return new HttpErrorInterceptor(notificationService);
                    },
                    deps: [NotificationService],
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpRequestInterceptor,
                    multi: true
                }
            ]
        };
    }
}
