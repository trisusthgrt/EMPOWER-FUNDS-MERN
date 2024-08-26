import { Button, Image, message, Spin } from "antd";
import PageTitle from "../../../components/page-title";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CampaignTypeProps } from "../../../interfaces";
import axios from "axios";
import DonationsCard from "./donations-card";

function CampaignInfoPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<CampaignTypeProps | null>(
    null
  );
  const params = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/campaigns/get/${params.id}`);
      setCampaignData(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Button onClick={() => navigate("/")}>Back To Campaigns</Button>
      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}
      {campaignData && (
        <div className="mt-5">
          <PageTitle title={campaignData.name} />

          <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
            <div className="col-span-2">
              <img
                src={campaignData.images[0]}
                alt={campaignData.name}
                className="rounded w-full md:h-[500px] object-cover"
              />

              <div className="flex gap-5 mt-5">
                {campaignData.images.map((image, index) => (
                  <Image
                    src={image}
                    key={index}
                    className="w-24 h-24 rounded"
                    height={80}
                    width={100}
                  />
                ))}
              </div>

              <p className="text-sm mt-5">{campaignData.description}</p>
            </div>
            <div className="col-span-1">
              <DonationsCard
                campaignData={campaignData}
                reloadCampaignData={getData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampaignInfoPage;
/*
The selected code snippet is a functional component named `CampaignInfoPage` in a React application. This component is responsible for displaying detailed information about a specific campaign. Here's a breakdown of the code:

1. Import statements: The component imports necessary modules from the "antd" library, custom components, and other dependencies.

2. Function declaration: The `CampaignInfoPage` function is defined, which returns a React element.

3. State variables: The component uses React hooks to manage state. It declares the following state variables:
   - `navigate`: A function to navigate to different routes within the application.
   - `loading`: A boolean state variable to indicate whether the component is loading data.
   - `campaignData`: A state variable to store the campaign data fetched from the API.
   - `params`: An object containing the parameters extracted from the current URL.

4. `getData` function: This is an asynchronous function that fetches campaign data from the API using the `axios` library. It sets the `loading` state to `true` before making the API call, and then updates the `campaignData` state with the response data. If an error occurs during the API call, it displays an error message using the `message` component from "antd". Finally, it sets the `loading` state to `false`.

5. `useEffect` hook: The `useEffect` hook is used to call the `getData` function when the component mounts. This ensures that the campaign data is fetched when the page is loaded.

6. JSX return: The component returns a JSX element that renders the UI. It includes a "Back To Campaigns" button, a loading spinner, and the campaign information if the data is available. The campaign information includes the campaign name, images, and description. Additionally, it renders a `DonationsCard` component, which displays donation-related information and allows users to make donations.

Overall, the `CampaignInfoPage` component fetches and displays detailed information about a specific campaign, including its images, description, and donation-related data.
 */