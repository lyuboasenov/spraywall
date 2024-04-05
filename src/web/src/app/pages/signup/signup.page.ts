import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup; // declare it here

  constructor(private auth: AuthService, private router: Router, public formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.pattern("[0-9a-z-A-Z@.]*"),
          Validators.required
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.minLength(8),
          Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
          Validators.required
        ])],
      confpassword: ['',
         Validators.compose([
            Validators.minLength(4),
            Validators.pattern("[0-9a-z-A-Z@.]*"),
            Validators.required
         ])
      ]
    }, { validators: this.confirmPasswordValidator });
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => {
   return control.value.password === control.value.confpassword ? null : { mismatch: true };
  }

  ngOnInit() {
    const user = this.auth.getUser();
    if (user.value) {
      this.router.navigateByUrl('/routes', {replaceUrl: true });
    }
  }

  async onSubmit(formData: any) {
    //todo register

    this.router.navigateByUrl('/', {replaceUrl: true });
  }

}
