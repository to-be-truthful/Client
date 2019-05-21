import {Component, OnInit} from '@angular/core';
import {APIService, IAccountResponse} from "../../providers/api.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage {

    public user: IAccountResponse;
    loading: boolean;

    constructor(
        private apiService: APIService
    ) {
        this.loading = true;
    }

    ionViewDidEnter() {
        this.loading = true;
        this.apiService.getDetails().then(person => {
            this.user = person;
            this.loading = false;
        })
    }

}
