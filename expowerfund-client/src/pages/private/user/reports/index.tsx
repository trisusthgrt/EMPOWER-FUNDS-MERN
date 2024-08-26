import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { message, Spin, Table } from "antd";
import axios from "axios";
import { DonationTypeProps } from "../../../../interfaces";
import dayjs from "dayjs";
import ReportCard from "../../admin/reports/report-card";
import usersStore, { UsersStoreProps } from "../../../../store/users-store";

function AdminReportsPage() {
  const { currentUser } = usersStore() as UsersStoreProps;
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState({
    totalDonations: 0,
    totalAmount: 0,
    lastFiveDonations: [],
  });

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/reports/user-reports/${currentUser?._id}`
      );
      setReports(response.data);
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
      <PageTitle title="Reports" />

      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-7">
        <ReportCard title="Total Donations" value={reports.totalDonations} />
        <ReportCard
          title="Amount Donated"
          value={reports.totalAmount}
          showCurrency
        />
      </div>

      <div className="mt-7">
        <h1 className="text-lg font-bold">Last 5 Donations</h1>
        <Table columns={columns} dataSource={reports.lastFiveDonations} />
      </div>
    </div>
  );
}

export default AdminReportsPage;
/*
The selected code snippet is a functional component named `AdminReportsPage` in a React application. This component is responsible for fetching and displaying user reports. Here's a breakdown of the code:

1. Import statements: The component imports necessary dependencies such as `useEffect`, `useState`, `PageTitle`, `message`, `Spin`, `Table`, `axios`, `DonationTypeProps`, `dayjs`, and `ReportCard`.

2. `AdminReportsPage` function: This is the main component function. It uses React hooks to manage state and perform side effects.

3. State variables: The component uses the `useState` hook to define three state variables: `loading` (boolean), `reports` (object), and `currentUser` (object).

4. `getData` function: This is an asynchronous function that fetches user reports from the server using the `axios` library. It sets the `loading` state to `true` before making the API call, updates the `reports` state with the fetched data, and sets the `loading` state to `false` afterward. If an error occurs during the API call, it displays an error message using the `message` component from Ant Design.

5. `useEffect` hook: The `useEffect` hook is used to call the `getData` function when the component mounts. This ensures that the user reports are fetched when the page loads.

6. `columns` array: This array defines the columns for the `Table` component. Each column object specifies the title, dataIndex, and render function for each column.

7. JSX return: The component returns JSX code that renders the page title, loading spinner, report cards, and the table of last five donations. The `loading` state is used to conditionally render the loading spinner. The `reports` state is used to populate the report cards and the table.

Overall, the `AdminReportsPage` component fetches user reports from the server, displays them in a formatted manner, and handles loading states and error messages.
*/