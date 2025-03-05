import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup; // declare it here

  constructor(private auth: AuthService, private router: Router, public formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.formGroup = formBuilder.group({
      email: [
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

  async ngOnInit() {
    if (this.auth.user.value) {
      this.router.navigateByUrl('/gyms');
    }
    this.auth.user.subscribe(next => {
      if (next) {
         this.router.navigateByUrl('/gyms');
      }
    });
  }

  async onSubmit(formData: any) {
    try {
      const user = await this.auth.login(formData.email, formData.password);

      if (user) {
        this.router.navigateByUrl('/gyms');
      }
    } catch (e) {
      let alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Error occurred while logging in!',
        buttons: ['OK']
      });
      console.error(e);
      await alert.present();
    }

  }
}
