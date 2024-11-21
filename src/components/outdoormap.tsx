import React from "react";

const OutdoorMap = () => {
  return (
    <div className="flex p-4">
      {/* Left side: Full-size outdoor map */}
      <div className="w-2/3 pr-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Outdoor Navigation
          </h2>
          <div className="w-full h-[80vh] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.051559839231!2d75.3519524790054!3d19.880044633788973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba3a0ab7088b7%3A0xb5af50109d8a8cce!2sMGM%20University!5e0!3m2!1sen!2sin!4v1732117679253!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Right side: Information box */}
      <div className="w-1/3 pl-4 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Campus Navigation Overview</h2>
        <p className="text-gray-700 mb-4">
          The Campus Navigation project provides both indoor and outdoor navigation systems to guide students, visitors, and faculty through MGM University's campus. The outdoor navigation system helps locate various buildings on campus, while the indoor navigation helps users navigate specific departments and classrooms.
        </p>
        <p className="text-gray-700 mb-4">
          Our goal is to enhance the campus experience by providing easy-to-use, real-time navigation assistance, making it easier to find locations and events, as well as assist in finding the best routes to get to your destination.
        </p>
        <p className="text-gray-700">
          The system includes a chatbot feature, real-time event notifications, and feedback forms to continuously improve the user experience. We aim to bring the campus into the digital age with this innovative navigation solution.
        </p>
      </div>
    </div>
  );
};

export default OutdoorMap;
