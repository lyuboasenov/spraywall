import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
        ])
      ]
    });
  }

  ngOnInit() {
    const user = this.auth.getUser();
    if (user.value) {
      this.router.navigateByUrl('/routes', {replaceUrl: true });
    }
  }

  async signIn(userName: string) {
   const user = await this.auth.signIn(userName);
   // You could now route to different pages
   // based on the user role
   // let role = user['role'];

   this.router.navigateByUrl('/routes', {replaceUrl: true });
 }

 async onSubmit(formData: any) {
    const user = await this.auth.signIn(formData.username);
    // You could now route to different pages
    // based on the user role
    // let role = user['role'];

    this.router.navigateByUrl('/routes', {replaceUrl: true });
  }
}
