import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { UserTypeProps } from "../../../../interfaces";
import { message, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";

function UsersList() {
  const [users, setUsers] = useState<UserTypeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/all-users");
      setUsers(response.data.users);
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
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        dayjs(createdAt).format("MMM DD YYYY , hh:mm A"),
    },
  ];

  return (
    <div>
      <PageTitle title="Users" />
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default UsersList;
/*
The selected code snippet is a functional component named `UsersList` in a TypeScript React application. This component is responsible for fetching and displaying a list of users from an API endpoint.

Here's a breakdown of the code:

1. Import statements: The code imports necessary dependencies such as `useEffect`, `useState`, `PageTitle`, `UserTypeProps`, `message`, `Table`, and `axios`. It also imports `dayjs` for date formatting.

2. `UsersList` function: This is the main component function. It uses React hooks to manage state.

3. State variables: Two state variables are declared using `useState`: `users` of type `UserTypeProps[]` to store the fetched user data, and `loading` of type `boolean` to indicate whether the data is being fetched.

4. `getData` function: This is an asynchronous function that fetches user data from the API endpoint "/api/users/all-users" using `axios.get`. It sets the loading state to `true` before the API call, updates the `users` state with the fetched data, and sets the loading state to `false` afterward. If an error occurs during the API call, it displays an error message using `message.error`.

5. `useEffect` hook: The `getData` function is called inside the `useEffect` hook, which runs after the component is initially rendered. This ensures that the user data is fetched when the component mounts.

6. `columns` array: This array defines the columns for the `Table` component. Each column object has properties like `title`, `dataIndex`, `key`, and `render`. The `render` property is used to customize the display of certain column values.

7. `Table` component: The `Table` component is used to display the user data. It takes the `users` state as the `dataSource`, the `columns` array as the `columns`, the `loading` state as the `loading` prop, and the `_id` field as the `rowKey`.

8. Return statement: The component returns a `div` containing the `PageTitle` component and the `Table` component.

Overall, the `UsersList` component fetches user data from an API endpoint, displays it in a table, and handles loading states and error messages.

What is the data type of the 'users' state variable in the UsersList component?
The data type of the 'users' state variable in the UsersList component is `UserTypeProps[]`. This means that the 'users' state variable is an array of objects, where each object conforms to the `UserTypeProps` interface.
*/