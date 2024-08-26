import { Button, Modal, message as antdMessage } from "antd";
import { CampaignTypeProps } from "../../../interfaces";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import usersStore, { UsersStoreProps } from "../../../store/users-store";
import { useState } from "react";

function CheckoutForm({
  open = false,
  onClose = () => {},
  campaignData,
  message,
  amount,
  reloadCampaignData,
}: {
  open: boolean;
  onClose: () => void;
  campaignData: CampaignTypeProps;
  message: string;
  amount: number;
  reloadCampaignData: () => void;
}) {
  const { currentUser } = usersStore() as UsersStoreProps;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",//
        },
        redirect: "if_required",
      });

      if (result.error) {
        antdMessage.error(result.error.message);
      } else {
        antdMessage.success("Donation successful");
        await axios.post("/api/donations/create", {
          user: currentUser?._id,
          campaign: campaignData._id,
          amount,
          message,
          paymentId: result.paymentIntent.id,
        });
        onClose();
        reloadCampaignData();
      }
    } catch (error: any) {
      antdMessage.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      onCancel={onClose}
      open={open}
      onClose={onClose}
      title="COMPLETE YOUR DONATION PAYMENT"
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            mode: "billing",
            allowedCountries: ["US"],
          }}
        />
        <div className="flex justify-end gap-5 mt-5">
          <Button disabled={loading}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Donate
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CheckoutForm;
/*
The selected code snippet is a functional component named `CheckoutForm` in a TypeScript React application. This component is responsible for handling the donation process using Stripe's payment elements. Here's a breakdown of the code:

1. Import statements: The code imports necessary components and libraries from the `antd`, `@stripe/react-stripe-js`, `axios`, and the custom `users-store` and `interfaces` files.

2. Function signature: The `CheckoutForm` function takes several props, including `open`, `onClose`, `campaignData`, `message`, `amount`, and `reloadCampaignData`. These props are used to control the modal's visibility, handle closing the modal, provide campaign data, donation message, donation amount, and a function to reload campaign data after successful donation.

3. State variables: The code uses the `useState` hook to manage the `loading` state, which indicates whether the donation process is in progress.

4. Stripe and Elements: The `useStripe` and `useElements` hooks are used to access the Stripe instance and elements, respectively. These hooks are essential for handling the payment process.

5. `handleSubmit` function: This function is called when the form is submitted. It performs the following steps:
   - Sets the `loading` state to `true`.
   - Prevents the default form submission behavior.
   - Checks if the Stripe instance and elements are available.
   - Calls the `stripe.confirmPayment` method to confirm the payment.
   - If there's an error during the payment confirmation, an error message is displayed using `antdMessage.error`.
   - If the payment is successful, a success message is displayed using `antdMessage.success`.
   - A POST request is made to the `/api/donations/create` endpoint to create a new donation record in the backend.
   - The `onClose` function is called to close the modal.
   - The `reloadCampaignData` function is called to reload the campaign data.
   - The `loading` state is set to `false`.

6. JSX: The component returns a modal with a form. The form includes `PaymentElement` and `AddressElement` components from Stripe, as well as buttons for canceling and submitting the donation. The `loading` state is used to disable the submit button while the donation process is in progress.

Overall, the `CheckoutForm` component handles the donation process by integrating with Stripe's payment elements and making a POST request to the backend to create a new donation record.
*/