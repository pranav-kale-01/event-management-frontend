import { useState } from "react";
import GoogleMap from "../components/GoogleMap"; // Assume you have this component for the map
import Chatbot from "../components/ChatBot"; // Assume you have this component for the chatbot
import IndoorNavigationCarousel from "../components/IndoorNavigationCarousel"; // Assume you have this component for the carousel
import { Button } from "@/components/ui/button";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/api";

const eventsData = {
  sports: [
    { name: "Football Match", date: "Oct 15" },
    { name: "Basketball Tournament", date: "Oct 20" },
    { name: "Cricket League", date: "Oct 25" },
  ],
  technical: [
    { name: "Hackathon", date: "Nov 1" },
    { name: "Workshop on AI", date: "Nov 5" },
    { name: "Robotics Competition", date: "Nov 10" },
  ],
  cultural: [
    { name: "Annual Cultural Fest", date: "Nov 15" },
    { name: "Dance Competition", date: "Nov 18" },
    { name: "Music Night", date: "Nov 22" },
  ],
};

const VisitorDashboard = () => {
  const navigate = useNavigate();

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
        `${API_URL}/events/submitFeedback`,
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
      {/* Header */}
      <header className="text-black flex justify-between items-center p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Campus Navigator</h1>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700">
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex flex-row flex-1 p-6">
        {/* Events Section */}
        <div className="flex flex-col stats-section w-full">
          {/* Campus Map and Indoor Navigation Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6 h-full">
            <div className="bg-white rounded-lg shadow-lg flex-1">
              <h2 className="top-0 z-1 text-2xl font-semibold p-4">
                Campus Map
              </h2>
              <div className="z-10 w-full">
                <GoogleMap />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-semibold p-4">Indoor Navigation</h2>
              <div className="h-56">
                <IndoorNavigationCarousel />
              </div>
            </div>
          </div>

          {/* <div className=" text-black rounded-lg p-4 mb-6 shadow-lg bg-white">
            <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(eventsData).map(([category, events]) => (
                <Card
                  key={category}
                  className="bg-white text-black rounded-lg shadow-md p-4"
                >
                  <h3 className="font-bold">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div>
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2"
                      >
                        <span>{event.name}</span>
                        <Badge className="bg-blue-500 text-black rounded-full px-2 py-1">
                          {event.date}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div> */}

          <div className="text-black rounded-lg p-4 mb-6 shadow-lg bg-white">
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring focus:ring-indigo-300"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        <div className="flex w-1/3">
          {/* Chatbot Section */}
          <div className="bg-white w-full mx-4 rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-semibold mb-2">Chatbot</h2>
            <Chatbot />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className=" text-black text-center p-4">
        <p className="text-sm">
          JNEC Aurangabad | Contact: 123-456-7890 | Address: Aurangabad,
          Maharashtra, India
        </p>
      </footer>
    </div>
  );
};

export default VisitorDashboard;
