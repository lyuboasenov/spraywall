import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log();
  }

  async signIn(userName: string) {
   const user = await this.auth.signIn(userName);
   // You could now route to different pages
   // based on the user role
   // let role = user['role'];

   this.router.navigateByUrl('/routes', {replaceUrl: true });
 }
}
