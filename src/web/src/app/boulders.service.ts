import { Injectable } from '@angular/core';
import { Boulder } from './boulder';

const BOULDERS_REMOTE_URI: string = "https://storage.googleapis.com/spraywall/balkan/boulders-3.json";

@Injectable({
  providedIn: 'root'
})
export class BouldersService {
  public async getAll() : Promise<Boulder[]> {
    const data = await fetch(BOULDERS_REMOTE_URI);
    return await data.json() ?? null;
  }
}
