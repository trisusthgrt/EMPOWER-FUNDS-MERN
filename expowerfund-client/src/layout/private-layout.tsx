import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import axios from "axios";
import usersStore, { UsersStoreProps } from "../store/users-store";
import { message, Spin } from "antd";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser }: UsersStoreProps =
    usersStore() as UsersStoreProps;
  const pathname = window.location.pathname;
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/current-user");
      setCurrentUser(response.data.user);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/login");
    }

    if (!currentUser) {
      getData();
    }
  }, []);

  if(loading)
  {
    return <div className="flex justify-center items-center h-96">
       <Spin  />
    </div>
  }

  if (!currentUser) return null;

  if (!currentUser.isAdmin && pathname.includes("/admin")) {
    return (
      <div>
        <Header />
        <div className="p-5 text-sm">
          You are not authorized to view this page
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
/*
The selected code is a functional component named `PrivateLayout` in a TypeScript React application. This component is responsible for handling private routes and user authentication. Here's a breakdown of the code:

1. Import statements: The code imports necessary libraries and components, including `Cookies`, `useEffect`, `useState`, `useNavigate`, `Header`, `axios`, `usersStore`, and Ant Design's `message` and `Spin` components.

2. `PrivateLayout` function: This function takes `children` as a prop, which represents the content to be rendered within the layout.

3. State variables: The code declares state variables using `useState`. `loading` is a boolean variable to track the loading state of the user data, and `currentUser` is used to store the current logged-in user data.

4. `getData` function: This asynchronous function is responsible for fetching the current user data from the server using `axios`. It sets the loading state to `true`, makes a GET request to `/api/users/current-user`, and updates the `currentUser` state with the response data. If an error occurs, it displays an error message using Ant Design's `message` component. Finally, it sets the loading state to `false`.

5. `useEffect` hook: The code uses the `useEffect` hook to perform side effects. It checks if there is a token in the `Cookies` and if the `currentUser` state is empty. If either condition is true, it calls the `getData` function to fetch the user data.

6. Conditional rendering: The code uses conditional rendering to handle different scenarios. If the `loading` state is true, it displays a loading spinner using Ant Design's `Spin` component. If the `currentUser` state is empty, it returns `null`. If the user is not an admin and the current pathname includes "/admin", it displays a message indicating unauthorized access. Otherwise, it renders the `Header` component and the children content within a div with padding.

Overall, the `PrivateLayout` component is responsible for handling private routes, user authentication, and displaying appropriate content based on the user's role and route.
*/