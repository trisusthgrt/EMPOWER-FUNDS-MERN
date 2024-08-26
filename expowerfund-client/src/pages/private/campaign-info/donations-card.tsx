import {
  Button,
  Input,
  InputNumber,
  Progress,
  message as antdMessage,
} from "antd";
import { CampaignTypeProps } from "../../../interfaces";
import { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout-form";

const stripePublicKey =
  "pk_test_51Poh0aRpBsYqtHHHP50Ek9Vj4p0Fhm4ITDukupqPiZqjiuEpf3QQ53T1VJLoqRAinDm9W6yK0U4mZkBQgBB43Os800RUfWOARP";
const stripePromise = loadStripe(stripePublicKey);

console.log(stripePublicKey);

function DonationsCard({
  campaignData,
  reloadCampaignData,
}: {
  campaignData: CampaignTypeProps;
  reloadCampaignData: () => void;
}) {
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const [clientSecretToken, setClientSecretToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const getClientSecretToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/payments/create-payment-intent", {
        amount,
      });
      setClientSecretToken(response.data.clientSecret);
      setShowCheckoutForm(true);
    } catch (error: any) {
      antdMessage.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    clientSecret: clientSecretToken,
  };

  return (
    <div className="p-5 border border-solid border-gray-300">
      <div className="px-2 pb-2">
        <Progress
          percent={Number(
            (
              (campaignData.collectedAmount / campaignData.targetAmount) *
              100
            ).toFixed(2)
          )}
        />
        <h1 className="text-sm text-black mt-1">
          $ {campaignData.collectedAmount} raised of ${" "}
          {campaignData.targetAmount}
        </h1>

        <div className="flex flex-col mt-7">
          <label htmlFor="" className="text-sm text-gray-600">
            Amount
          </label>
          <InputNumber
            className="w-full"
            type="number"
            value={amount}
            onChange={(value) => setAmount(value as number)}
            min={1}
          />
        </div>

        <div className="flex flex-col mt-5">
          <label htmlFor="" className="text-sm text-gray-600">
            Message
          </label>
          <Input.TextArea
            className="w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          block
          className="mt-7"
          onClick={getClientSecretToken}
          loading={loading}
        >
          Donate
        </Button>
      </div>

      {clientSecretToken && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            open={showCheckoutForm}
            onClose={() => {
              setClientSecretToken("");
              setShowCheckoutForm(false);
            }}
            campaignData={campaignData}
            message={message}
            amount={amount}
            reloadCampaignData={() => {
              reloadCampaignData();
              setMessage("");
              setAmount(1);
            }}
          />
        </Elements>
      )}
    </div>
  );
}

export default DonationsCard;

/*
The selected code snippet is a functional component named `DonationsCard` in a React application. This component is responsible for rendering a donations card within a campaign page. The card displays the current progress of the campaign, allows users to input a donation amount and message, and initiates the payment process when the "Donate" button is clicked.

Here's a breakdown of the selected code:

1. Import statements: The code imports necessary components and libraries from the "antd" and "axios" libraries, as well as the `CampaignTypeProps` interface from the local codebase.

2. Stripe configuration: The code defines a Stripe public key and initializes a `stripePromise` using the `loadStripe` function from the "@stripe/stripe-js" library.

3. `DonationsCard` function component: This is the main component that handles the donations functionality. It takes `campaignData` and `reloadCampaignData` props, which represent the campaign data and a function to reload the campaign data, respectively.

4. State variables: The component uses React's `useState` hook to manage state variables such as `amount`, `message`, `clientSecretToken`, `loading`, and `showCheckoutForm`.

5. `getClientSecretToken` function: This function is called when the "Donate" button is clicked. It sets the loading state to true, sends a POST request to the "/api/payments/create-payment-intent" endpoint with the donation amount, and updates the `clientSecretToken` state with the response data. It also shows the checkout form by setting the `showCheckoutForm` state to true.

6. `options` object: This object is used to pass the `clientSecret` to the `Elements` component from the "@stripe/react-stripe-js" library.

7. JSX code: The component renders a donations card with progress, donation amount input, message input, and the "Donate" button. When the `clientSecretToken` is available, it renders the `CheckoutForm` component from the "./checkout-form" file, passing necessary props such as `open`, `onClose`, `campaignData`, `message`, `amount`, and `reloadCampaignData`.

Overall, the `DonationsCard` component handles the donations functionality within a campaign page, allowing users to input a donation amount and message, and initiating the payment process using Stripe.
*/