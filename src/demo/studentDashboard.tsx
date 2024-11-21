import { useState, useEffect } from "react";
import GoogleMap from "../components/GoogleMap";
import Chatbot from "../components/ChatBot";
import { HeartIcon as HeartOutline } from "lucide-react";
import { HeartIcon as HeartFilled } from "lucide-react";
import IndoorNavigationCarousel from "../components/IndoorNavigationCarousel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ImportantLinks from "@/components/ImportantLinks";
import CustomFooter from "@/components/customFooter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { User, Event, EventsData } from "../types";
import { API_URL } from "../constants";


const StudentDashboard = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [eventsData, setEventsData] = useState<EventsData>({});
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [comment, setComment] = useState<string>("");

  const [hasLiked, setHasLiked] = useState<number>();
  const [isRegistered, setIsRegistered] = useState<boolean>();
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || JSON.stringify({}));
    if (!user) {
      navigate("/login");
    } else {
      getCurentUser(user._id);
      fetchEvents();
    }
  }, [hasLiked]);

  const getCurentUser = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/user/${id}`, {
        method: "GET", // Use the appropriate HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      } else {
        console.log("Unable to get User");
      }
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };

  const handleLogout = () => {
    // Perform logout action
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  const handleOpenDialog = (selectedEvent: any) => {
    setIsEventOpen(true);
    setSelectedEvent(selectedEvent);
    setHasLiked(currentUser?.likedEvents.indexOf(selectedEvent._id)) ?? -1;
    setIsRegistered(
      currentUser?.registeredEvents.indexOf(selectedEvent._id) !== -1
    );
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: "GET", // Use the appropriate HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const events: Event[] = await response.json();

      // Group events by category
      const categorizedEvents: EventsData = events.reduce((acc, event) => {
        const category = event.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(event);
        return acc;
      }, {} as EventsData);

      setEventsData(categorizedEvents);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-screen overflow-x-hidden">
      {/* Header */}
      <header className="text-black flex justify-between items-center p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Campus Helper</h1>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/indoor-navigation")}>
            Indoor Navigation
          </Button>
          <Button onClick={() => navigate("/outdoor-navigation")}>
            Outdoor Navigation
          </Button>
          <Button onClick={() => navigate("/live-map")}>
            LiveMaps
          </Button>
        </div>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700">
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex flex-row flex-1 p-6 h-fit">
        {/* Events Section */}
        <div className="flex flex-col stats-section w-full">
          <div className="text-black rounded-lg p-4 mb-6 shadow-lg bg-white">
            <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(eventsData).map(([category, events]) => (
                <Card
                  key={category}
                  className="bg-white text-black rounded-lg shadow-md p-4"
                >
                  <h3 className="font-bold text-2xl ">{category}</h3>
                  <div className=" overflow-y-scroll max-h-[50vh]">
                    {events.map((event) => (
                      <div
                        key={event._id}
                        className="flex justify-between items-center py-2 cursor-pointer border-2 my-2 px-4 rounded-sm py-2"
                        onClick={() => handleOpenDialog(event)}
                      >
                        <div>
                          <span className="font-semibold text-xl mb-2">
                            {event.title}
                          </span>
                          <p className="text-sm my-1 text-gray-600">
                            By - {event.organizer}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 pr-2">
                            {event.description}
                          </p>
                          <div className="text-sm text-gray-500 mt-2 font-semibold">
                            {event.comments?.length || 0} Comments |{" "}
                            {event.likes || 0} Likes
                          </div>
                        </div>
                        <Badge className="bg-blue-500 text-white rounded-full px-2 py-1">
                          {new Date(event.date).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Campus Map and Indoor Navigation Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6 h-fit">
            <div className="bg-white rounded-lg shadow-lg flex-1">
              <h2 className="top-0 z-1 text-2xl font-semibold p-4">
                Campus Map
              </h2>
              <div className="z-10 w-full p-2 rounded-lg">
                <GoogleMap />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-semibold p-4">Indoor Navigation</h2>
              <div className="h-64 w-full p-2">
                <IndoorNavigationCarousel />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/3 h-screen">
          {/* Important Links */}
          <div className="bg-white w-full mx-4 rounded-lg shadow-lg pb-12 p-4 mb-4">
            <ImportantLinks />
          </div>

          {/* Chatbot Section */}
          <div className="bg-white w-full mx-4 rounded-lg shadow-lg pb-12 p-4 h-2/3">
            <h2 className="text-2xl font-semibold">Chat with Us</h2>
            <Chatbot />
          </div>
        </div>
      </main>

      {/* Footer */}
      <CustomFooter />
    </div>
  );
};

export default StudentDashboard;
