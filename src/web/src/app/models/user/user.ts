import { Models } from "appwrite";

export class User {
  get id(): string {
    return this._user.$id;
  }

  get name(): string {
    return this._user?.name;
  }

  constructor(private _user: Models.User<Models.Preferences>) {

  }

  hasPermission(permission: string): boolean {
    return this._user.labels.includes(permission);
  }

  hasPermissions(permissions: string[]): boolean {
    for (const permission of permissions) {
      if (!this._user.labels.includes(permission)) {
        return false;
      }
    }
    return true;
  }
}
