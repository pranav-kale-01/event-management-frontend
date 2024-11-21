import React from "react";
import hostelImage from "../assets/hostel.png"; // Ensure the path is correct

const HostelPage: React.FC = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen p-6">
      {/* Header Section */}
      <header className="text-black flex justify-center items-center p-4 shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Hostel Information</h1>
      </header>

      {/* Main Content Section */}
      <main className="p-6">
        {/* Hostel Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold">Hostel Information</h2>
          <img
  src={hostelImage}
  alt="Hostel"
  className="w-full h-60 object-cover rounded-lg mt-10"
/>

          <p className="mt-4 text-gray-700">
            Information about the campus hostel and accommodation facilities.
          </p>
          {/* Hostel Details */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Facilities</h3>
            <ul className="list-disc ml-6">
              <li>24/7 Water and Electricity</li>
              <li>Wi-Fi Access</li>
              <li>Common Room</li>
              <li>Laundry Services</li>
              <li>Mess and Dining Services</li>
            </ul>
          </div>
          {/* Hostel Timings */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Timings</h3>
            <p className="text-gray-700">Check-in: 8 AM - 10 PM</p>
            <p className="text-gray-700">Check-out: 8 AM - 12 PM</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostelPage;
