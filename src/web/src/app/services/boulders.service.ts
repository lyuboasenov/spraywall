import { Injectable } from '@angular/core';
import { Boulder } from '../models/boulder';

const BOULDERS_REMOTE_URI: string = "https://storage.googleapis.com/spraywall/balkan/boulders-3.json";

@Injectable({
  providedIn: 'root'
})
export class BouldersService {
  private boulders?: Boulder[];

  public async getAll() : Promise<Boulder[]> {
    if (!this.boulders) {
      const data = await fetch(BOULDERS_REMOTE_URI);
      this.boulders = await data.json();
    }

    return this.boulders ?? [];
  }
}
