import { Model } from "objection";

class Book extends Model {
  static get tableName() {
    return "books";
  }
}

export { Book };
