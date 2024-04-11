import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
   providedIn: 'root'
 })
 class PermissionsService {

   constructor(private router: Router, private authService: AuthService, private alertCtrl: AlertController) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     // Get the potentially required role from the route
    const expectedRole = next.data?.['role'] || null;
    const user = this.authService.user;

    if (!user.value) {
      // this.showAlert();
      return false;
    } else {
      if (!expectedRole || user.value.hasPermission(expectedRole)) {
        return true;
      } else {
        this.showAlert();
        return false;
      }
    }
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'You are not authorized to visit that page!',
      buttons: ['OK']
    });
    await alert.present();

    this.router.navigateByUrl('/');
  }
 }

 export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
   return inject(PermissionsService).canActivate(next, state);
 }
