import { authenticationMiddleware } from "../middleware/index.js";
import CampaignModel from "../models/campaign-model.js";
import DonationModel from "../models/donation-model.js";
import UserModel from "../models/user-model.js";
import express from "express";
const router = express.Router();

router.get("/admin-reports", authenticationMiddleware, async (req, res) => {
  try {
    const [totalUsers, totalCampaigns, donations] = await Promise.all([
      UserModel.countDocuments({}),
      CampaignModel.countDocuments({}),
      DonationModel.find({})
        .populate("campaign")
        .populate("user")
        .sort({ createdAt: -1 }),
    ]);

    const response = {
      totalUsers,
      totalCampaigns,
      totalDonations: donations.length,
      totalAmount: donations.reduce(
        (acc, donation) => acc + donation.amount,
        0
      ),
      lastFiveDonations: donations.slice(-5),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
/*
The selected code is an asynchronous function that handles the `/admin-reports` endpoint in an Express.js application. This function is part of a router that is responsible for providing various reports to administrators.

Here's a breakdown of the code:

1. The function is defined as an asynchronous function using the `async` keyword.
2. Inside the function, it uses `Promise.all` to execute multiple asynchronous operations concurrently. The `Promise.all` function takes an array of promises and returns a single promise that resolves when all the promises in the array have resolved.
3. The first two promises in the array are `UserModel.countDocuments({})` and `CampaignModel.countDocuments({})`. These promises count the total number of users and campaigns in the database, respectively.
4. The third promise is `DonationModel.find({})` followed by two `populate` methods and a `sort` method. This promise retrieves all donations from the database, populates the `campaign` and `user` fields with their respective data, and sorts the donations in descending order based on the `createdAt` field.
5. After all the promises have resolved, the function destructures the results into `totalUsers`, `totalCampaigns`, and `donations`.
6. It then calculates the total amount donated by summing up the `amount` field of all donations using the `reduce` method.
7. Finally, it constructs a response object with the total number of users, total number of campaigns, total number of donations, total amount donated, and the last five donations. This response object is then sent as a JSON response with a status code of 200.
8. If any error occurs during the execution of the function, it catches the error and sends a JSON response with a status code of 500 and the error message.

This code provides an overview of how to retrieve and process data from multiple models in an Express.js application using asynchronous functions and Promise.all.
*/

router.get("/user-reports/:id", authenticationMiddleware, async (req, res) => {
  try {
    const [donations] = await Promise.all([
      DonationModel.find({
        user: req.params.id,
      })
        .populate("campaign")
        .sort({ createdAt: -1 }),
    ]);

    const response = {
      totalDonations: donations.length,
      totalAmount: donations.reduce(
        (acc, donation) => acc + donation.amount,
        0
      ),
      lastFiveDonations: donations.slice(-5),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

/*
The selected code is an asynchronous function that handles the `/user-reports/:id` endpoint in an Express.js application. This function is part of a router that is responsible for providing reports to users based on their unique identifier.

Here's a breakdown of the code:

1. The function is defined as an asynchronous function using the `async` keyword.
2. Inside the function, it uses `Promise.all` to execute a single asynchronous operation concurrently. The `Promise.all` function takes an array of promises and returns a single promise that resolves when all the promises in the array have resolved.
3. The single promise in the array is `DonationModel.find({ user: req.params.id })`. This promise retrieves all donations made by the user whose unique identifier is provided in the request parameters.
4. The retrieved donations are then populated with the `campaign` field using the `populate` method.
5. The donations are sorted in descending order based on the `createdAt` field using the `sort` method.
6. After the promise has resolved, the function destructures the result into `donations`.
7. It then calculates the total amount donated by the user by summing up the `amount` field of all donations using the `reduce` method.
8. Finally, it constructs a response object with the total number of donations made by the user, the total amount donated, and the last five donations. This response object is then sent as a JSON response with a status code of 200.
9. If any error occurs during the execution of the function, it catches the error and sends a JSON response with a status code of 500 and the error message.

This code provides an overview of how to retrieve and process data from a single model in an Express.js application using asynchronous functions and Promise.all. The unique identifier of the user is passed as a parameter in the request, and the code retrieves and processes the relevant donations for that user.
*/