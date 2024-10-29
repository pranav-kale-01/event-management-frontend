import React, { useState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "./notification-context";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/api";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    userType: "Student",
  });

  const [errors, setErrors] = useState({
    email: "",
    userType: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    // Validate all fields
    const emailError = validateEmail(formData.email);
    // const passwordError = validatePassword(formData.password);
    const userType = formData.userType;

    setErrors({
      email: emailError,
      userType: userType,
    });

    if (emailError) return;

    try {
      const response = await fetch(`${API_URL}/auth/otp/sendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          userType: formData.userType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setSubmitError(
          errorData.message || "Failed to send OTP. Please try again."
        );
      } else {
        // Handle successful registration (e.g., redirect to login or dashboard)
        addNotification("Sucess", "Otp Sent Successfully!", "success");

        // Redirect to VerifyOtp page
        navigate("/verifyOtp",  { state: { email: formData.email, userType: formData.userType } } );
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }

    // setIsSubmitting(true);

    // try {
    //   console.log("test");
    //   const response = await fetch(`${API_URL}/auth/register`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();

    //   console.log(response);
    //   if (!response.ok) {
    //     throw new Error(data.message || "Registration failed");
    //   }

    //   // Store token in localStorage
    //   localStorage.setItem("token", data.token);

    //   // Handle successful registration (e.g., redirect to login or dashboard)
    //   addNotification("Sucess", "User Registered Successfully!", "success");

    //   // Redirect to the login page
    //   navigate("/login");
    // } catch (error: any) {
    //   setSubmitError(error.message || "Registration failed. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-gray-500">Enter your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 bg-white"
              >
                <option value="Student">Student</option>
                <option value="Visitor">Visitor</option>
              </select>
            </div>

            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Image Section */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://mgmjournalism.org/images/about/about-mgm/mgm-university-aurangabad-about.jpg")' }}
        >
          <div className="flex items-center justify-center h-full bg-gray-800 bg-opacity-50">
            <h2 className="text-white text-4xl font-semibold">
              Welcome to Campus Navigator!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
