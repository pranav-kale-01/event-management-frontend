// src/pages/LibraryPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import libraryImage from "../assets/library.png"; // Replace with your actual image path
import meditationImage from "../assets/meditation.png"; // Replace with your actual image path

const LibraryPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="bg-[#f9fafb] min-h-screen p-6">
      {/* Previous Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="absolute top-6 left-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        &#8592; Previous
      </button>

      <header className="text-black flex justify-center items-center p-4 shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Library & Meditation Center</h1>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        {/* Library Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Library</h2>
          <img
            src={libraryImage} // Library image
            alt="Library"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4">
            Our library offers a wide range of books, e-books, and study materials to support your academic journey. It's the perfect place to study and explore new ideas.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Library Timings</h3>
            <p className="text-gray-700">Monday to Friday: 8 AM - 8 PM</p>
            <p className="text-gray-700">Saturday: 9 AM - 4 PM</p>
          </div>
        </div>

        {/* Meditation Center Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Meditation Center</h2>
          <img
            src={meditationImage} // Meditation image
            alt="Meditation Center"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4">
            Welcome to our Meditation Center, a peaceful place to relax, meditate, and recharge. We offer sessions throughout the week for students and visitors to reconnect with their inner peace.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Meditation Timings</h3>
            <p className="text-gray-700">Monday to Friday: 7 AM - 9 AM</p>
            <p className="text-gray-700">Weekend: 8 AM - 10 AM</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Meditation Center Facilities</h3>
            <ul className="list-disc ml-6">
              <li>Guided Meditation Sessions</li>
              <li>Yoga and Breathing Exercises</li>
              <li>Peaceful Ambience</li>
              <li>Seating Mats and Cushions</li>
              <li>Refreshments After Sessions</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibraryPage;
