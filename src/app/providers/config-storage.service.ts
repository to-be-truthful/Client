import { Injectable } from '@angular/core';


export interface IConfig {
  apiEndpoint: string
}

@Injectable({
  providedIn: 'root'
})

export class ConfigStorageService {

  constructor() { }

  public getSettigns = (): IConfig => {
    return {
      apiEndpoint: "http://localhost:8080/api/v1/"
    }
  }
}
