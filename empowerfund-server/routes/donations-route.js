import { authenticationMiddleware } from "../middleware/index.js";
import CampaignModel from "../models/campaign-model.js";
import DonationModel from "../models/donation-model.js";
import express from "express";
const router = express.Router();

router.post("/create", authenticationMiddleware, async (req, res) => {
  try {
    await DonationModel.create(req.body);
    await CampaignModel.findByIdAndUpdate(req.body.campaign, {
      $inc: { collectedAmount: req.body.amount },
    });
    return res.status(201).json({ message: "Donation created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// The selected code is an asynchronous function that handles the creation of a donation in the application. It uses Express.js middleware for authentication and interacts with the DonationModel and CampaignModel.

// Here's a breakdown of the code:

// 1. The function takes two parameters: `req` (request object) and `res` (response object).
// 2. Inside the function, it attempts to create a new donation using the `DonationModel.create()` method. The donation data is obtained from the request body (`req.body`).
// 3. After creating the donation, it updates the corresponding campaign's collected amount using the `CampaignModel.findByIdAndUpdate()` method. The campaign ID is obtained from the request body (`req.body.campaign`), and the collected amount is incremented by the donation amount (`req.body.amount`).
// 4. If the donation and campaign updates are successful, it sends a response with a status code of 201 (Created) and a success message.
// 5. If any error occurs during the process, it sends a response with a status code of 500 (Internal Server Error) and the error message.

// This code snippet demonstrates how to handle the creation of a donation and update the corresponding campaign's collected amount. It also includes error handling to ensure a smooth user experience.

router.get("/get-all", authenticationMiddleware, async (req, res) => {
  try {
    const donations = await DonationModel.find().populate('campaign').populate('user').sort({ createdAt: -1 });
     
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// The selected code is an asynchronous function that handles retrieving all donations from the application. It uses Express.js middleware for authentication and interacts with the DonationModel.

// Here's a breakdown of the code:

// 1. The function takes two parameters: `req` (request object) and `res` (response object).
// 2. Inside the function, it attempts to find all donations using the `DonationModel.find()` method.
// 3. To include the related campaign and user data in the response, the `populate()` method is used. The `populate()` method allows you to replace the specified paths in the document with document(s) from other collection(s). In this case, it populates the 'campaign' and 'user' fields.
// 4. The `sort()` method is used to sort the donations in descending order based on the 'createdAt' field.
// 5. If the donations are successfully retrieved, it sends a response with a status code of 200 (OK) and the donations data.
// 6. If any error occurs during the process, it sends a response with a status code of 500 (Internal Server Error) and the error message.

// This code snippet demonstrates how to retrieve all donations, populate related campaign and user data, and handle errors gracefully.

router.get(
  "/get-donations-by-campaign/:id",
  authenticationMiddleware,
  async (req, res) => {
    try {
      const donations = await DonationModel.find({ campaign: req.params.id })
        .populate("user")
        .sort({ createdAt: -1 });
      return res.status(200).json(donations);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// The selected code is an asynchronous function that handles retrieving donations based on a specific campaign ID. It uses Express.js middleware for authentication and interacts with the DonationModel.

// Here's a breakdown of the code:

// 1. The function takes two parameters: `req` (request object) and `res` (response object).
// 2. Inside the function, it attempts to find donations using the `DonationModel.find()` method, filtering by the campaign ID obtained from the request parameters (`req.params.id`).
// 3. To include the related user data in the response, the `populate()` method is used. The `populate()` method allows you to replace the specified paths in the document with document(s) from other collection(s). In this case, it populates the 'user' field.
// 4. The `sort()` method is used to sort the donations in descending order based on the 'createdAt' field.
// 5. If the donations are successfully retrieved, it sends a response with a status code of 200 (OK) and the donations data.
// 6. If any error occurs during the process, it sends a response with a status code of 500 (Internal Server Error) and the error message.

// This code snippet demonstrates how to retrieve donations based on a specific campaign, populate related user data, and handle errors gracefully.

router.get(
  "/get-donations-by-user/:id",
  authenticationMiddleware,
  async (req, res) => {
    try {
      const donations = await DonationModel.find({ user: req.params.id })
        .populate("campaign")
        .sort({ createdAt: -1 });
      return res.status(200).json(donations);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
// The selected code is an asynchronous function that handles retrieving donations based on a specific user ID. It uses Express.js middleware for authentication and interacts with the DonationModel.

// Here's a breakdown of the code:

// 1. The function takes two parameters: `req` (request object) and `res` (response object).
// 2. Inside the function, it attempts to find donations using the `DonationModel.find()` method, filtering by the user ID obtained from the request parameters (`req.params.id`).
// 3. To include the related campaign data in the response, the `populate()` method is used. The `populate()` method allows you to replace the specified paths in the document with document(s) from other collection(s). In this case, it populates the 'campaign' field.
// 4. The `sort()` method is used to sort the donations in descending order based on the 'createdAt' field.
// 5. If the donations are successfully retrieved, it sends a response with a status code of 200 (OK) and the donations data.
// 6. If any error occurs during the process, it sends a response with a status code of 500 (Internal Server Error) and the error message.

// This code snippet demonstrates how to retrieve donations based on a specific user, populate related campaign data, and handle errors gracefully.