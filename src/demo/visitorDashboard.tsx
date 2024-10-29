import React from 'react';
import GoogleMap from '../components/GoogleMap'; // Assume you have this component for the map
import Chatbot from '../components/ChatBot'; // Assume you have this component for the chatbot
import IndoorNavigationCarousel from '../components/IndoorNavigationCarousel'; // Assume you have this component for the carousel

const VisitorDashboard = () => {
  return (
    <div className="flex flex-col p-6 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Student Dashboard</h1>

      {/* Events Section */}
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
        <div className="flex flex-wrap justify-between">
          <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 mb-4">
            <h3 className="font-bold">Sports</h3>
            <ul className="list-disc list-inside">
              <li>Football Match - Oct 15</li>
              <li>Basketball Tournament - Oct 20</li>
              <li>Cricket League - Oct 25</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 mb-4">
            <h3 className="font-bold">Technical</h3>
            <ul className="list-disc list-inside">
              <li>Hackathon - Nov 1</li>
              <li>Workshop on AI - Nov 5</li>
              <li>Robotics Competition - Nov 10</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 mb-4">
            <h3 className="font-bold">Cultural</h3>
            <ul className="list-disc list-inside">
              <li>Annual Cultural Fest - Nov 15</li>
              <li>Dance Competition - Nov 18</li>
              <li>Music Night - Nov 22</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="flex-1 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Campus Map</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <GoogleMap />
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Chatbot</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <Chatbot />
        </div>
      </div>

      {/* Indoor Navigation Carousel Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Indoor Navigation</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <IndoorNavigationCarousel />
        </div>
      </div>
    </div>
  );
};

export default VisitorDashboard;
