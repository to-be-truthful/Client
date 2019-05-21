import {Compiler, Component, OnInit} from '@angular/core';
import {AuthService} from "../../providers/auth.service";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {UpdateCheckService} from "../../providers/update-check.service";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.page.html',
    styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {

    constructor(
        private routerService: Router,
        private authService: AuthService,
        private router: Router,
        private updateCheckService: UpdateCheckService
    ) {
    }

    async ionViewDidEnter() {
        console.log("on logout")
        this.authService.cachedAuthResponse = undefined;
        this.updateCheckService.disconnect();
        console.log("redirecting lmao")
        this.router.navigateByUrl("/app/login");
    }

}
