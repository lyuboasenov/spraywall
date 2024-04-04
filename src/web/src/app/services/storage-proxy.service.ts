import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageProxyService {
  constructor(public storage: Storage) {
      storage.create();
  }
}
