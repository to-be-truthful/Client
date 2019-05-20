import {Component, OnInit} from '@angular/core';
import {APIService, IRate} from "../../providers/api.service";
import {NotifService} from "../../providers/notif.service";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-play',
    templateUrl: './play.page.html',
    styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

    public loading: boolean;
    public question: IRate;

    constructor(
        private apiService: APIService,
        private notifService: NotifService,
        private navController: NavController
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.apiService.getRate().then(rate => {
            this.question = rate;
            this.loading = false;
        }).catch(e => {
            this.notifService.prompt("Failed to play; " + e);
            this.navController.navigateBack("/app/home");
        })
    }

}
