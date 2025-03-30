import { Injectable } from '@angular/core';

type getDelegate = (arg: string) => Promise<object | null>;

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private _cache: Map<string, object | null> = new Map<string, object | null>();

  constructor() {
  }

  public async get(key: string, delegate: getDelegate) : Promise<object | null> {
    if (!this._cache.has(key)) {
      this._cache.set(key, await delegate(key));
    }

    return this._cache.get(key) ?? null;
  }
}

