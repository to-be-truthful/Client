import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {APIService, INotif, IRate} from "../../providers/api.service";
import {NotifService} from "../../providers/notif.service";
import {UpdateCheckService} from "../../providers/update-check.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    public rates: Array<IRate>;
    public loading: boolean;

    private refreshListener: Subscription;

    constructor(
        private apiService: APIService,
        private notifService: NotifService,
        private changeDetection: ChangeDetectorRef,
        private updateService: UpdateCheckService
    ) {
    }

    async ngOnInit() {
        this.loading = true;
        await this.loadContent();
        this.loading = false;

        this.refreshListener = this.updateService.updateEmitter.subscribe(() => {
            this.loadContent();
        })
    }

    ngOnDestroy() {
        if(this.refreshListener){
            this.refreshListener.unsubscribe();
        }
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
            const secondsFormatted = seconds.toFixed(0);
            if(secondsFormatted === "1"){
                return secondsFormatted + " second";
            }
            return secondsFormatted + " seconds";
        } else if (minutes < 60) {
            const minutesFormatted = minutes.toFixed(0);
            if(minutesFormatted === "1"){
                return minutesFormatted + " minute";
            }
            return minutesFormatted + " minutes";
        } else if (hours < 24) {
            const hoursFormatted = hours.toFixed(0);
            if(hoursFormatted === "1"){
                return hoursFormatted + " hour";
            }
            return hoursFormatted + " hours";
        } else {
            const daysFormatted = days.toFixed(0);
            if(daysFormatted === "1"){
                return daysFormatted + " day"
            }
            return daysFormatted + " days"
        }
    };
}
