import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../providers/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
      private routerService: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.cachedAuthResponse = undefined;
    this.routerService.navigateByUrl('/app/login');
  }

}
