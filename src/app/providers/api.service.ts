import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigStorageService} from "./config-storage.service";
import {Gender} from "./auth.service";

export interface IPerson {
    email?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    _id?: string;
    passwordHash?: string;
    gender: Gender
}

export interface IAccountResponse {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    id: string;
    gender: Gender
}

export interface IFeedResponse {
    rates: Array<ISkimmedRate>;
    notifs: Array<INotif>;
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
    personFrom: IPerson;
    choices: Array<IPerson>;
    question: IQuestion;
    date: string;
    shown: boolean;
    _id: string;
    decidedChoice?: string;
}

export interface ISkimmedRate {
    personFrom: IPerson;
    choices: Array<string>;
    question: string;
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

    public getDetails = async (): Promise<IAccountResponse> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.getSettigns().apiEndpoint + "profile/details"
            ).toPromise()).user as IAccountResponse
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

    public addFriend = async (username: string) => {
        (await this.http.post<any>(
            this.configStorageService.getSettigns().apiEndpoint + "friends/add",
            {
                username
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

    public getNewRate = async () => {
        return (await this.http.get<any>(
            this.configStorageService.getSettigns().apiEndpoint + "rate/getNew"
        ).toPromise()).question as IRate;
    };

    public getPastRate = async (rateId: string) => {
        return (await this.http.post<any>(
            this.configStorageService.getSettigns().apiEndpoint + "rate/getPast",
            {
                rateId
            }
        ).toPromise()).rate as IRate;
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
        ).toPromise()) as IFeedResponse;
    }
}
