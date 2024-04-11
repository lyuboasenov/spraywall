import { Models } from "appwrite";

export class User {
  get name(): string {
    return this._user?.name
  }

  constructor(private _user: Models.User<Models.Preferences>) {

  }
}
