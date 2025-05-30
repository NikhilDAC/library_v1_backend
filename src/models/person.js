import { Model } from "objection";
import becrypt from "bcrypt";
import { Book } from "./book.js";
import { BookRecords } from "./book_records.js";
import { Address } from "./address.js";
import jwt from "jsonwebtoken";
class Person extends Model {
  static get tableName() {
    return "persons";
  }

  static get relationMappings() {
    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: "persons.id",
          to: "books.person_id",
        },
      },
      bookRecords: {
        relation: Model.HasOneRelation,
        modelClass: BookRecords,
        join: {
          from: "persons.id",
          to: "bookRecords.person_id",
        },
      },
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: "persons.id",
          to: "addresses.person_id",
        },
      },
    };
  }

  // add method to hash password
  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
    if (this.password) {
      this.password = await becrypt.hash(this.password, 10);
    }
  }

  async $beforeUpdate(opt) {
    this.updated_at = new Date();
    // check if password is being updated
    if (this.password && opt.old.password !== this.password) {
      this.password = await becrypt.hash(this.password, 10);
    }
  }

  // add method to check password
  async validatePassword(plainPassword) {
    return await becrypt.compare(plainPassword, this.password);
  }

  // add method to generate the token
  generateAccessToken() {
    return jwt.sign(
      { id: this.id, role: this.role, email: this.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
  }
  //generate refresh token
  generateRefreshToken() {
    return jwt.sign(
      { id: this.id, role: this.role, email: this.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
  }
}

export { Person };
