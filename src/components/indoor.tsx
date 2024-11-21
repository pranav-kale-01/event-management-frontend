import React from "react";

const photos = [
  {
    id: 1,
    title: "Practical Lab",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1732136789676!6m8!1m7!1sCAoSLEFGMVFpcE1SMVFTX1RXV1RiNWY3WHNUemE3ZmdDcFhYRE84MHRhT3czNWpY!2m2!1d19.8800049168919!2d75.35629267072933!3f283.21!4f7.140000000000001!5f0.4000000000000002", // Practical Lab
  },
  {
    id: 2,
    title: "Classroom",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1732136657582!6m8!1m7!1sCAoSLEFGMVFpcE9ZbWVkSWJzUC0wdEJfRUlqRTJ0QnJObFVxTjQyT3dscFdHMzA4!2m2!1d19.87979128401751!2d75.35643010345358!3f0!4f0!5f0.4000000000000002", // Classroom
  },
  {
    id: 3,
    title: "Makers Lab",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1732137265704!6m8!1m7!1sCAoSLEFGMVFpcE1TemNITEVWNGtYMWtxSGJ2NUFoX2hUa080RV9zdFBzM1BfUEo2!2m2!1d19.87962528208565!2d75.35662081895117!3f-7.012712011252028!4f1.7024429480692191!5f0.8553531604721205", // Makers Lab
  },
  {
    id: 4,
    title: "Practical Lab 2",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1732137469761!6m8!1m7!1sCAoSLEFGMVFpcFBiSnc2VHdfcFVEMVdGR1VQWGh0T1BZdGxHZTJxN3JPYjRxcUNk!2m2!1d19.87969593696697!2d75.35637664258331!3f0!4f0!5f0.4000000000000002", // Practical Lab 2
  },
  {
    id: 5,
    title: "Corridor",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1732137591206!6m8!1m7!1sCAoSLEFGMVFpcE94Q3hEUmN5YUdGeDMtX21iN0VZZ2w3NVFjaXFTWjlxOVIzOUM4!2m2!1d19.87936400355666!2d75.3568268341181!3f0!4f0!5f0.4000000000000002", // Corridor
  },
];

const Indoor: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">Indoor Navigation</h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore the different locations with interactive 360-degree views.
        </p>
      </header>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white shadow-lg rounded-lg p-4 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-indigo-800">
              {photo.title}
            </h2>
            <iframe
              src={photo.embedUrl}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indoor;