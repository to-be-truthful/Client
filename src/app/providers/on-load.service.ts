import {Injectable} from '@angular/core';
import {UpdateCheckService} from "./update-check.service";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class OnLoadService {

    constructor(
        private updateCheckService: UpdateCheckService,
        private authService: AuthService
    ) {
    }

    public onLoad = async () => {
        if(!this.authService.checkLoggedIn()) return;
        this.updateCheckService.loadSocket();
    }

}
