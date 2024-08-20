// import { Button, Form, Input, message } from "antd";
// import WelcomeContent from "../common/welcome-content";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const onFinish = async (values: { email: string; password: string }) => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/users/login", values);
//       message.success("Login successfull");
//       Cookies.set("token", response.data.token);
//       navigate("/");
//     } catch (error: any) {
//       message.error(error?.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);//
//     }
//   };
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
//       <div className="welcome-content bg-primary md:flex justify-center items-center hidden">
//         <WelcomeContent />
//       </div>
//       <div className="form-content flex items-center justify-center">
//         <Form
//           className="flex flex-col gap-5 w-96"
//           layout="vertical"
//           onFinish={onFinish}
//         >
//           <h1 className="text-2xl font-bold text-primary">
//             Login to your account
//           </h1>

//           <hr />

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: "Please input your email!" }]}
//           >
//             <Input placeholder="Email" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input type="password" placeholder="Password" />
//           </Form.Item>

//           <Button type="primary" htmlType="submit" loading={loading}>
//             Login
//           </Button>

//           <span className="text-sm">
//             Don't have an account ? <Link to="/register">Register</Link>
//           </span>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import { Button, Form, Input, message } from "antd";
import WelcomeContent from "../common/welcome-content";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      message.success("Login successful");
      Cookies.set("token", response.data.token);
      navigate("/");
    } catch (error: any) {
      message.error(error?.response?.data?.message || error.message);
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
          onFinish={onFinish}
        >
          <h1 className="text-2xl font-bold text-primary">
            Login to your account
          </h1>

          <hr />

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
            Login
          </Button>

          <span className="text-sm">
            Don't have an account? <Link to="/register">Register</Link>
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

export default LoginPage;

// The selected code snippet is a functional component named `LoginPage` in a TypeScript React application. This component is responsible for rendering a login page with a form for users to enter their email and password.

// Here's a breakdown of the code:

// 1. Import statements: The code imports necessary components and libraries from the `antd` library, `react-router-dom`, and other dependencies.

// 2. `useState` hook: The `useState` hook is used to manage the `loading` state, which determines whether the login button is loading or not.

// 3. `useNavigate` hook: The `useNavigate` hook is used to navigate to the home page after a successful login.

// 4. `onFinish` function: This function is called when the form is submitted. It performs the following tasks:
//    - Sets the `loading` state to `true` to indicate that the login process is in progress.
//    - Makes an asynchronous POST request to the `/api/users/login` endpoint with the form values.
//    - If the request is successful, displays a success message, sets a cookie with the returned token, and navigates to the home page.
//    - If an error occurs during the request, displays an error message.
//    - Regardless of the outcome, sets the `loading` state back to `false`.

// 5. `LoginPage` function component: This is the main component that renders the login page. It uses the `Form` component from `antd` to create a form with email and password fields. The `onFinish` function is passed as a prop to handle form submission.

// 6. JSX code: The JSX code inside the `LoginPage` function renders the login page layout, including the welcome content, form, and navigation links. The `loading` state is used to conditionally display a loading indicator on the login button.

// Overall, the selected code snippet demonstrates a functional login page in a TypeScript React application using the `antd` library and `react-router-dom`. It handles form submission, error handling, and navigation after successful login.