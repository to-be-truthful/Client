import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigStorageService} from "./config-storage.service";

export interface IPerson {
    email?: string;
    firstName: string;
    lastName: string;
    username: string;
    _id: string;
    passwordHash?: string;
}

export interface IFeedResponse {
    rates: Array<IRate>;
    notif: Array<INotif>;
}

export interface INotif {
    _id: string;
    personTo: IPerson;
    text: string;
    shown: boolean;
}

export interface IQuestion {
    _id: string;
    questionText: string;
}

export interface IRate {
    personFrom?: IPerson;
    choices: Array<IPerson>;
    question: IQuestion;
    date: string;
    shown: boolean;
    _id: string;
}

@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(
        private http: HttpClient,
        private configStorageService: ConfigStorageService
    ) {
    }

    public getDetails = async (): Promise<IPerson> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.getSettigns().apiEndpoint + "profile/details"
            ).toPromise()).user as IPerson
        )
    };

    public changePassword = async (oldPassword: string, newPassword: string) => {
        (await this.http.post<any>(
            this.configStorageService.getSettigns().apiEndpoint + "profile/details",
            {
                oldPassword, newPassword
            }
        ).toPromise());
    };

    public addFriend = async (userId: string) => {
        (await this.http.post<any>(
            this.configStorageService.getSettigns().apiEndpoint + "friends/add",
            {
                userId
            }
        ).toPromise());
    };

    public removeFriend = async (userId: string) => {
        (await this.http.post<any>(
            this.configStorageService.getSettigns().apiEndpoint + "friends/remove",
            {
                userId
            }
        ).toPromise());
    };

    public getFriends = async (): Promise<Array<IPerson>> => {
        return (await this.http.get<any>(
            this.configStorageService.getSettigns().apiEndpoint + "friends"
        ).toPromise()).friends as Array<IPerson>;
    };

    public getRate = async () => {
        return (await this.http.get<any>(
            this.configStorageService.getSettigns().apiEndpoint + "rate/getNew"
        ).toPromise()).question as IRate;
    };

    public rate = async (rateId: string, choiceId: string) => {
        await this.http.post<any>(
            this.configStorageService.getSettigns().apiEndpoint + "rate/finish",
            {
                rateId, choiceId
            }
        ).toPromise();
    };

    public getFeed = async () => {
        return (await this.http.get<any>(
            this.configStorageService.getSettigns().apiEndpoint + "user/feed"
        ).toPromise()).question as IFeedResponse;
    }
}
