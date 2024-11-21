import { useState } from "react";
import GoogleMap from "../components/GoogleMap"; // Assuming you have this component for the map
import Chatbot from "../components/ChatBot"; // Assuming you have this component for the chatbot
import IndoorNavigationCarousel from "../components/IndoorNavigationCarousel"; // Assuming you have this component for the carousel             
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomFooter from "@/components/customFooter";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for routing
import ImportantLinks from "@/components/ImportantLinks";
import { API_URL } from "../constants";

const VisitorDashboard = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleLogout = () => {
    // Perform logout action
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/events/submitFeedback`,
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="bg-[#f3f4f6] flex flex-col min-h-screen w-screen overflow-x-hidden">
      {/* Header */}
      <header className="text-black flex justify-between items-center p-4 shadow-lg bg-white">
        <h1 className="text-3xl font-bold">Campus Helper</h1>
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/Indoor")}
            className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Indoor Navigation
          </button>
          <button
            onClick={() => navigate("/outdoor-navigation")}
            className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Outdoor Navigation
          </button>
          
          <button
            onClick={() => navigate("/services")}
            className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Explore services
          </button>




          <button
            onClick={() => navigate("/live-map")}
            className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            LiveMaps
          </button>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-row flex-1 p-6">
        {/* Events Section */}
        <div className="flex flex-col stats-section w-full">
          {/* Campus Map and Indoor Navigation Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6 h-fit">
            <div className="bg-white rounded-lg shadow-lg flex-1">
              <h2 className="top-0 z-1 text-2xl font-semibold p-4">
                Campus Map
              </h2>
              <div className="z-10 w-full p-2 rounded-lg">
                <GoogleMap />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-semibold p-4">Indoor Navigation</h2>
              <div className="h-64 w-full p-2">
                <IndoorNavigationCarousel />
              </div>
            </div>
          </div>

          <div className="w-full bg-white flex flex-col py-4 items-center">
            <div className="text-black w-[50%] border rounded-lg p-4 pb-8 mb-2 shadow-lg bg-white">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                College Feedback Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 font-medium">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Feedback:</span>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 bg-white"
                    rows={4}
                  ></textarea>
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Rating:</span>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 bg-white"
                  >
                    <option value="">Choose rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-4 rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/3 h-screen">
          {/* Important Links */}
          <div className="bg-white w-full mx-4 rounded-lg shadow-lg pb-12 p-4 mb-4">
            <ImportantLinks />
          </div>

          {/* Chatbot Section */}
          <div className="bg-white w-full mx-4 rounded-lg shadow-lg pb-12 p-4 h-2/3 ">
            <h2 className="text-2xl font-semibold">Chat with Us</h2>
            <Chatbot />
          </div>
        </div>
      </main>

      <CustomFooter />
    </div>
  );
};

export default VisitorDashboard;
