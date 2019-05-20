import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, Gender, IRegisterPayload} from "../../providers/auth.service";
import {NavController} from "@ionic/angular";
import {PasswordValidation} from "../../password.validation";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    registerLoading: boolean = false;
    registerSubmitted: boolean = false;
    registerError: string;

    credentials: IRegisterPayload = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: '',
        gender: Gender.OTHER
    };

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private navController: NavController
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ["", Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
            confirmPassword: ["", Validators.required],
            firstName: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
            lastName: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
            username: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
            gender: [Gender.MALE, Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword
        })
    }

    onSubmit = async (): Promise<void> => {
        this.registerSubmitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        this.registerLoading = true;
        this.credentials.email = this.registerForm.controls.email.value;
        this.credentials.password = this.registerForm.controls.password.value;
        this.credentials.firstName = this.registerForm.controls.firstName.value;
        this.credentials.lastName = this.registerForm.controls.lastName.value;
        this.credentials.username = this.registerForm.controls.username.value;
        this.credentials.gender = this.registerForm.controls.gender.value;

        try {
            await this.authService.register(this.credentials);
            this.navController.navigateForward("/app/login");
        } catch (e) {
            console.log(e);
            this.registerError = e;
        }
        this.registerLoading = false;
    }
}
