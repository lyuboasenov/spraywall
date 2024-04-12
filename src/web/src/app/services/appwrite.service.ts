import { Injectable } from '@angular/core';
import { Account, Client } from 'appwrite';
import { StorageProxyService } from './storage-proxy.service';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {
  public client: Client;
  public DatabaseId: string = environment.AppWrite.DatabaseId;

  constructor(private storageProxy: StorageProxyService) {
    this.client = new Client();

    this.client
      .setEndpoint(environment.AppWrite.Endpoint)
      .setProject(environment.AppWrite.ProjectId);
  }

  async destroy() {
    this.client = new Client();
    this.client
      .setEndpoint(environment.AppWrite.Endpoint)
      .setProject(environment.AppWrite.ProjectId);
  }
}
