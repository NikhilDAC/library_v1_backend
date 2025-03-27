import { Model } from "objection";

class Address extends Model {
  static get tableName() {
    return "addresses";
  }
}

export { Address };
