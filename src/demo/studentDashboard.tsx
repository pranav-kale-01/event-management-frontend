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

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedEvent && comment.trim()) {
      try {
        // Send comment data to backend
        const response = await fetch(`${API_URL}/api/events/addComment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: selectedEvent._id,
            text: comment,
            author: currentUser?.email,
            createdAt: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          const newComment = await response.json();

          // Update local state with new comment
          selectedEvent.comments.push(newComment);

          setSelectedEvent(selectedEvent);
          setComment(""); // Clear input field
        } else {
          console.error("Failed to add comment.");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
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

      // setEvents(data);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  const handleLike = async () => {
    if (selectedEvent) {
      try {
        if (hasLiked === -1) {
          setSelectedEvent((prevEvent) =>
            prevEvent
              ? { ...prevEvent, likes: (prevEvent.likes += 1) }
              : prevEvent
          );
          currentUser?.likedEvents.push(selectedEvent._id);
        } else {
          setSelectedEvent((prevEvent) =>
            prevEvent
              ? { ...prevEvent, likes: (prevEvent.likes -= 1) }
              : prevEvent
          );

          currentUser?.likedEvents.splice(hasLiked ?? 0, 1);
          console.log("removed : ", currentUser);
        }

        const response = await fetch(
          `${API_URL}/api/events/edit_event/${selectedEvent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(selectedEvent),
          }
        );

        if (response.ok) {
          // Update currentUser's liked events
          const userResponse = await fetch(
            `${API_URL}/api/auth/edit_user/${currentUser?._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(currentUser),
            }
          );

          if (userResponse.ok) {
            console.log(currentUser);
            setCurrentUser(currentUser);
            setHasLiked(currentUser?.likedEvents.indexOf(selectedEvent._id)) ??
              -1;
            fetchEvents();
          } else {
            console.log("Unable to update user details");
          }
        } else {
          setSelectedEvent((prevEvent) =>
            prevEvent ? { ...prevEvent, likes: prevEvent.likes - 1 } : prevEvent
          );
          setHasLiked(-1);
          console.error("Failed to update like.");
        }
      } catch (error) {
        console.error("Error liking event:", error);
        setHasLiked(-1);
      }
    }
  };

  const handleRegister = async () => {
    if (selectedEvent && currentUser && !isRegistered) {
      currentUser.registeredEvents.push(selectedEvent._id);
      selectedEvent.registrations.push(currentUser._id);

      try {
        const response = await fetch(
          `${API_URL}/api/events/edit_event/${selectedEvent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(selectedEvent),
          }
        );

        if (response.ok) {
          setIsRegistered(true); // Prevent further registrations

          // Update currentUser's liked events
          await fetch(`${API_URL}/api/auth/edit_user/${currentUser?._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(currentUser),
          });
        } else {
          console.error("Failed to register for event.");
        }
      } catch (error) {
        setIsRegistered(false);
        currentUser?.registeredEvents.pop();
        console.error("Error registering for event:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-screen overflow-x-hidden">
      {/* Header */}
      <header className="text-black flex justify-between items-center p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Campus Navigator</h1>
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
                  <h3 className="font-bold text-2xl ">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
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
            <ImportantLinks/>
          </div>

          {/* Chatbot Section */}
          <div className="bg-white w-full mx-4 rounded-lg shadow-lg pb-12 p-4 h-2/3 ">
            <h2 className="text-2xl font-semibold">Chat with Us</h2>
            <Chatbot />
          </div>
        </div>
      </main>

      {/* Footer */}
      <CustomFooter/>

      <Dialog open={isEventOpen} onOpenChange={setIsEventOpen}>
        <DialogContent className="w-3/4 max-w-screen-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-4">
            {/* Event Details */}
            <div className="text-lg space-y-2">
              <p>
                <strong>Category:</strong> {selectedEvent?.category}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {selectedEvent?.date
                  ? new Date(selectedEvent.date).toLocaleDateString()
                  : "Date not available"}
              </p>
              <p>
                <strong>Organizer:</strong> {selectedEvent?.organizer}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent?.description}
              </p>
              <p>
                <strong>Likes:</strong> {selectedEvent?.likes}
              </p>
            </div>

            {/* Like Button */}
            <div className="flex flex-row justify-between items-center">
              <Button
                onClick={handleLike}
                className="flex items-center space-x-2"
              >
                {hasLiked === -1 ? (
                  <HeartOutline className="h-6 w-6 text-gray-500" />
                ) : (
                  <HeartFilled className="h-6 w-6 text-red-500" />
                )}
                <span>{hasLiked === -1 ? "Like" : "Liked"}</span>
              </Button>

              {/* Register Button */}
              <Button
                onClick={handleRegister}
                disabled={isRegistered}
                className="w-fit px-12"
              >
                {isRegistered ? "Registered" : "Register for Event"}
              </Button>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Comments</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {selectedEvent?.comments &&
                selectedEvent.comments.length > 0 ? (
                  selectedEvent.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded-md shadow-sm"
                    >
                      <p>
                        <strong>{comment.author}</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                      <p className="mt-1">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No comments available for this event.
                  </p>
                )}
              </div>

              {/* Add New Comment */}
              <form onSubmit={handleAddComment} className="space-y-2 mt-4">
                <Input
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Submit Comment
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
