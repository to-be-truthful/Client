import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {APIService, IPerson} from "../../providers/api.service";
import {AlertController} from "@ionic/angular";
import {NotifService} from "../../providers/notif.service";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage {

    public friends: Array<IPerson>;
    public loading: boolean;

    constructor(
        private apiService: APIService,
        private alertController: AlertController,
        private notifService: NotifService,
        private changeDetection: ChangeDetectorRef
    ) {
        this.loading = true;
    }

    async ionViewDidEnter() {
        this.loading = true;
        await this.getFriends();
        this.loading = false;
    }

    public getFriends = async () => {
        this.friends = await this.apiService.getFriends();
        this.changeDetection.detectChanges();
    };

    public removeFriend = async (friend: IPerson) => {
        const alert = await this.alertController.create({
            header: "Are you sure you wish to remove this friend?",
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                    cssClass: "secondary"
                },
                {
                    text: "Yes",
                    handler: () => {
                        this.submitRemoval(friend);
                    }
                }
            ]
        });
        alert.present();
    };

    public addFriend = async () => {
        const alert = await this.alertController.create({
            header: "Add friend",
            message: "Please enter your friends TBT username",
            inputs: [
                {
                    name: "username",
                    type: "text",
                    placeholder: "Username"
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                    cssClass: "secondary"
                },
                {
                    text: "Add",
                    handler: (input) => {
                        this.submitAdd(input.username);
                    }
                }
            ]
        });
        alert.present();
    };

    private submitAdd = async (username: string) => {
        try {
            await this.apiService.addFriend(username);
            await this.getFriends();
            this.notifService.prompt("Added friend!");
        } catch (e) {
            this.notifService.prompt("Failed to add friend; " + e);
        }
        this.changeDetection.detectChanges();
    };

    private submitRemoval = async (friend: IPerson) => {
        try {
            await this.apiService.removeFriend(friend._id);
            await this.getFriends();
            this.notifService.prompt("Removed " + friend.firstName + " " + friend.lastName + " as a friend!");
        } catch (e) {
            this.notifService.prompt("Failed to remove friend; " + e);
        }
        this.changeDetection.detectChanges();
    }

}
