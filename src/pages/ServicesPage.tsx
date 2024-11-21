import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import canteenImage from "../assets/canteen.png";
import hostelImage from "../assets/hostel.png";
import swimmingImage from "../assets/swimming.png";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#f9fafb] min-h-screen p-6"
      style={{
        backgroundImage: `url('/path-to-background-image.jpg')`, // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        Our Services
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {/* Canteen Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Canteen</h2>
          <img
            src={canteenImage}
            alt="Canteen"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600">
            Enjoy a variety of delicious food and beverages at our campus
            canteen!
          </p>
        </div>

        {/* Hostel Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Hostel</h2>
          <img
            src={hostelImage}
            alt="Hostel"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600">
            Comfortable accommodations with modern amenities and facilities!
          </p>
        </div>

        {/* Swimming Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Swimming Pool</h2>
          <img
            src={swimmingImage}
            alt="Swimming Pool"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600">
            Dive into our state-of-the-art swimming pool for relaxation and
            fitness.
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/library")} // Navigate to the LibraryPage
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServicesPage;
