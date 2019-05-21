import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../providers/auth.service";
import {IonTabs} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

    @ViewChild('tabBar') tabs: IonTabs;

    loggedIn: boolean;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    onUpdate = () => {
        this.loggedIn = this.authService.checkLoggedIn();
        const currentTab = this.tabs.getSelected();
        if (!this.loggedIn && (currentTab !== "login" && currentTab !== "register")) {
            this.router.navigateByUrl("/app/login");
        } else if (this.loggedIn && (currentTab === "login" || currentTab === "register")) {
            console.log("caught auth attmp")
            this.router.navigateByUrl("/app/home");
        }
    };

    ngOnInit(): void {
        this.onUpdate();
    }

}
