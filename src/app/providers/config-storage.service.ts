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
            apiEndpoint: "http://172.20.10.6:8080/api/v1/",
            socketEndpoint: "http://172.20.10.6:8080/"
        }
    }
}
