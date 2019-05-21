import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {APIInterceptor} from "./interceptors/api.interceptor";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {OnLoadService} from "./providers/on-load.service";

export function init_app(onLoadService: OnLoadService) {
    return () => onLoadService.onLoad();
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [OnLoadService],
            multi: true
        },

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
