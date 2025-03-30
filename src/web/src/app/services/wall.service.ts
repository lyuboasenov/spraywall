import { Injectable } from '@angular/core';
import { Databases, Query, Models } from 'appwrite';
import { AppwriteService } from './appwrite.service';
import { environment } from 'src/environments/environment';
import { Wall } from '../models/wall/wall';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  private _db: Databases;
  private readonly _collectionId = environment.AppWrite.Collections.Walls;

  constructor(private appwrite: AppwriteService) {
    this._db = new Databases(this.appwrite.client);
  }

  public async getAll(gymId: string): Promise<Wall[]> {
    let array: Wall[] = [];

    let query = [];
    query.push(Query.limit(100000));
    query.push(Query.equal("Active", [true]));
    query.push(Query.orderAsc("Name"));

    const all = await this._db.listDocuments(
      this.appwrite.DatabaseId,
      this._collectionId,
      query);

    for (let w of all.documents) {
      if (w['gym'].$id == gymId) {
        array.push(this.deserialize(w));
      }
    }

    return array;
  }

  public async getById(id: string): Promise<Wall | null> {
    const item = await this._db.getDocument(
      this.appwrite.DatabaseId,
      this._collectionId,
      id);

    return this.deserialize(item);
  }

  private deserialize(doc: Models.Document): Wall {
    return {
      Id: doc.$id,
      Name: doc['Name'],
      TemplateURL: doc['TemplateURL'],
      Description: doc['Description'],
      SupportsLED: doc['SupportsLED'],
      Angles: doc['Angles']?.split(',').map(Number)
    }
  }
}
