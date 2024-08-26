import { MenuProps, Dropdown, Button, message } from "antd";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import usersStore, { UsersStoreProps } from "../store/users-store";
import { CircleUserRound } from "lucide-react";

function Header() {
  const { currentUser } = usersStore() as UsersStoreProps;
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("token");
    message.success("Logged out successfully");
    navigate("/login");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/user/profile">Profile</Link>,
    },
    {
      key: "2",
      label: <Link to="/user/donations">Donations</Link>,
    },
    {
      key: "3",
      label: <Link to="/user/reports">Reports</Link>,
    },
    {
      key: "4",
      label: <span onClick={onLogout}>Logout</span>,
    },
  ];

  const adminMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/admin/donations">Donations</Link>,
    },
    {
      key: "2",
      label: <Link to="/admin/campaigns">Campaigns</Link>,
    },
    {
      key: "3",
      label: <Link to="/admin/users">Users</Link>,
    },
    {
      key: "4",
      label: <Link to="/admin/reports">Reports</Link>,
    },
    {
      key: "5",
      label: <span onClick={onLogout}>Logout</span>,
    },
  ];

  const menuItemsToUse: any[] = currentUser?.isAdmin
    ? adminMenuItems
    : userMenuItems;
  return (
    <div className="bg-primary flex justify-between items-center p-5">
      <h1
        className="text-2xl font-bold text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        EMPOWERFUNDS
      </h1>

      <Dropdown menu={{ items: menuItemsToUse }} placement="bottom">
        <Button size='middle' icon={<CircleUserRound size={16} />}>
          {currentUser?.name}
        </Button>
      </Dropdown>
    </div>
  );
}

export default Header;
/*
The selected code snippet is part of a React component named `Header`. This component is responsible for rendering the header section of a web application. It includes the application's logo, a dropdown menu for user actions, and navigation links based on the user's role (admin or regular user).

Here's a breakdown of the selected code:

1. Import statements: The code imports necessary modules and components from the `antd`, `react-router-dom`, `js-cookie`, and `lucide-react` libraries.

2. `usersStore` and `UsersStoreProps` usage: The `usersStore` function is used to access the current user's information, and the `UsersStoreProps` interface defines the structure of the user data.

3. `useNavigate` hook: The `useNavigate` hook is used to programmatically navigate to different routes within the application.

4. `onLogout` function: This function is called when the user clicks the "Logout" option in the dropdown menu. It removes the user's token from cookies, displays a success message, and navigates to the login page.

5. `userMenuItems` and `adminMenuItems` arrays: These arrays define the menu items for regular users and admin users, respectively. Each item is an object with a `key` and a `label`, which can be a link or a logout action.

6. `menuItemsToUse` variable: This variable determines which menu items to use based on the user's role. If the user is an admin, `adminMenuItems` is used; otherwise, `userMenuItems` is used.

7. JSX code: The JSX code renders the header section of the application. It includes the application logo, a dropdown menu with the appropriate menu items, and the user's name. The logo is clickable and navigates to the home page.

Overall, the selected code snippet is responsible for rendering the header section of the web application, providing navigation links, and handling user authentication and logout functionality.
*/