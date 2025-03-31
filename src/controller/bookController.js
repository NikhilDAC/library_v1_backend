import { Book } from "../models/book.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { uploadToCloudinery } from "../utils/cloudinery.js";

const addBook=async function addNewBook(req, res) {
//   try {
    console.log("[info]: inside the add new book method");
    const{ 
        book_name,
        book_author,
        category,
        book_price,
        quantity
    }=req.body
    console.log(
      req.body.book_name,
      req.body.book_author,
      req.body.category,
      req.body.book_price,
      req.body.quantity
    );

    // insert check the validation for input

    if (
      [book_name, book_author, category, book_price, quantity].some(
        (field) => field.trim() === ""
      )
    ) {
      throw new ApiError(403, "Book's input fields are missing...");
    }

    // file validation
    console.log(req.file);
    
    if (!req.file) {
      throw new ApiError(402, "Book image not found");
    }
    const localPath = req.file?.path;
    const response =await uploadToCloudinery(localPath);
    console.log("Cloudinerry Response:", response);

    // insert the book details into book column
    const book = await Book.query()
      .insert({
        book_name: book_name,
        book_author: book_author,
        category: category,
        book_price: book_price,
        cover_image: response?.url ||"",
        quantity: quantity,
        person_id: 1,
      })
      .debug();

    return res.status(200).json(
      new ApiResponse(200, "Book record added..", {
        id: book.id,
        book_name: book.book_name,
        book_author: book.book_author,
        book_price: book.book_price,
      })
    );
//   } catch (error) {
//     throw new ApiError(
//       403,
//       `Something went wrong while inserting book record:${error.message}`
//     );
//   }
}

export { addBook };
