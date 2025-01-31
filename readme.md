# Welcome to my **Boundless Reads Book Shop Project**

**Project Name: `Boundless Reads Book Shop`**  
**Live url: https://book-shop-server-blue.vercel.app/**  
[`Click Here To Go Link`](https://book-shop-server-blue.vercel.app)

## Feature:

- This backend project allows users to store different books in a MongoDB database.
- That why he has to register at first

  - `Register url`

  ```
    https://book-shop-server-blue.vercel.app/api/auth/register
  ```

  - Method: `Post`

  - body

  ```
    {
      "name": "Suvrodeb Howlader",
      "email": "suvro111@gmail.com",
      "password": "123456",
      "role": "user"
    }
  ```

- Then he has to login

  ```
    https://book-shop-server-blue.vercel.app/api/login
  ```

  - Method: `Post`

  - body

  ```
   {
    "email" : "suvrodev.cse@yahoo.com",
    "password" : "123456"
  }
  ```

- If login successfully then he get a token and by token can add book as well as all other operation

- A schema pattern must be followed for insert book data. The schema includes:

  - **Book Title**
  - **Author Name**
  - **Brand**
  - **Model**
  - **Price**
  - **Image**
  - **Category**
  - **Description**
  - **Quantity**
  - **Ref User**
  - **Stock status (whether the book is in stock or not).**
    **Example:**
    `post request`

    ```bash
        https://book-shop-server-blue.vercel.app/api/products
    ```

    `request body`

    ```bash
            {
                "title": "The Adventures of Satyajit Ray",
                "author": "Satyajit Ray",
                "Brand": "Check Brand",
                "Model": "Model-123",
                "price": 12,
                "category": "SelfDevelopment",
                "description": "A collection of stories featuring the famous detective Feluda.",
                "quantity": 11,
                "inStock": true
                "Ref User": "Ref User"
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
     https://book-shop-server-blue.vercel.app/api/products
  ```

- Users can fetch all books under a specific category or title or author

  **Example**
  `get request with query params`

  ```bash
  https://book-shop-server-blue.vercel.app/api/products?searchTerm=Gitanjali
  ```

  or,

  ```bash
  https://book-shop-server-blue.vercel.app/api/products?searchTerm=Kazi Nazrul Islam
  ```

  or,

  ```bash
  https://book-shop-server-blue.vercel.app/api/products?searchTerm=Fiction
  ```

  - **Categories must be:** `Fiction`, `Science`, `Self-Development`, `Poetry`, or `Religious`.

- without these people can show book by filterring and sorting

  ```bash
       https://book-shop-server-blue.vercel.app/api/products?page=1&sortBy=price&searchTerm=Science&minPrice=230&inStock=true&maxPrice=250&category=Science&sortOrder=asc
  ```

- Users can fetch a specific book using its unique ID stored in the database.
  **Example**
  `get request`

  ```bash
  https://book-shop-server-blue.vercel.app/api/products/6740af1fa6f5a2d7213d3413
  ```

- Users can delete any book by providing the book's specific `ID`.
  **Example**
  `delete request`
  ```bash
    https://book-shop-server-blue.vercel.app/api/products/6740affba6f5a2d7213d341dd
  ```
- Users can update any book using its specific `ID`.
  **Example**
  `put request`
  ```bash
   https://book-shop-server-blue.vercel.app/api/products/6740b032a6f5a2d7213d3423
  ```
  `request body`
  ```bash
  {
    "price": 50,
    "quantity": 150
  }
  ```
  - During updates, the update time will be automatically recorded in the database.
- A User Can Add book in cart
  `post`

  ```
     baseurl/cart
  ```

  ```bash
  {
    "bookId" : "679a7f8c9ec61813772f80d5",
    "userId" : "6796762e6369c16673ef39ca",
    "quantity":20,
    "price":120
  }
  ```

  - A User Can Retrive his owm cart, by
    `url` :

  ```bash
   baseurl/cart/userId
  ```

  - A User Can Delete owm cart
    `delete`

  ```bash
    baseurl/cart/cartId
  ```

- From own cart a user can place an order for a book by providing price:

  `post request`

  ```bash
    https://book-shop-server-blue.vercel.app/api/payment/initiate
  ```

  `request body`

  ```bash
    {
      "cartId":"67973425dd5734ba297ff2cb",
      "userId":"6797049138ae0fc1ffca5165",
      "productId":"6797050b38ae0fc1ffca516b",
      "price":"25"
    }
  ```

- If Payment in successfull the User can see their own order  
   `get Request`

  ```bash
    baseurl/payment/payment/6796762e6369c16673ef39ca
  ```

- From Order user can delete their order  
   `get Request`

  ```bash
    baseurl/payment/payment/679a96d7880360b67e28f05d
  ```

- A user also can change their password  
   `get Request`

  ```bash
    baseurl/auth/updatepassword/userId
  ```

  `body`

  ```bash
  {
    "oldPassword":"123456",
    "newPassword":"1234567"
  }
  ```

- In my project also have a admin work
- The user who is admin he can check all user
  `get`
  ```
    /auth/allusers
  ```
- An admin can remove user
  `delete`
  ```
    baseurl/auth/allusers/679a8e1533e69a45eb09a616
  ```
- An admin can make a user admin and make user from admin
  `patch`
  ```
    baseurl/auth/allusers/userId
  ```
  `request body`
  ```
    {
      "role":"user"
    }
  ```
- An admin can Check All Order
  `get`
  ```
    baseurl/payment/admin/payment
  ```
- An admin can delete any order of any user
  `delete`
  ```
    baseurl/payment/admin/orderId
  ```
- An admin can confim order
  `patch`

  ```
    baseurl/payment/admin/update/orderId
  ```

  `request body`

  ```
    {
    "adminApproval": "pending"
  }
  ```

## Technology I have used:

- **npm**: I used npm (Node Packege Manager) to easily install, update, and manage the required packages and libraries in the project.
- **Express.js**: For server-side development.
- **MongoDB**: Database used for storing data.
- **Mongoose**: Used for database validation.
- **TypeScript**: Programming language used for type safety and better code maintainability.
- **dotenv**: For managing environment variables.
- **cors**: For handling cross-origin requests and security.
- **sslcommerz**: For securated payment gateway.
- **nodemon**: For auto-restarting the server after code changes.
- **zod**: For data validation.
- **Bcrypt**: For secure user password.
- **vercel**: For deploying the code to a cloud server.
- **MongoDB Compass**: For check database more fast.
- **No sql booster**: For check mongodb query.
