import { ObjectSchema } from "realm";

export class Authentication extends Realm.Object<Authentication> {
  _id!: number;
  username?: string;
  password?: string;

  static schema: ObjectSchema = {
    name: "Authentication",
    properties: {
      _id: "int",
      username: "string",
      password: "string",
    },
    primaryKey: "_id",
  };
}

