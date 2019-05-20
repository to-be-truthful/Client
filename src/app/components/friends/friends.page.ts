import {Component, OnInit} from '@angular/core';
import {APIService, IPerson} from "../../providers/api.service";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

    public friends: Array<IPerson>;
    public loading: boolean;

    constructor(
        private apiService: APIService
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.apiService.getFriends().then(friends => {
            this.loading = false;
            this.friends = friends;
            console.log(friends);
        })
    }

}
