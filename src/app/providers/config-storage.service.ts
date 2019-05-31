import {Injectable} from '@angular/core';


export interface IConfig {
    apiEndpoint: string,
    socketEndpoint: string
}

@Injectable({
    providedIn: 'root'
})

export class ConfigStorageService {

    constructor() {
    }

    public getSettigns = (): IConfig => {
        return {
            apiEndpoint: "https://api.tbt.notalec.com/api/v1/",
            socketEndpoint: "https://api.tbt.notalec.com/"
        }
    }
}
