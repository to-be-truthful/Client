import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {APIService, INotif, IRate} from "../../providers/api.service";
import {ToastController} from "@ionic/angular";
import {NotifService} from "../../providers/notif.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    public rates: Array<IRate>;
    public loading: boolean;

    constructor(
        private apiService: APIService,
        private notifService: NotifService,
        private changeDetection: ChangeDetectorRef
    ) {
    }

    async ngOnInit() {
        this.loading = true;
        await this.loadContent();
        this.loading = false;
    }

    public loadContent = async () => {
        const feed = await this.apiService.getFeed();
        this.rates = feed.rates;

        feed.notifs.forEach(notif => {
            this.notifService.prompt(notif.text);
        });
        this.changeDetection.detectChanges();
    };

    public getTimeSince = (dateString: string): string => {
        const diffTime = Math.abs(new Date(dateString).getTime() - Date.now());
        return this.msToTime(diffTime);
    };

    private msToTime = (duration: number) => {
        const seconds = (duration / 1000);
        const minutes = (duration / (1000 * 60));
        const hours = (duration / (1000 * 60 * 60));
        const days = (duration / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return seconds.toFixed(0) + " seconds";
        } else if (minutes < 60) {
            return minutes.toFixed(0) + " minutes";
        } else if (hours < 24) {
            return hours.toFixed(0) + " hours";
        } else {
            return days.toFixed(0) + " days"
        }
    };
}
