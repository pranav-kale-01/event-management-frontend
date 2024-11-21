import React from "react";
import canteenImage from "../assets/canteen.png"; // Ensure this path is correct

const CanteenPage: React.FC = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen p-6">
      {/* Header Section */}
      <header className="text-black flex justify-between items-center p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Canteen Information</h1>
      </header>

      {/* Main Content Section */}
      <main className="p-6">
        {/* Canteen Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold">Welcome to the Canteen</h2>
          <img
            src={canteenImage} // Ensure the path is correct
            alt="Canteen"
            className="w-full h-60 object-cover rounded-lg mt-4"
          />
          <p className="mt-4 text-gray-700">
            Here you can find the menu, opening hours, and more information about the canteen.
          </p>
          {/* Menu Details */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Menu</h3>
            <ul className="list-disc ml-6">
              <li>Pizza</li>
              <li>Burgers</li>
              <li>Pasta</li>
              <li>Sandwiches</li>
              <li>Salads</li>
            </ul>
          </div>
          {/* Opening Hours */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Opening Hours</h3>
            <p className="text-gray-700">Monday to Friday: 8 AM - 8 PM</p>
            <p className="text-gray-700">Saturday & Sunday: 10 AM - 4 PM</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CanteenPage;
