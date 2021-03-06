import {Component, OnInit} from '@angular/core';
import {APIService, IPerson, IRate} from "../../providers/api.service";
import {NotifService} from "../../providers/notif.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-play',
    templateUrl: './play.page.html',
    styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit{

    public loading: boolean;
    public question: IRate;

    constructor(
        private apiService: APIService,
        private notifService: NotifService,
        private router: Router
    ) {
    }

    async ngOnInit(): Promise<void> {
        await this.getNewRate();
    }

    async ionViewDidEnter() {
        await this.getNewRate();
    }

    public getNewRate = async () => {
        this.loading = true;

        try {
            this.question = await this.apiService.getNewRate();
            this.loading = false;
        } catch (e) {
            this.notifService.prompt("Failed to play; " + e);
            this.router.navigateByUrl("/app/home");
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
