import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { DonationTypeProps } from "../../../../interfaces";
import { message, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";

function AdminDonationsPage() {
  const [donations, setDonations] = useState<DonationTypeProps[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/donations/get-all`);
      setDonations(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Campaign",
      dataIndex: "campaign",
      render: (_text: string, record: DonationTypeProps) => record.campaign.name,
    },
    {
      title: "Donor",
      dataIndex: "donor",
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
    <div>
      <PageTitle title="Donations" />
      <Table columns={columns} dataSource={donations} loading={loading} />
    </div>
  );
}

export default AdminDonationsPage;

/*
The selected code snippet is a functional component named `AdminDonationsPage` in a TypeScript React application. This component is responsible for fetching and displaying donations data in a table format.

Here's a breakdown of the code:

1. Import statements: The component imports necessary modules and types from libraries such as `useState`, `useEffect`, `PageTitle`, `DonationTypeProps`, `message`, `Table`, `axios`, and `dayjs`.

2. State variables: The component uses React hooks to manage state. It declares two state variables: `donations` of type `DonationTypeProps[]` to store the fetched donations data, and `loading` of type `boolean` to indicate whether the data is being fetched.

3. `getData` function: This asynchronous function is responsible for fetching donations data from the server using the `axios` library. It sets the `loading` state to `true` before making the API call, updates the `donations` state with the fetched data, and handles any errors using the `message` component from Ant Design. Finally, it sets the `loading` state to `false`.

4. `useEffect` hook: The `useEffect` hook is used to call the `getData` function when the component mounts. This ensures that the donations data is fetched when the page is loaded.

5. `columns` array: This array defines the columns for the Ant Design `Table` component. Each column object specifies the title, dataIndex, and render function for each column. The `campaign` and `donor` columns use the `render` function to display the related data from the `campaign` and `user` objects. The `amount` column is formatted with a dollar sign. The `Date & Time` column uses the `dayjs` library to format the `createdAt` timestamp.

6. Component return: The component returns a JSX element that renders the `PageTitle` component with the title "Donations", the Ant Design `Table` component with the defined columns and data, and the `loading` state.

Overall, this code snippet demonstrates fetching data from an API, displaying it in a table format, and handling loading states using React hooks and Ant Design components.
*/
