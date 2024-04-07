import { Injectable } from '@angular/core';
import { Account, Client } from 'appwrite';
import { StorageProxyService } from './storage-proxy.service';

const TOKEN_KEY = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {
  public client: Client;

  constructor(private storageProxy: StorageProxyService) {
    this.client = new Client();

    this.client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('66105e1a8ea8410c3f42');

    this.loadJWT();
  }

  async loadJWT() {
    let token = await this.storageProxy.storage.get(TOKEN_KEY);

    if (!token) {
      const account = new Account(this.client);
      const jwt = await account.createJWT();
      token = jwt.jwt;
      await this.storageProxy.storage.set(TOKEN_KEY, token);
    }

    // this.client.setJWT(token);
  }

  async destroy() {
    console.log('AppwriteService.destroy')
    this.client = new Client();
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('66105e1a8ea8410c3f42');
  }
}
