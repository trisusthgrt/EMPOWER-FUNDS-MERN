import dayjs from "dayjs";
import PageTitle from "../../../../components/page-title";
import usersStore, { UsersStoreProps } from "../../../../store/users-store";
import { useState } from "react";
import { Button, Input } from "antd";

function ProfilePage() {
  const { currentUser } = usersStore() as UsersStoreProps;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const getUserProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{key}</span>
        <span className="font-semibold text-sm">{value}</span>
      </div>
    );
  };
  return (
    <div>
      <PageTitle title="Profile" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        {getUserProperty("ID", currentUser?._id || "")}
        {getUserProperty("Name", currentUser?.name || "")}
        {getUserProperty("Email", currentUser?.email || "")}
        {getUserProperty("Role", currentUser?.isAdmin ? "Admin" : "User")}
        {getUserProperty(
          "Created At",
          dayjs(currentUser?.createdAt).format("MMM DD YYYY , hh:mm A") || ""
        )}
        {getUserProperty(
          "Updated At",
          dayjs(currentUser?.updatedAt).format("MMM DD YYYY , hh:mm A") || ""
        )}
      </div>

      <div className="mt-7 border border-primary p-5">
        <h1 className="text-lg font-bold text-primary">Change Password</h1>
        <div className="flex gap-5">
          <div className="flex flex-col mt-5">
            <label htmlFor="Old Password"></label>
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-5">
            <label htmlFor="New Password"></label>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button type="primary">Update Password</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
/*
The selected code snippet is a React functional component named `ProfilePage`. This component is responsible for rendering the user's profile page. It displays various user properties such as ID, name, email, role, created at, and updated at. Additionally, it provides an interface for changing the user's password.

Here's a breakdown of the selected code:

1. Import statements: The code imports necessary libraries and components from external sources. It imports `dayjs` for date formatting, `PageTitle` from the `"../../../../components/page-title"` path, `usersStore` and `UsersStoreProps` from `"../../../../store/users-store"`, and `useState` and `Button`, `Input` from `"antd"`.

2. `ProfilePage` function: This is the main component function. It takes no props and returns JSX to render the profile page.

3. `currentUser` state: The `currentUser` state is initialized using the `usersStore` function. It retrieves the current user's data from the store.

4. `oldPassword` and `newPassword` state: The `oldPassword` and `newPassword` states are initialized using the `useState` hook. They store the user's old and new password inputs.

5. `getUserProperty` function: This is a helper function that takes a key and value as parameters and returns JSX to display the key-value pair in a specific format.

6. JSX: The component returns JSX to render the profile page. It includes a `PageTitle` component, a grid layout to display user properties, and a form for changing the password. The form includes input fields for the old and new passwords, and a button to update the password.

Overall, the selected code snippet is responsible for rendering the user's profile page with various user properties and an interface for changing the password.
*/
