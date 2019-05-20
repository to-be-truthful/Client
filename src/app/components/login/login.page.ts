import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, ILoginPayload} from "../../providers/auth.service";
import {Router} from "@angular/router";
import {IonApp, NavController} from "@ionic/angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    loginLoading: boolean = false;
    loginSubmitted: boolean = false;
    loginError: string;

    credentials: ILoginPayload = {
        email: '',
        password: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private navController: NavController
    ) {
    }

    ngOnInit() {
        console.log("made form");
        this.loginForm = this.formBuilder.group({
            email: ["", Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])]
        })
    }

    onSubmit = async (): Promise<void> => {
        console.log("hello!")
        this.loginSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loginLoading = true;
        this.credentials.email = this.loginForm.controls.email.value;
        this.credentials.password = this.loginForm.controls.password.value;

        try {
            await this.authService.login(this.credentials);
            this.navController.navigateForward("/app/home");
        } catch (e) {
            console.log(e);
            this.loginError = e;
        }
        this.loginLoading = false;
    }
}
