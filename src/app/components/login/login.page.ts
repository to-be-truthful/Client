import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, ILoginPayload} from "../../providers/auth.service";
import {NavController} from "@ionic/angular";
import {UpdateCheckService} from "../../providers/update-check.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
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
        private navController: NavController,
        private updateCheckService: UpdateCheckService
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ["", Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])]
        })
    }

    onSubmit = async (): Promise<void> => {
        this.loginSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loginLoading = true;
        this.credentials.email = this.loginForm.controls.email.value;
        this.credentials.password = this.loginForm.controls.password.value;

        // Clear password
        this.loginForm.controls.password.setValue("");

        try {
            await this.authService.login(this.credentials);
            this.updateCheckService.loadSocket();
            this.navController.navigateRoot("/app/home");
        } catch (e) {
            console.log(e);
            this.loginError = e;
        }
        this.loginLoading = false;
    };
}
