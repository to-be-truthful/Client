import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {APIService, IRate} from "../../providers/api.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  public loading: boolean;
  public question: IRate;

  constructor(
      private route: ActivatedRoute,
      private apiService: APIService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(paramsMap => {
      this.apiService.getPastRate(paramsMap["params"]["id"]).then(rate => {
        this.question = rate;
        this.loading = false;
        console.log(rate);
      })
    });
  }

}
