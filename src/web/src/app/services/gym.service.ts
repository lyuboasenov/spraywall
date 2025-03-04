import { Injectable } from '@angular/core';
import { Databases, Query, Models } from 'appwrite';
import { AppwriteService } from './appwrite.service';
import { environment } from 'src/environments/environment';
import { Gym } from '../models/gym/gym';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  private _db: Databases;
  private readonly _gymsCollectionId = environment.AppWrite.Collections.Gyms;

  constructor(private appwrite: AppwriteService) {
    this._db = new Databases(this.appwrite.client);
  }

  public async getAll(): Promise<Gym[]> {
    let gymArray: Gym[] = [];

    let query = [];
    query.push(
      Query.limit(100000)
    );
    query.push(
      Query.orderAsc("Name")
    );

    const allGyms = await this._db.listDocuments(
      this.appwrite.DatabaseId,
      this._gymsCollectionId,
      query);

    for (let g of allGyms.documents) {
      gymArray.push(this.deserialize(g));
    }

    return gymArray;
  }

  public async getById(id: string): Promise<Gym | null> {
    const gym = await this._db.getDocument(
      this.appwrite.DatabaseId,
      this._gymsCollectionId,
      id);

    return this.deserialize(gym);
  }

  private deserialize(doc: Models.Document): Gym {
    return {
      Id: doc.$id,
      Name: doc['Name'],
      Description: doc['Description'],
      Location: doc['Location'],
      Address: doc['Address'],
      Logo: doc['Logo']
    }
  }
}
