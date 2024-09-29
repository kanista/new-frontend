import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import './Register.scss';
import authService from "../../services/authService";

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password, confirm_password } = values;

        if (password !== confirm_password) {
            message.error("Passwords does not match!");
            return;
        }

        console.log(values);
        try {
            const response = await authService.register(values);
            console.log(response.status);
            // Check if the registration was successful
            if (response.status === 200) {
                console.log(response.data);
                message.success(response.data.message); // Show success message
                navigate("/login"); // Redirect after successful registration
            } else if (response.status === 400) {
                console.log(response.data);
                message.warning(response.data.message || "Email already exists."); // Show error if email exists
            } else {
                console.log(response.data);
                message.error(response.data.message || "Registration failed."); // Show general error
            }
        } catch (error) {
            message.error("An unexpected error occurred. Please try again.");
        }

    };

    return (
        <div className="register-container">
            <Form
                form={form}
                name="register"
                className="registration-form"
                layout="vertical"
                onFinish={onFinish}
            >
                <h1 className="title">Registration</h1>
                <p className="subtitle">Create Your Account Now!</p>
                <br />

                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name!" }]}
                >
                    <Input placeholder="Enter your name" required />
                </Form.Item>

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
                    rules={[
                        { required: true, message: "Please enter your password!" },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/,
                            message: "Password must be 8-12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                        },
                    ]}
                >
                    <Input.Password placeholder="......" />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm_password"
                    rules={[
                        { required: true, message: "Please enter your confirm password!" },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/,
                            message: "Password must be 8-12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                        },
                    ]}
                >
                    <Input.Password placeholder="......" />
                </Form.Item>

                <Form.Item>
                    <Button type="default" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

                <p className="login-prompt">
                    Already have an account? <span className="login-link" onClick={() => navigate("/login")}>Log In</span>
                </p>
            </Form>
        </div>
    );
};

export default Register;
