import { Button, message, Table, Tooltip } from "antd";
import PageTitle from "../../../../components/page-title";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CampaignTypeProps } from "../../../../interfaces";
import axios from "axios";
import dayjs from "dayjs";
import { ListCheck, Pencil, Trash2 } from "lucide-react";
import CampaignDonations from "./campaign-donations";

function CampaignsPage() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<CampaignTypeProps[]>([]);
  const [selectedCampaign, setSelectedCampaign] =
    useState<CampaignTypeProps | null>(null);
  const [showCampaignDonations, setShowCampaignDonations] = useState(false);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/campaigns/get-all");
      setCampaigns(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/campaigns/delete/${id}`);
      message.success("Campaign deleted successfully");
      getData();
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Target Amount",
      dataIndex: "targetAmount",
      key: "targetAmount",
      render: (targetAmount: number) => `$${targetAmount}`,
    },
    {
      title: "Collected Amount",
      dataIndex: "collectedAmount",
      key: "collectedAmount",
      render: (collectedAmount: number) => `$${collectedAmount}`,
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Yes" : "No"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        dayjs(createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: CampaignTypeProps) => (
        <div className="flex gap-5">
          <Tooltip title="View Donations">
            <Button
              size="small"
              className="border-primary border"
              onClick={() => {
                setSelectedCampaign(record);
                setShowCampaignDonations(true);
              }}
            >
              <ListCheck size={13} />
            </Button>
          </Tooltip>
          <Button
            size="small"
            className="border-primary border"
            onClick={() => onDelete(record._id)}
          >
            <Trash2 size={13} />
          </Button>
          <Button size="small" className="border-primary border">
            <Pencil
              size={13}
              onClick={() => navigate(`/admin/campaigns/edit/${record._id}`)}
            />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Campaigns" />
        <Button
          type="primary"
          onClick={() => navigate("/admin/campaigns/create")}
        >
          Create Campaign
        </Button>
      </div>

      <Table columns={columns} dataSource={campaigns} loading={loading} />

      {showCampaignDonations && (
        <CampaignDonations
          open={showCampaignDonations}
          setOpen={setShowCampaignDonations}
          selectedCampaign={selectedCampaign as CampaignTypeProps}
        />
      )}
    </div>
  );
}

export default CampaignsPage;
/*
The selected code is a React functional component named `CampaignsPage`. This component is responsible for managing and displaying a list of campaigns in an admin dashboard. Here's a breakdown of the code:

1. Import statements: The component imports necessary modules and components from various libraries, including `Button`, `message`, `Table`, `Tooltip`, `useNavigate`, `useState`, `useEffect`, `axios`, `dayjs`, and icons from `lucide-react`.

2. Type definition: The component uses a custom type `CampaignTypeProps` to define the structure of campaign data.

3. State variables: The component uses several state variables to manage its state. These include `campaigns` (an array of campaigns), `selectedCampaign` (the currently selected campaign), `showCampaignDonations` (a boolean indicating whether the donations modal should be shown), `loading` (a boolean indicating whether the component is loading data), and `setCampaigns`, `setSelectedCampaign`, `setShowCampaignDonations`, and `setLoading` (functions to update these state variables).

4. `getData` function: This asynchronous function is responsible for fetching the list of campaigns from the server using `axios`. It sets the loading state to true before making the request, updates the `campaigns` state with the response data, and sets the loading state to false. If an error occurs during the request, it displays an error message using `message.error`.

5. `onDelete` function: This asynchronous function is responsible for deleting a campaign from the server using `axios`. It sets the loading state to true before making the request, displays a success message using `message.success` if the deletion is successful, and refreshes the list of campaigns by calling `getData`. If an error occurs during the request, it displays an error message using `message.error`.

6. `useEffect` hook: This hook is used to fetch the list of campaigns when the component mounts. It calls the `getData` function.

7. `columns` array: This array defines the columns for the `Table` component. Each column object has a `title`, `dataIndex`, `key`, and optional `render` function to format the cell content.

8. `return` statement: This is the JSX code that renders the component. It includes a `div` containing a `PageTitle` component, a `Button` to create a new campaign, a `Table` component with the defined columns and data, and a `CampaignDonations` component (not shown in the selected code) that is conditionally rendered based on the `showCampaignDonations` state variable.

Overall, the `CampaignsPage` component is responsible for fetching, displaying, and managing a list of campaigns in an admin dashboard. It uses `axios` to make HTTP requests to the server, and it updates the component's state based on the response data. The component also includes functionality for deleting campaigns and displaying a modal with donations for a selected campaign.
*/