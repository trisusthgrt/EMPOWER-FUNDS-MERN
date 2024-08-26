import stripe from "stripe";
import { authenticationMiddleware } from "../middleware/index.js";

import express from "express";
const router = express.Router();

router.post(
  "/create-payment-intent",
  authenticationMiddleware,
  async (req, res) => {
    try {
      console.log(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await stripe(
        process.env.STRIPE_SECRET_KEY
      ).paymentIntents.create({
        amount: req.body.amount * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        description: "EMPOWERFUNDS DONATION",
      });

      return res
        .status(201)
        .json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;

/*
The selected code is an asynchronous function that handles a POST request at the "/create-payment-intent" endpoint. This function is part of an Express.js router and is protected by the "authenticationMiddleware" to ensure that only authenticated users can access it.

Inside the function, it attempts to create a payment intent using the Stripe API. The Stripe secret key is retrieved from the environment variables using `process.env.STRIPE_SECRET_KEY`. The payment intent is created with the following parameters:

- `amount`: The amount to be charged, which is obtained from the request body and multiplied by 100 to convert it to cents.
- `currency`: The currency of the payment, set to "usd" in this case.
- `automatic_payment_methods`: An object that enables automatic payment methods, with `enabled` set to true.
- `description`: A description of the payment, set to "EMPOWERFUNDS DONATION" in this case.

If the payment intent is successfully created, the function returns a JSON response with the status code 201 and the client secret of the payment intent. If an error occurs during the process, the function returns a JSON response with the status code 500 and the error message.

What happens if the 'authenticationMiddleware' fails to authenticate a user?


If the 'authenticationMiddleware' fails to authenticate a user, it will not proceed to the code inside the asynchronous function. Instead, it will return a JSON response with the status code 401 (Unauthorized) and a message indicating that the user is not authenticated.

Here's the relevant part of the code that handles this scenario:

```javascript
router.post(
  "/create-payment-intent",
  authenticationMiddleware,
  async (req, res) => {
    // ...
  }
);
```

Since the 'authenticationMiddleware' is specified as the second argument to the `router.post()` function, it will be executed before the asynchronous function. If the middleware fails, the Express.js framework will automatically handle the response and skip the asynchronous function.

Therefore, if the 'authenticationMiddleware' fails to authenticate a user, the user will receive a 401 Unauthorized response with a message indicating that the user is not authenticated. No additional code is required to handle this scenario within the scope of the provided code block.


*/
