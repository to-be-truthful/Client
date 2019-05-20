import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    public showAdd = (): void => {

    };

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is("desktop")) {
                console.log("Web environment detected");
            } else {
                console.log("Cordova detected");
                this.statusBar.styleDefault();
                this.splashScreen.hide();
            }
        });
    }
}
