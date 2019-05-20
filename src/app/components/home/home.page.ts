import {Component, OnInit} from '@angular/core';
import {APIService, INotif, IRate} from "../../providers/api.service";
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    public rates: Array<IRate>;

    constructor(
        private apiService: APIService,
        private toastController: ToastController
    ) {
    }

    ngOnInit() {
        this.apiService.getFeed().then(feed => {
            console.log(feed);
            this.rates = feed.rates;

            feed.notifs.forEach(notif => {
                this.createNotif(notif.text);
            })
        })
    }

    public createNotif = async (message: string) => {
        const toast = await this.toastController.create({
            header: "Notification",
            message: message,
            buttons: [
                {
                    text: 'Close',
                    role: 'cancel',
                }
            ]
        } );
        toast.present();
    };

    public loadContent = () => {
        this.apiService.getFeed().then(feed => {
            console.log(feed);
            this.rates = feed.rates;

            feed.notifs.forEach(notif => {
                this.createNotif(notif.text);
            });
        })
    };

    public getTimeSince = (dateString: string): string => {
        const diffTime = Math.abs(new Date(dateString).getTime() - Date.now());
        return this.msToTime(diffTime);
    };

    private msToTime = (duration: number) => {
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        let hourFormat = "hour";
        let minuteFormat = "minute";
        let secondFormat = "second";

        if (hours !== 1)hourFormat += "s";
        if (minutes !== 1) minuteFormat += "s";
        if (seconds !== 1) secondFormat += "s";

        if (hours > 0){
            return hours + " " + hourFormat + " and " + minutes + " " + minuteFormat;
        } else {
            return minutes + " " + minuteFormat + " and " + seconds + " " + secondFormat;
        }
    };
}
