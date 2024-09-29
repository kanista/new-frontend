import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import './login.scss';
import authService from "../../services/authService";

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await authService.login(values);
            console.log(response);

            if (response.status===200) {
                message.success(response.data.message);

                // Save login status or token
                localStorage.setItem("isLoggedIn", true);
                console.log(localStorage.getItem("isLoggedIn"));

                localStorage.setItem("token",response.data.data.token);
                console.log(localStorage.getItem("token"));
                localStorage.setItem("userName",response.data.data.username);
                console.log(localStorage.getItem("userName"));
                localStorage.setItem("userEmail",response.data.data.email);
                console.log(localStorage.getItem("userEmail"));

                // Redirect to the dashboard
                navigate("/dashboard");
            } else if (response.status === 404) {
                message.warning(response.data.message || "User not found.");
            } else if (response.status === 401) {
                message.error(response.data.message || "Incorrect password.");
            } else {
                message.error(response.data.message || "Login failed.");
            }

        } catch (error) {
            message.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <Form
                form={form}
                name="login"
                className="login-form"
                layout="vertical"
                onFinish={onFinish}
            >
                <h1 className="title">Log In</h1>
                <p className="subtitle">Welcome back! Please enter your details</p>
                <br />

                <Form.Item
                    label="E-mail Address"
                    name="email"
                    rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
                >
                    <Input type="email" placeholder="Enter e-mail address" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="......" />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit">
                        Log In
                    </Button>
                </Form.Item>

                <p className="register-prompt">
                    Don't have an account? <span className="register-link" onClick={() => navigate("/register")}>Register</span>
                </p>
            </Form>
        </div>
    );
};

export default Login;


