import express from "express";
import UserModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticationMiddleware } from "../middleware/index.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // check if the user already exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // create the user
    await UserModel.create(req.body);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/*
The selected code is an asynchronous function that handles the route for user registration in a Node.js application using Express.js. It follows the standard registration flow by checking if the user already exists, hashing the password, and creating a new user in the database.

Here's a breakdown of the code:

1. The function is defined as an asynchronous function using the `async` keyword.
2. Inside the function, a try-catch block is used to handle any potential errors.
3. The `UserModel.findOne({ email: req.body.email })` method is used to check if a user with the provided email already exists in the database. If the user exists, a JSON response with a status code of 400 and a message "User already exists" is sent.
4. If the user does not exist, the `bcrypt.hash()` method is used to hash the provided password. The hashed password is then assigned back to `req.body.password`.
5. The `UserModel.create(req.body)` method is used to create a new user in the database using the data from the request body.
6. A JSON response with a status code of 201 and a message "User created successfully" is sent.
7. If an error occurs during the process, it is caught in the catch block, and a JSON response with a status code of 500 and an error message is sent.

This code demonstrates how to handle user registration in a secure and efficient manner by using asynchronous functions, error handling, and password hashing.
*/
router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // compare the password
    const passwordsMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordsMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create a jwt token and return it
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || empower-fund-mern,
      { expiresIn: "24h" }
    );

    return res
      .status(200)
      .json({ token, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/*
The selected code is an asynchronous function that handles the route for user login in a Node.js application using Express.js. It follows the standard authentication flow by checking if the user exists, comparing the password, and creating a JSON Web Token (JWT) for authentication.

Here's a breakdown of the code:

1. The function is defined as an asynchronous function using the `async` keyword.
2. Inside the function, a try-catch block is used to handle any potential errors.
3. The `UserModel.findOne({ email: req.body.email })` method is used to check if a user with the provided email exists in the database. If the user does not exist, a JSON response with a status code of 400 and a message "User does not exist" is sent.
4. If the user exists, the `bcrypt.compare()` method is used to compare the provided password with the hashed password stored in the database. If the passwords do not match, a JSON response with a status code of 400 and a message "Invalid credentials" is sent.
5. If the passwords match, the `jwt.sign()` method is used to create a JWT token with the user's ID and email. The JWT token is signed using a secret key stored in the environment variables (`process.env.JWT_SECRET`). The token has an expiration time of 24 hours.
6. The JWT token is then sent as a JSON response with a status code of 200 and a message "User logged in successfully".
7. If an error occurs during the process, it is caught in the catch block, and a JSON response with a status code of 500 and an error message is sent.

This code demonstrates how to handle user login in a secure and efficient manner by using asynchronous functions, error handling, and JWT authentication.
*/
router.get("/current-user", authenticationMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/*
The selected code is an asynchronous function that handles the route for retrieving the current user from the database based on the user's ID obtained from the JWT token. It uses the `UserModel` to find the document with the matching ID and selects the `-password` field to exclude the password from the response.

Here's a breakdown of the code:

1. The function is defined as an asynchronous function using the `async` keyword.
2. Inside the function, a try-catch block is used to handle any potential errors.
3. The `req.user.userId` property is used to obtain the user's ID from the request object.
4. The `UserModel.findById(userId)` method is used to retrieve the document with the matching ID from the collection.
5. The `.select("-password")` method is chained to exclude the `password` field from the response.
6. The retrieved user is then sent as a JSON response with a status code of 200.
7. If an error occurs during the process, it is caught in the catch block, and a JSON response with a status code of 500 and an error message is sent.

This code demonstrates how to retrieve the current user from the database while excluding sensitive information.
*/

router.get("/all-users", authenticationMiddleware, async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password")
      .sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
/*
The selected code is an asynchronous function that handles the route for retrieving all users from the database. It uses the `UserModel` to find all documents in the collection, selects the `-password` field to exclude the password from the response, and sorts the results by the `createdAt` field in descending order.

Here's a breakdown of the code:

1. The function is defined as an asynchronous function using the `async` keyword.
2. Inside the function, a try-catch block is used to handle any potential errors.
3. The `UserModel.find()` method is used to retrieve all documents from the collection.
4. The `.select("-password")` method is chained to exclude the `password` field from the response.
5. The `.sort({ createdAt: -1 })` method is chained to sort the results by the `createdAt` field in descending order.
6. The retrieved users are then sent as a JSON response with a status code of 200.
7. If an error occurs during the process, it is caught in the catch block, and a JSON response with a status code of 500 and an error message is sent.

This code demonstrates how to retrieve all users from the database while excluding sensitive information and sorting the results based on a specific field.
*/