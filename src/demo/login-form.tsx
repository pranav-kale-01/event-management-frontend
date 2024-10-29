import React, { useState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "./notification-context";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitError("");

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
      userType: "",
    });

    if (emailError || passwordError) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
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

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Example of fetching protected data after login
      const protectedResponse = await fetch(`${API_URL}/protected`, {
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
        const userType = data.userType;

        localStorage.setItem("token", token); // Store the token as needed

        if (userType === "Student") {
          navigate("/studentDashboard");
        } else if (userType === "Visitor") {
          navigate("/visitorDashboard");
        }

        console.log( data );

        // Redirect to appropriate dashboard based on userType
        if( data.userType === "Student") {
          navigate("/studentDashboard");
        }
        else if( data.userType === "Visitor") {
          navigate("/visitorDashboard");
        }
        else {
          navigate("/adminDashboard");
        }
        
      }
    } catch (error: any) {
      setSubmitError(error.message || "Login failed. Please try again.");

      setError("An error occurred while logging in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Optional: Function to check if user is already logged in
  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/protected`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex items-center justify-between min-h-screen bg-gray-100 w-screen">
      <div className="flex flex-col items-center w-1/3">
        <h1 className="mb-24 w-full text-center text-strong">Welcome to Campus Navigator Application!</h1>
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
                <a href="/" className="text-blue-600 hover:underline">
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