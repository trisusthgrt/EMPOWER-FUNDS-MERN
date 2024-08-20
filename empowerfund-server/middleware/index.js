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
