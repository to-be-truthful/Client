import { Injectable } from '@angular/core';
import {UpdateCheckService} from "./update-check.service";

@Injectable({
  providedIn: 'root'
})
export class OnLoadService {

  constructor(
      private updateCheckService: UpdateCheckService
  ) { }

  public onLoad = async () => {
    this.updateCheckService.loadSocket();
  }
}
