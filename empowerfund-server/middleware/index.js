import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const cookies = req.cookies
    const token = cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decodedUserObject = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedUserObject) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = decodedUserObject;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
/*import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log("Cookies:", cookies);  // Debugging log
    
    const token = cookies?.token;
    console.log("Token:", token);  // Debugging log
    
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    
    const decodedUserObject = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User Object:", decodedUserObject);  // Debugging log
    
    if (!decodedUserObject) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    
    req.user = decodedUserObject;
    next();
  } catch (error) {
    console.error("Error in authenticationMiddleware:", error);  // Debugging log
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
 */
// import jwt from "jsonwebtoken";

// // Middleware to set the token with an expiration time of 1 hour
// export const setTokenMiddleware = (req, res, next) => {
//   const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.cookie("token", token, { maxAge: 36000 }); // 1 hour in milliseconds
//   next();
// };

// // Authentication middleware
// export const authenticationMiddleware = async (req, res, next) => {
//   try {
//     const cookies = req.cookies;
//     console.log("Cookies:", cookies); // Debugging log

//     const token = cookies?.token;
//     console.log("Token:", token); // Debugging log

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     const decodedUserObject = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded User Object:", decodedUserObject); // Debugging log

//     if (!decodedUserObject) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     req.user = decodedUserObject;
//     next();
//   } catch (error) {
//     console.error("Error in authenticationMiddleware:", error); // Debugging log
//     if (error.name === "TokenExpiredError") {
//       res.clearCookie("token"); // Clear the cookie if the token is expired
//       return res.status(401).json({
//         message: "Token expired",
//       });
//     }
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         message: "Invalid token",
//       });
//     }
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };
/*
The selected code is an asynchronous middleware function named `authenticationMiddleware` in a Node.js application using the Express framework. This middleware is responsible for authenticating incoming requests by verifying the JWT token provided in the request's cookies.

Here's a breakdown of the code:

1. The `jwt` module is imported from "jsonwebtoken".
2. The `authenticationMiddleware` function is defined as an asynchronous function that takes three parameters: `req`, `res`, and `next`.
3. Inside the function, the `req.cookies` object is accessed to retrieve the token.
4. The `token` is then checked for its existence. If it doesn't exist, a 401 status code is returned with a JSON response indicating "Unauthorized".
5. If the token exists, it is verified using the `jwt.verify()` method. The `process.env.JWT_SECRET` is used as the secret key to verify the token.
6. If the token is successfully verified, the decoded user object is assigned to `req.user` and the `next()` function is called to proceed to the next middleware in the request chain.
7. If any error occurs during the verification process, a 500 status code is returned with a JSON response indicating "Internal server error".

This middleware is designed to be used in an Express application to secure routes that require authentication. It ensures that only valid and authenticated requests can access the protected routes.
*/