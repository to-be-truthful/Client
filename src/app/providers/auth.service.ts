import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigStorageService} from "./config-storage.service";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IRegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    gender: Gender;
}

export interface ITokenContents {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    id: string;
    exp: number;
}

export interface IAuthResponse {
    token: string;
    firstName: string;
    lastName: string;
    id: string;
    username: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private httpService: HttpClient,
        private configStorageService: ConfigStorageService
    ) {
    }

    private _cachedAuthResponse: IAuthResponse;

    get cachedAuthResponse(): IAuthResponse {
        if (!this._cachedAuthResponse) {
            if (localStorage.getItem('session') === undefined) {
                return undefined;
            }
            this._cachedAuthResponse = JSON.parse(localStorage.getItem('session'));
        }
        return this._cachedAuthResponse;
    }

    set cachedAuthResponse(value: IAuthResponse) {
        this._cachedAuthResponse = value;
        if (value === undefined) { // We're logging out
            localStorage.removeItem('session');
        } else {
            localStorage.setItem('session', JSON.stringify(value));
        }
    }

    public login = async (loginPayload: ILoginPayload): Promise<void> => {
        const res: any = await this.httpService.post(this.configStorageService.getSettigns().apiEndpoint + "user/login", loginPayload).toPromise();
        console.log("res: " + JSON.stringify(res));
        this.cachedAuthResponse = res.user as IAuthResponse;
    };

    public register = async (registerPayload: IRegisterPayload): Promise<void> => {
        await this.httpService.post(this.configStorageService.getSettigns().apiEndpoint + "user/register", registerPayload).toPromise();
    };

    public logout = (): void => {
        this.cachedAuthResponse = undefined;
    };

    public checkLoggedIn = (): boolean => {
        const user = this.cachedAuthResponse;
        if (user && user.token) {
            const payload = user.token.split('.')[1];
            const validatedPayload: ITokenContents = JSON.parse(window.atob(payload));
            return validatedPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
}
