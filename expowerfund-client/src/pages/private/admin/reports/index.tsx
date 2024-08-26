import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { message, Spin, Table } from "antd";
import axios from "axios";
import ReportCard from "./report-card";
import { DonationTypeProps } from "../../../../interfaces";
import dayjs from "dayjs";

function AdminReportsPage() {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    totalDonations: 0,
    totalAmount: 0,
    lastFiveDonations: [],
  });

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/reports/admin-reports");
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
      <PageTitle title="Reports" />

      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-7">
        <ReportCard title="Total Users" value={reports.totalUsers} />
        <ReportCard title="Total Campaigns" value={reports.totalCampaigns} />
        <ReportCard title="Total Donations" value={reports.totalDonations} />
        <ReportCard
          title="Amount Collected"
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
The selected code is a functional component named `AdminReportsPage` in a TypeScript React application. This component is responsible for fetching and displaying various reports related to user donations.

Here's a breakdown of the code:

1. Import statements: The component imports necessary modules and components from libraries such as React, useState, useEffect, message, Spin, Table, axios, ReportCard, and DonationTypeProps.

2. Function component definition: The `AdminReportsPage` function component is defined.

3. State variables: The component uses the `useState` hook to manage state variables. `loading` is a boolean variable that indicates whether the data is being fetched. `reports` is an object that stores the fetched reports data, including total users, total campaigns, total donations, total amount, and the last five donations.

4. `getData` function: This asynchronous function is responsible for fetching the reports data from the server using the axios library. It sets the `loading` state to true before making the API call, updates the `reports` state with the fetched data, and sets the `loading` state to false after the API call is completed. If an error occurs during the API call, it displays an error message using the `message` component.

5. `useEffect` hook: The `useEffect` hook is used to fetch the reports data when the component mounts. It calls the `getData` function.

6. `columns` array: This array defines the columns for the donations table. Each column has a title, dataIndex, and render function to customize the display of the data.

7. JSX return statement: The component returns a JSX element that renders the page title, loading spinner, report cards, and the donations table. The loading spinner is displayed when the `loading` state is true. The report cards display the total users, total campaigns, total donations, and total amount collected. The donations table displays the last five donations using the `columns` array and the `reports.lastFiveDonations` data.

Overall, the `AdminReportsPage` component fetches and displays various reports related to user donations in a React application.
*/