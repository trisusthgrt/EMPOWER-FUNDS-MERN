import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { DonationTypeProps } from "../../../../interfaces";
import usersStore, { UsersStoreProps } from "../../../../store/users-store";
import { message, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";

function DonationsPage() {
  const [donations, setDonations] = useState<DonationTypeProps[]>([]);
  const { currentUser } = usersStore() as UsersStoreProps;
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/donations/get-donations-by-user/${currentUser?._id}`
      );
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

export default DonationsPage;
/*
The selected code snippet is a functional component named `DonationsPage` in a React application. This component is responsible for fetching and displaying a list of donations made by the current user.

Here's a breakdown of the code:

1. Import statements: The component imports necessary modules and types from various libraries, including `useState`, `useEffect`, `PageTitle`, `DonationTypeProps`, `UsersStoreProps`, `usersStore`, `message`, `Table`, `axios`, and `dayjs`.

2. `DonationsPage` function: This is the main component function. It initializes state variables for donations, the current user, loading status, and defines a function `getData` to fetch donations from the server.

3. `getData` function: This asynchronous function is responsible for making a GET request to the server to fetch donations made by the current user. It sets the loading state to true before the request, updates the donations state with the response data, and handles any errors by displaying an error message. Finally, it sets the loading state to false.

4. `useEffect` hook: This hook is used to call the `getData` function when the component mounts.

5. `columns` array: This array defines the columns for the Ant Design Table component. Each column object has a `title`, `dataIndex`, `key`, and `render` property. The `render` property is used to customize the display of data in each column.

6. Return statement: The component returns a JSX element that renders the `PageTitle` component with the title "Donations", the Ant Design Table component with the defined columns and data, and the loading state.

Overall, this code snippet demonstrates fetching data from a server, displaying it in a table, and handling loading states in a React application.
*/