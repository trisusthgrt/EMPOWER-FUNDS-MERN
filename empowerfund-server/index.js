import express from "express";

const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoDB from "./config/db-config.js";

dotenv.config();


connectMongoDB();

import userRoutes from "./routes/users-route.js";
import campaignRoutes from "./routes/campaigns-route.js";
import paymentsRoutes from "./routes/payments-route.js";
import donationsRoutes from "./routes/donations-route.js";
import reportsRoutes from "./routes/reports-route.js";

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/reports", reportsRoutes);

app.listen(port, () => {
  console.log("Node+Express Server Is Successfull");
});

// The selected code is an anonymous function that is passed as an argument to the `listen` method of the Express application. This function is executed when the server starts listening for incoming connections. In this case, it logs a message to the console indicating that the Node.js and Express server has started successfully.

// Here's the explanation of the selected code:

// ```javascript
// app.listen(port, () => {
//   console.log("Node+Express Server Is Successfull");
// });
// ```

// In this code snippet:
// - `app.listen(port, callback)` is a method provided by the Express framework that starts the server and listens for incoming connections on the specified port.
// - The `port` variable holds the port number on which the server should listen. It is obtained from the environment variable `process.env.PORT` or defaults to `5000` if the environment variable is not set.
// - The anonymous function `() => { console.log("Node+Express Server Is Successfull"); }` is passed as the second argument to the `listen` method. This function is executed when the server starts listening for incoming connections.
// - The `console.log` statement inside the anonymous function logs a message to the console indicating that the server has started successfully.

// This code snippet is responsible for starting the server and logging a success message when the server is ready to accept incoming connections.