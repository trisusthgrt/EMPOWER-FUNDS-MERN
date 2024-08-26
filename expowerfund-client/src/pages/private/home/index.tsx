import { useEffect, useState } from "react";
import PageTitle from "../../../components/page-title";
import { CampaignTypeProps } from "../../../interfaces";
import axios from "axios";
import { message, Progress, Spin } from "antd";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [campaigns, setCampaigns] = useState<CampaignTypeProps[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Campaigns..." />
      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {campaigns.map((campaign) => (
          <div
            className="rounded border border-solid hover:border-primary cursor-pointer"
            key={campaign._id}
            onClick={() => navigate(`/campaign/${campaign._id}`)}
          >
            <img
              src={campaign.images[0]}
              alt={campaign.name}
              className="rounded-t w-full h-52 object-cover"
            />

            <div className="flex flex-col gap-1 p-3">
              <h1 className="text-sm font-semibold">{campaign.name}</h1>
            </div>

            <div className="px-2 pb-2">
              <Progress
               percent={Number(
                (
                  (campaign.collectedAmount / campaign.targetAmount) *
                  100
                ).toFixed(2)
              )}
              />
              <h1 className="text-xs text-black">
                $ {campaign.collectedAmount} raised of $ {campaign.targetAmount}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
/*
The selected code snippet is a functional component named `Homepage` in a React application. This component is responsible for fetching and displaying a list of campaigns on the homepage.

Here's a breakdown of the code:

1. Import statements: The code imports necessary dependencies such as `useState`, `useEffect`, `PageTitle`, `CampaignTypeProps`, `axios`, `message`, `Progress`, and `Spin` from their respective modules.

2. `Homepage` function component: This function component initializes state variables `campaigns` (to store the fetched campaigns) and `loading` (to indicate whether data is being fetched). It also uses the `useNavigate` hook from `react-router-dom` to navigate to different routes.

3. `getData` function: This is an asynchronous function that fetches campaign data from the server using the `axios` library. It sets the `loading` state to `true` before making the API call, and then updates the `campaigns` state with the fetched data. If an error occurs during the API call, it displays an error message using the `message` component from Ant Design. Finally, it sets the `loading` state to `false`.

4. `useEffect` hook: This hook is used to call the `getData` function when the component mounts. This ensures that the campaign data is fetched when the homepage is loaded.

5. JSX return statement: The JSX return statement renders the UI of the homepage. It includes a `PageTitle` component, a loading spinner using the `Spin` component from Ant Design, and a grid of campaign cards. Each campaign card displays the campaign image, name, progress bar, and collected amount. The `onClick` event of each card triggers navigation to the campaign details page using the `navigate` function.

Overall, the selected code snippet is responsible for fetching and displaying a list of campaigns on the homepage of a React application. It uses the `useState` and `useEffect` hooks to manage state and perform side effects, respectively. The fetched campaign data is displayed in a visually appealing grid format, and the user can navigate to the campaign details page by clicking on a campaign card.
*/