import React from "react";
import swimmingImage from "../assets/swimming.png"; // Ensure this path is correct

const SwimmingPage: React.FC = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen p-6">
      <header className="text-black flex justify-center items-center p-4 shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Swimming Pool Information</h1>
      </header>

      {/* Main Content Section */}
      <main className="p-6">
        {/* Swimming Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold">Swimming Pool Information</h2>
          <img
            src={swimmingImage} // Ensure this path is correct
            alt="Swimming Pool"
            className="w-full h-60 object-cover rounded-lg mt-4"
          />
          <p className="mt-4 text-gray-700">
            Information about the campus swimming pool and its facilities.
          </p>
          {/* Swimming Pool Details */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Facilities</h3>
            <ul className="list-disc ml-6">
              <li>24/7 Access</li>
              <li>Heated Pool</li>
              <li>Separate Sections for Male & Female</li>
              <li>Trained Lifeguards</li>
              <li>Locker Rooms and Showers</li>
            </ul>
          </div>
          {/* Swimming Pool Timings */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Timings</h3>
            <p className="text-gray-700">Open: 6 AM - 9 PM</p>
            <p className="text-gray-700">Closed on Sundays for Maintenance</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SwimmingPage;

