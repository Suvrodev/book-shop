# Welcome to my **Book Shop Project**

**Project Name: `Book Shop`**  
**Live url: https://book-shop-production-3f3b.up.railway.app/**  
[`Click Here To Go Link`](https://book-shop-production-3f3b.up.railway.app/)

## Feature:

- This backend project allows users to store different books in a MongoDB database.
- A schema pattern must be followed for storing book data. The schema includes:

  - **Book Title**
  - **Author Name**
  - **Price**
  - **Category**
  - **Description**
  - **Quantity**
  - **Stock status (whether the book is in stock or not).**  
     **Example:**  
     `post request`

    ```bash
        https://book-shop-production-3f3b.up.railway.app/api/products
    ```

    `request body`

    ```bash
            {
                "title": "The Adventures of Satyajit Ray",
                "author": "Satyajit Ray",
                "price": 12,
                "category": "SelfDevelopment",
                "description": "A collection of stories featuring the famous detective Feluda.",
                "quantity": 11,
                "inStock": true
            }
    ```

- The price and quantity of books cannot have negative values
  - **Allowed categories:** `Fiction`, `Science`, `Self-Development`, `Poetry`, and `Religious`.
  - _Books outside these categories cannot be stored._
- Books will be assigned a `default ID` in the database, along with automatically setting the `date`and `time` of data `insertion` or `modification.`
- Users can fetch all books through the API.

  **Example:**  
   `get request`

  ```bash
  https://book-shop-production-3f3b.up.railway.app/api/products
  ```

- Users can fetch a specific book using its unique ID stored in the database.
  **Example**  
   `get request`
  ```bash
  https://book-shop-production-3f3b.up.railway.app/api/products/6740af1fa6f5a2d7213d3413
  ```
- Users can fetch all books under a specific category.
  - **Categories must be:** `Fiction`, `Science`, `Self-Development`, `Poetry`, or `Religious`.
- Users can delete any book by providing the book's specific `ID`.  
  **Example**  
  `delete request`
  ```bash
    https://book-shop-production-3f3b.up.railway.app/api/products/6740affba6f5a2d7213d341dd
  ```
- Users can update any book using its specific `ID`.
  **Example**  
   `put request`
  ```bash
   https://book-shop-production-3f3b.up.railway.app/api/products/6740b032a6f5a2d7213d3423
  ```
  `request body`
  ```bash
  {
    "price": 50,
    "quantity": 150
  }
  ```
  - During updates, the update time will be automatically recorded in the database.
- A user can place an order for a book by providing:

  - **Email**
  - **Book ID**
  - **Quantity**
  - **Price**
  - _Correct price for the ordered quantity._ -  
     **Condition** - The book ID must be valid. - The quantity ordered cannot exceed the available quantity in stock - And stock status must be true  
     **Example:**

    `post request`

    ```bash
    https://book-shop-production-3f3b.up.railway.app/api/orders
    ```

    `request body`

    ```bash
    {
        "email": "chaderpaharkinbo@gmail.com",
        "product": "6740b032a6f5a2d7213d3423",
        "quantity": 7,
        "totalPrice": 350
    }
    ```

- When an order is placed, the ordered quantity will be deducted from the book's quantity in the database.
- If the quantity of a book becomes `0`, the database will automatically set its inStock status to `false`.
- The API allows users to view the total revenue by calculating the sum of the total price of all ordered books.  
  **Example**  
   `get request`
  ```bash
  https://book-shop-production-3f3b.up.railway.app/api/orders/revenue
  ```

## Technology I have used:

- **npm**: I used npm (Node Packege Manager) to easily install, update, and manage the required packages and libraries in the project.
- **Express.js**: For server-side development.
- **MongoDB**: Database used for storing data.
- **Mongoose**: Used for database validation.
- **TypeScript**: Programming language used for type safety and better code maintainability.
- **dotenv**: For managing environment variables.
- **cors**: For handling cross-origin requests and security.
- **nodemon**: For auto-restarting the server after code changes.
- **zod**: For data validation.
- **Railway**: For deploying the code to a cloud server.
- **MongoDB Compass**: For check database more fast.
- **No sql booster**: For check mongodb query.
