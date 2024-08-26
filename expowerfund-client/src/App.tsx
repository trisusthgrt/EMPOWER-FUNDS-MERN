import "./App.css";
import PrivateLayout from "./layout/private-layout";
import PublicLayout from "./layout/public-layout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import CampaignsPage from "./pages/private/admin/campaigns";
import CampaignForm from "./pages/private/admin/campaigns/campaign-form";
import AdminDonationsPage from "./pages/private/admin/donations";
import AdminReportsPage from "./pages/private/admin/reports";
import UsersList from "./pages/private/admin/users";
import CampaignInfoPage from "./pages/private/campaign-info";
import Homepage from "./pages/private/home";
import DonationsPage from "./pages/private/user/donations";
import ProfilePage from "./pages/private/user/profile";
import ReportsPage from "./pages/private/user/reports";

import ThemeProvider from "./providers/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLayout>
                <Homepage />
              </PrivateLayout>
            }
          />

          <Route
            path="/campaign/:id"
            element={
              <PrivateLayout>
                <CampaignInfoPage />
              </PrivateLayout>
            }
          />

          <Route
            path="/admin/campaigns"
            element={
              <PrivateLayout>
                <CampaignsPage />
              </PrivateLayout>
            }
          />

          <Route
            path="/admin/campaigns/create"
            element={
              <PrivateLayout>
                <CampaignForm />
              </PrivateLayout>
            }
          />

          <Route
            path="/admin/campaigns/edit/:id"
            element={
              <PrivateLayout>
                <CampaignForm />
              </PrivateLayout>
            }
          />

          <Route
            path="/user/donations"
            element={
              <PrivateLayout>
                <DonationsPage />
              </PrivateLayout>
            }
          />

          <Route
            path="/user/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />

          <Route
            path="/user/reports"
            element={
              <PrivateLayout>
                <ReportsPage />
              </PrivateLayout>
            }
          />

          <Route
            path="/admin/donations"
            element={
              <PrivateLayout>
                <AdminDonationsPage />
              </PrivateLayout>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <PrivateLayout>
                <AdminReportsPage />
              </PrivateLayout>
            }
          />

          <Route
            path="/admin/users"
            element={
              <PrivateLayout>
                <UsersList />
              </PrivateLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
/*
The selected code snippet is part of the main `App` component in a React application. This component is responsible for defining the routing structure of the application. The application uses the `react-router-dom` library to handle navigation between different pages.

The `App` component is wrapped with a `ThemeProvider` component, which provides a theme context for the application. The `BrowserRouter` component is used to wrap the routes, allowing the application to use browser-based routing.

Inside the `BrowserRouter`, the `Routes` component is used to define the routes. Each route is defined using the `Route` component, which takes a `path` prop to specify the URL path and an `element` prop to specify the component to render when the route is matched.

The routes are categorized into two types: public routes and private routes. Public routes are accessible to all users, while private routes require authentication. The `PublicLayout` and `PrivateLayout` components are used to wrap the corresponding routes and provide a consistent layout for each type of route.

The selected code snippet includes the definition of all the routes in the application, including login, registration, homepage, campaign information, admin-related pages (campaigns, donations, reports, users), and user-related pages (donations, profile, reports). Each route is associated with the appropriate component to be rendered when the route is accessed.

Overall, the selected code snippet demonstrates the configuration of routing in a React application using the `react-router-dom` library. It defines the structure of the application's navigation and ensures that the appropriate components are rendered based on the user's actions.
*/