import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppwriteService } from './appwrite.service';
import { Account, ID, Models } from 'appwrite';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StorageProxyService } from './storage-proxy.service';


const TOKEN_KEY = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private account: Account;
  public user : BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor(private router: Router, private appwrite: AppwriteService, private storageProxy: StorageProxyService) {
    this.account = new Account(appwrite.client);
    this.loadUser();
  }

  async loadUser() {
    // Normally load e.g. JWT at this point
    const token = await this.storageProxy.storage.get(TOKEN_KEY);

    if (token) {
      const user = await this.getUser();
      this.user.next(user);
    }
 }

  // Access the current user
  async getUser(): Promise<Models.User<Models.Preferences>> {
    const user = this.account.get();
    this.user.next(user);

    return user;
  }

  async signup(email: string, password: string, name: string) {
    await this.account.create(ID.unique(), email, password, name);
    return await this.login(email, password);
  }

  async login(email: string, password: string) {
    await this.account.createEmailPasswordSession(email, password);
    this.user.next(await this.getUser());

    return this.user;
  }

  // Remove all information of the previous user
  async logout() {
    await this.account.deleteSession('current');
    await this.storageProxy.storage.remove(TOKEN_KEY);
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
