import { authenticationMiddleware } from "../middleware/index.js";
import CampaignModel from "../models/campaign-model.js";
import express from "express";
const router = express.Router();

router.post("/create", authenticationMiddleware, async (req, res) => {
  try {
    req.body.collectedAmount = 0;
    await CampaignModel.create(req.body);

    return res.status(201).json({ message: "Campaign created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//The selected code is an asynchronous function that handles the POST request to the "/create" endpoint. This function is part of an Express.js router, which is used to define routes for a web application.

// In this function, the following steps are performed:

// 1. The `collectedAmount` property is added to the request body with a value of 0. This is done because when a new campaign is created, it should start with a collected amount of 0.

// 2. The `CampaignModel.create()` method is called with the updated request body. This method is used to create a new document in the MongoDB collection associated with the `CampaignModel`.

// 3. If the campaign is successfully created, a response with a status code of 201 (Created) and a JSON object containing a success message is sent back to the client.

// 4. If an error occurs during the creation process, a response with a status code of 500 (Internal Server Error) and a JSON object containing the error message is sent back to the client.

// This code snippet demonstrates how to handle a POST request to create a new campaign in a web application using Express.js and MongoDB.

router.put("/update/:id", authenticationMiddleware, async (req, res) => {
  try {
    await CampaignModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "Campaign updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// The selected code is an asynchronous function that handles the PUT request to the "/update/:id" endpoint. This function is part of an Express.js router, which is used to define routes for a web application.

// In this function, the following steps are performed:

// 1. The `CampaignModel.findByIdAndUpdate()` method is called with the `id` from the request parameters and the updated data from the request body. This method is used to update an existing document in the MongoDB collection associated with the `CampaignModel`.

// 2. If the campaign is successfully updated, a response with a status code of 200 (OK) and a JSON object containing a success message is sent back to the client.

// 3. If an error occurs during the update process, a response with a status code of 500 (Internal Server Error) and a JSON object containing the error message is sent back to the client.

// This code snippet demonstrates how to handle a PUT request to update an existing campaign in a web application using Express.js and MongoDB.

router.delete("/delete/:id", authenticationMiddleware, async (req, res) => {
  try {
    await CampaignModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// The selected code is an asynchronous function that handles the DELETE request to the "/delete/:id" endpoint. This function is part of an Express.js router, which is used to define routes for a web application.

// In this function, the following steps are performed:

// 1. The `CampaignModel.findByIdAndDelete()` method is called with the `id` from the request parameters. This method is used to delete an existing document in the MongoDB collection associated with the `CampaignModel`.

// 2. If the campaign is successfully deleted, a response with a status code of 200 (OK) and a JSON object containing a success message is sent back to the client.

// 3. If an error occurs during the deletion process, a response with a status code of 500 (Internal Server Error) and a JSON object containing the error message is sent back to the client.

// This code snippet demonstrates how to handle a DELETE request to delete an existing campaign in a web application using Express.js and MongoDB.

router.get("/get-all", authenticationMiddleware, async (req, res) => {
  try {
    const campaigns = await CampaignModel.find().sort({ createdAt: -1 });
    return res.status(200).json(campaigns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// The selected code is an asynchronous function that handles the GET request to the "/get-all" endpoint. This function is part of an Express.js router, which is used to define routes for a web application.

// In this function, the following steps are performed:

// 1. The `CampaignModel.find()` method is called without any parameters. This method retrieves all documents from the MongoDB collection associated with the `CampaignModel`.

// 2. The retrieved documents are sorted in descending order based on the `createdAt` field using the `.sort({ createdAt: -1 })` method. This ensures that the most recently created campaigns are returned first.

// 3. If the campaigns are successfully retrieved, a response with a status code of 200 (OK) and the retrieved campaigns as a JSON array is sent back to the client.

// 4. If an error occurs during the retrieval process, a response with a status code of 500 (Internal Server Error) and a JSON object containing the error message is sent back to the client.

// This code snippet demonstrates how to handle a GET request to retrieve all campaigns in a web application using Express.js and MongoDB.

router.get("/get/:id", authenticationMiddleware, async (req, res) => {
  try {
    const campaign = await CampaignModel.findById(req.params.id);
    return res.status(200).json(campaign);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// The selected code is an asynchronous function that handles the GET request to the "/get/:id" endpoint. This function is part of an Express.js router, which is used to define routes for a web application.

// In this function, the following steps are performed:

// 1. The `CampaignModel.findById()` method is called with the `id` from the request parameters. This method retrieves a single document from the MongoDB collection associated with the `CampaignModel` based on the provided `id`.

// 2. If the campaign is successfully retrieved, a response with a status code of 200 (OK) and the retrieved campaign as a JSON object is sent back to the client.

// 3. If an error occurs during the retrieval process, a response with a status code of 500 (Internal Server Error) and a JSON object containing the error message is sent back to the client.

// This code snippet demonstrates how to handle a GET request to retrieve a single campaign by its `id` in a web application using Express.js and MongoDB.

export default router;
