// src/pages/MeditationCenterPage.tsx
import React from "react";

const MeditationCenterPage: React.FC = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen p-6">
      <header className="text-black flex justify-center items-center p-4 shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Meditation Center</h1>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold">Meditation Center Information</h2>
          <p className="mt-4 text-gray-700">
            Welcome to our Meditation Center, a peaceful place to relax, meditate, and recharge.
            We offer sessions throughout the week for students and visitors.
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Timings</h3>
            <p className="text-gray-700">Monday to Friday: 7 AM - 9 AM</p>
            <p className="text-gray-700">Weekend: 8 AM - 10 AM</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Facilities</h3>
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

export default MeditationCenterPage;