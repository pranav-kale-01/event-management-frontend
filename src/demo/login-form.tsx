import { useEffect, useState } from "react";
import { useNotification } from "./notification-context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const LoginForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Example of fetching protected data after login
      const protectedResponse = await fetch(`${API_URL}/api/protected`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (protectedResponse.ok) {
        // Handle successful login (e.g., redirect to dashboard)
        addNotification("Sucess", "Login Success!", "success");
        console.log("Successfully accessed protected route");

        // Store token and navigate to dashboard based on userType
        const token = data.token;
        const user = data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to appropriate dashboard based on userType
        if (user.userType === "Student") {
          navigate("/studentDashboard");
        } else if (user.userType === "Visitor") {
          navigate("/visitorDashboard");
        } else {
          navigate("/adminDashboard");
        }
      }
    } catch (error: any) {
      setError("An error occurred while logging in.");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData != null) {
      const user = JSON.parse(userData);

      if (user.userType === "Student") {
        navigate("/studentDashboard");
      } else if (user.userType === "Visitor") {
        navigate("/visitorDashboard");
      } else {
        navigate("/adminDashboard");
      }
    }
  });

  return (
    <div className="flex items-center justify-between min-h-screen bg-gray-100 w-screen">
      <div className="flex flex-col items-center w-1/3">
        <h1 className="mb-24 w-full text-center text-strong">
          Welcome to Campus Navigator Application!
        </h1>
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg relative overflow-hidden">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <a href="/signup-page" className="text-blue-600 hover:underline">
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div
        className="flex w-2/3 h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://mgmjournalism.org/images/about/about-mgm/mgm-university-aurangabad-about.jpg")',
        }}
      ></div>
    </div>
  );
};

export default LoginForm;
