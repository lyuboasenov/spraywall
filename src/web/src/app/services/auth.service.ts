import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageProxyService } from './storage-proxy.service'


const TOKEN_KEY = 'user-token';

export interface User {
   name: string;
   role: string;
   permissions: string[];
}


@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

   constructor(private router: Router, private storageProxy: StorageProxyService) {
      this.loadUser();
   }

   async loadUser() {
      // Normally load e.g. JWT at this point
      const token = await this.storageProxy.storage.get(TOKEN_KEY);

      if (token) {
         this.currentUser.next(JSON.parse(token));
      } else {
         this.currentUser.next(null);
      }
   }

   async signIn(name: string): Promise<BehaviorSubject<User | null>> {
      // Local Dummy check, usually server request!
      let userObj: User | undefined = undefined;

      if (name === 'user') {
         userObj = {
            name: 'Tony Test',
            role: 'USER',
            permissions: ['read']
         };
      } else if (name === 'admin') {
         userObj = {
            name: 'Adam Admin',
            role: 'ADMIN',
            permissions: ['read', 'write']
         };
      } else if (name === 'service') {
        userObj = {
           name: 'Service Account',
           role: 'SERVICE_USER',
           permissions: ['read']
        };
     }

      if (userObj) {
         await this.storageProxy.storage.set(TOKEN_KEY, JSON.stringify(userObj));
         this.currentUser.next(userObj);
      } else {
         this.currentUser.next(null);
      }

      return this.currentUser;
   }

   // Access the current user
   getUser(): BehaviorSubject<User | null> {
      return this.currentUser;
   }

   // Remove all information of the previous user
   async logout() {
      await this.storageProxy.storage.remove(TOKEN_KEY);

      this.currentUser.next(null);
      this.router.navigateByUrl('/', { replaceUrl: true });
   }

   // Check if a user has a certain permission
   hasPermission(permissions: string[]): boolean {
      for (const permission of permissions) {
         if (!this.currentUser.value) {
            return false;
         } else if (<User>this.currentUser.value) {
            const u = (<User>this.currentUser.value);
            if (!u.permissions.includes(permission)) {
               return false;
            }
         }
      }
      return true;
   }
}
