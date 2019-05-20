import {Component, OnInit} from '@angular/core';
import {APIService, IPerson, IRate} from "../../providers/api.service";
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

    async ngOnInit() {
        this.loading = true;
        await this.getNewRate();
        this.loading = false;
    }

    public getNewRate = async () => {
        try {
            this.question = await this.apiService.getNewRate();
        } catch (e) {
            this.notifService.prompt("Failed to play; " + e);
            this.navController.navigateBack("/app/home");
        }
    };

    public submitRate = async (person: IPerson) => {
        this.loading = true;
        try {
            await this.apiService.rate(this.question._id, person._id);
            this.notifService.prompt("Rate submitted!");
            await this.getNewRate();
        } catch (e) {
            this.notifService.prompt("Failed to rate; " + e);
            await this.getNewRate();
        }
        this.loading = false;
    };
}
