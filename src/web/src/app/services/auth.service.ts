import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppwriteService } from './appwrite.service';
import { Account, ID, Models } from 'appwrite';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StorageProxyService } from './storage-proxy.service';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private account: Account;
  public user : BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private router: Router, private appwrite: AppwriteService, private storageProxy: StorageProxyService) {
    this.account = new Account(appwrite.client);
    this.loadUser();
  }

  async loadUser() {
    try {
      const apiUser = await this._getUser();
      this.user.next(new User(apiUser));
    } catch (e) {
      // silently continue
    }
 }

  // Access the current user
  private async _getUser(): Promise<Models.User<Models.Preferences>> {
    const user = this.account.get();
    return user;
  }

  async signup(email: string, password: string, name: string) {
    await this.account.create(ID.unique(), email, password, name);
    return await this.login(email, password);
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const session = await this.account.createEmailSession(email, password);
      const apiUser = await this._getUser();

      this.user.next(new User(apiUser));
    } catch (e) {
      this.user.next(null);
      throw e;
    }

    return this.user.value;
  }

  // Remove all information of the previous user
  async logout() {
    await this.account.deleteSession('current');
    await this.appwrite.destroy();

    this.user.next(null);

    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  // Check if a user has a certain permission
  hasPermission(permissions: string[]): boolean {
    // for (const permission of permissions) {
    //   if (!this.currentUser.value) {
    //     return false;
    //   } else if (<User>this.currentUser.value) {
    //     const u = (<User>this.currentUser.value);
    //     if (!u.permissions.includes(permission)) {
    //       return false;
    //     }
    //   }
    // }
    return true;
  }
}
