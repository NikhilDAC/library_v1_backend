import { Model } from "objection";

class BookRecords extends Model{
    static get tableName(){
        return "book_records"
    }
}

export {BookRecords}