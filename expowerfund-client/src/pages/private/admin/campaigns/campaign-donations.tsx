import { message, Modal, Table } from "antd";
import { CampaignTypeProps, DonationTypeProps } from "../../../../interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function CampaignDonations({
  open,
  setOpen,
  selectedCampaign,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCampaign: CampaignTypeProps;
}) {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/donations/get-donations-by-campaign/${selectedCampaign._id}`
      );
      setDonations(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCampaign) {
      getData();
    }
  }, [selectedCampaign]);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_text: string, record: DonationTypeProps) => record.user.name,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_text: string, record: DonationTypeProps) => `$${record.amount}`,
    },
    {
      title: "Payment Id",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text: string, record: DonationTypeProps) =>
        dayjs(record.createdAt).format("MMMM DD, YYYY h:mm A"),
    },
  ];
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      title={`Donations for ${selectedCampaign.name}`}
      centered
      width={800}
      footer={null}
    >
      <Table columns={columns} dataSource={donations} loading={loading} />
    </Modal>
  );
}

export default CampaignDonations;

/*
The selected code snippet is a functional component named `CampaignDonations` in a TypeScript React application. This component is responsible for displaying a modal that lists donations made to a specific campaign.

Here's a breakdown of the code:

1. Import statements: The component imports necessary modules from the "antd" library for UI components, custom interfaces, and the "axios" library for making HTTP requests. It also imports the "dayjs" library for date and time manipulation.

2. Function signature: The `CampaignDonations` function takes three props: `open` (a boolean indicating whether the modal is open or not), `setOpen` (a function to update the `open` state), and `selectedCampaign` (an object representing the selected campaign).

3. State variables: The component uses React hooks to manage state. It initializes `donations` as an array of any type (representing donation data), `loading` as a boolean (indicating whether the data is being fetched), and `error` as a string (to store any error messages).

4. `getData` function: This asynchronous function is responsible for fetching donations data from the server using the "axios" library. It sets the `loading` state to true before making the request, updates the `donations` state with the response data, and resets the `loading` state to false. If an error occurs during the request, it displays an error message using the "message" component from "antd" and resets the `loading` state.

5. `useEffect` hook: The `useEffect` hook is used to fetch donations data when the `selectedCampaign` prop changes. It calls the `getData` function if the `selectedCampaign` prop is not null.

6. `columns` array: This array defines the columns for the donations table. Each column object has a `title` (displayed in the table header), `dataIndex` (the corresponding property in the donation data), `key` (a unique identifier for the column), and an optional `render` function (to format the cell content).

7. Return statement: The component returns a modal using the "Modal" component from "antd". The modal is conditionally rendered based on the `open` prop. It displays the donations table using the "Table" component from "antd", passing the `columns` array and the `donations` data as props. The `loading` state is passed to the "Table" component to show a loading indicator while fetching data.

Overall, the `CampaignDonations` component is responsible for fetching and displaying donations data for a specific campaign in a modal. It uses React hooks and the "antd" library for UI components.
*/