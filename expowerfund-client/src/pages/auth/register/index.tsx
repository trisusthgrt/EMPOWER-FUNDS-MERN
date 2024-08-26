import { Button, Form, Input, message } from "antd";
import WelcomeContent from "../common/welcome-content";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Register successfull , please login to continue");
      navigate("/login");
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="welcome-content bg-primary md:flex justify-center items-center hidden">
        <WelcomeContent />
      </div>
      <div className="form-content flex items-center justify-center">
        <Form
          className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onSubmit}
        >
          <h1 className="text-2xl font-bold text-primary">
            Register your account
          </h1>

          <hr />

          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>

          <span className="text-sm">
            Have an account ? <Link to="/login">Login</Link>
          </span>


          <span className="text-sm mt-4">
  Have a vision to make a difference? Empower your cause with us!{" "}
  <a href="mailto:tripathy.sushobhan@gmail.com" className="text-primary font-bold">
    Reach out to us
  </a>{" "}
  and let's create a campaign that changes lives together.
</span>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;

/*
The selected code snippet is a React function component named `RegisterPage`. This component is responsible for rendering a registration form for users to create a new account. Here's a breakdown of the code:

1. Import statements: The component imports necessary modules from the `antd` library for UI components, `WelcomeContent` component from the `common` directory, and `Link`, `useNavigate` from `react-router-dom` for navigation, `axios` for making HTTP requests, and `useState` for managing component state.

2. Function component definition: The `RegisterPage` function component is defined.

3. State variables: The component uses the `useState` hook to manage two state variables: `loading` (boolean) to indicate whether the form submission is in progress, and `navigate` (function) to navigate to different routes.

4. `onSubmit` function: This function is called when the form is submitted. It performs the following tasks:
   - Sets the `loading` state to `true` to indicate that the form submission is in progress.
   - Makes an asynchronous POST request to the `/api/users/register` endpoint using `axios` to register the user.
   - If the registration is successful, displays a success message using `message.success`, navigates to the `/login` route using `navigate`, and sets the `loading` state back to `false`.
   - If an error occurs during the registration process, displays an error message using `message.error`, and sets the `loading` state back to `false`.

5. JSX return statement: The component returns a JSX expression that renders the registration form. The form includes fields for the user's full name, email, and password, as well as a submit button. It also includes a link to the login page and a call-to-action message for users with a vision to make a difference.

Overall, the `RegisterPage` component is responsible for handling user registration and rendering the registration form using the provided UI components.
*/