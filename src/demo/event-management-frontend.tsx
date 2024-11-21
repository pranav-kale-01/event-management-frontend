import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Comment, Event } from "@/types";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { API_URL } from "../constants";
import CustomFooter from "../components/customFooter";

// Register the necessary components
Chart.register(...registerables);

const EventManagement: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    token: string;
    role: string | null;
  } | null>(null);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [newEvent, setNewEvent] = useState({
    _id: "",
    title: "",
    category: "Technical",
    date: "",
    description: "",
    organizer: "",
    likes: 0,
    comments: [],
  });

  const [isEventOpen, setIsEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  useEffect(() => {
    fetchEvents();

    console.log(comments);

    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUser({
        token,
        role:
          localStorage.getItem("role") == null
            ? localStorage.getItem("role")
            : "default",
      });
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: "GET", // Use the appropriate HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setEvents(data);

        // Collect all comments from each event into a single array
        const allComments = data.reduce((acc: any[], event: any) => {
          const commentsWithEventDetails = event.comments.map(
            (comment: any) => ({
              ...comment,
              eventId: event._id, // Add event ID
              eventName: event.title, // Add event name
            })
          );
          return [...acc, ...commentsWithEventDetails];
        }, []);

        setComments(allComments);
      } else {
        console.log("Error while getting Events");
      }
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  // Fetch event data for Events by Category chart
  // const fetchEventsByCategory = async () => {
  //   const response = await fetch(`${API_URL}/events`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await response.json();
  //   return data;
  // };

  const EventsByCategoryChart = () => {
    const categoryCount = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});

    const data = {
      labels: Object.keys(categoryCount),
      datasets: [
        {
          label: "Events by Category",
          data: Object.values(categoryCount),
          backgroundColor: "#36A2EB",
        },
      ],
    };

    return <Bar data={data} />;
  };

  const RegistrationsOverTimeChart = () => {
    const registrationDates = events.flatMap((event) =>
      event.registrations.map((reg: { date: string | number | Date }) =>
        new Date(reg.date).toLocaleDateString()
      )
    );

    const dateCounts = registrationDates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const data = {
      labels: Object.keys(dateCounts),
      datasets: [
        {
          label: "Registrations Over Time",
          data: Object.values(dateCounts),
          backgroundColor: "#FF6384",
          borderColor: "#FF6384",
        },
      ],
    };

    return <Line data={data} />;
  };

  const TopLikedEventsChart = () => {
    const data = {
      labels: events.map((event) => event.title),
      datasets: [
        {
          label: "Likes",
          data: events.map((event) => event.likes),
          backgroundColor: "#FFCE56",
        },
      ],
    };

    return <Bar data={data} />;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setCurrentUser({ token: data.token, role: data.role });
        setIsLoginOpen(false);
        toast.success("Logged in successfully");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  const handleOpenDialog = (event: any) => {
    setIsEventOpen(true);
    setSelectedEvent(event);
  };

  const handleAddEvent = async () => {
    try {
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/events/add_event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      await fetchEvents();
      setIsOpen(false);
      setNewEvent({
        _id: "",
        title: "",
        category: "Technical",
        date: "",
        description: "",
        organizer: "",
        likes: 0,
        comments: [],
      });

      toast.success("Event added successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditEvent = async (eventId: string) => {
    try {
      if (currentUser) {
        console.log(newEvent);

        const response = await fetch(
          `${API_URL}/api/events/edit_event/${eventId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newEvent),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to edit event");
        }

        const data = await response.json();
        console.log(data); // Handle the response data (update state or notify)
        toast.success("Event updated successfully");

        await fetchEvents();
        setIsOpen(false);
        setIsEditMode(false);
        setNewEvent({
          _id: "",
          title: "",
          category: "Technical",
          date: "",
          description: "",
          organizer: "",
          likes: 0,
          comments: [],
        });

        toast.success("Event updated successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      if (currentUser) {
        const response = await fetch(
          `${API_URL}/api/events/delete_event/${eventId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete event");
        }

        await fetchEvents();
        toast.success("Event deleted successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sports":
        return "bg-green-100 text-green-800";
      case "Culture":
        return "bg-purple-100 text-purple-800";
      case "Technical":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="">
      <Toaster /> {/* Add the Toaster component here */}
      <div className="flex flex-col h-screen w-screen overflow-x-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-4 my-4 border-b-2 pb-4">
          <h2 className="text-2xl font-bold">Campus Helper</h2>
          <div className="flex gap-2">
            {currentUser ? (
              <>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
            )}
          </div>
        </div>

        <div className="flex flex-row w-full">
          {/* Events Section */}
          <div className="events-section flex flex-col w-2/3 items-start p-8">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col w-full mb-8">
                <h1 className="text-2xl font-semibold w-full mb-2 ">
                  Analytics
                </h1>
                <div className="flex flex-row space-y-4 p-4">
                  {" "}
                  {/* Adds space between charts */}
                  <div className="w-full">
                    <EventsByCategoryChart />
                  </div>
                  <div className="w-full">
                    <RegistrationsOverTimeChart />
                  </div>
                  <div className="w-full">
                    <TopLikedEventsChart />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <h1 className="text-2xl font-semibold w-full">Upcoming Events</h1>
              <div className="flex flex-col items-end">
                <Button
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus size={16} />
                  Add Event
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {events.map((event) => (
                <Card
                  key={event._id}
                  className="shadow-md rounded-lg overflow-hidden"
                >
                  <CardTitle
                    className={
                      "p-2 pl-4 rounded-t-md text-lg font-semibold " +
                      getCategoryColor(event.category)
                    }
                  >
                    {event.title}
                  </CardTitle>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p>
                        <strong>Category:</strong> {event.category}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Description:</strong> {event.description}
                      </p>
                      <p>
                        <strong>Organizer:</strong> {event.organizer}
                      </p>
                      <p>
                        <strong>Registrations:</strong>{" "}
                        {event.registrations.length} people
                      </p>

                      <div className="flex justify-end text-sm text-gray-500 mt-2 font-semibold">
                        {event.comments?.length || 0} Comments |{" "}
                        {event.likes || 0} Likes
                      </div>
                    </div>

                    {/* Comments Preview Section */}
                    {event.comments
                      .slice(0, 2)
                      .map((comment: Comment, index: React.Key) => (
                        <div
                          key={index}
                          className="mt-3 p-2 bg-gray-100 rounded-md"
                        >
                          <p className="text-sm">
                            <strong>{comment.author}</strong>: {comment.text}
                          </p>
                        </div>
                      ))}
                    {event.comments.length > 2 && (
                      <Button
                        className="mt-2 w-full text-sm text-blue-600 bg-white shadow-md mt-4"
                        onClick={() => handleOpenDialog(event)}
                      >
                        View all comments
                      </Button>
                    )}

                    {/* Edit and Delete Buttons */}
                    <div className="flex w-full px-2 mt-4 space-x-2">
                      <Button
                        onClick={() => {
                          setNewEvent(event);
                          setIsEditMode(true);
                          setIsOpen(true);
                        }}
                        className="w-full py-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full py-2"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8 w-1/3 px-4">
            <h2 className="text-2xl font-semibold mb-4">All Comments</h2>
            <div className="grid grid-cols-1 gap-4 overflow-y-scroll no-scrollbar h-[85vh]">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardHeader>
                      <div className="flex flex-row items-center w-full gap-x-2">
                        <CardTitle>{comment.author}</CardTitle>
                        <p> - {comment.eventName}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{comment.text}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No comments available.</p>
              )}
            </div>
          </div>
        </div>

        <CustomFooter/>

        {/* Login Dialog */}
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <Button type="submit">Login</Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add/Edit Event Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Event" : "Add New Event"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <select
                className="w-full p-2 border rounded-md bg-white"
                value={newEvent.category}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
                }
              >
                <option value="Technical">Technical</option>
                <option value="Sports">Sports</option>
                <option value="Culture">Culture</option>
              </select>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
              <Input
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
              <Input
                placeholder="Organizer"
                value={newEvent.organizer}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, organizer: e.target.value })
                }
              />
              <Button
                onClick={() => {
                  if (isEditMode) {
                    handleEditEvent(newEvent._id);
                  } else {
                    handleAddEvent();
                  }
                }}
              >
                {isEditMode ? "Update Event" : "Add Event"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
                  <strong>Registrations:</strong>{" "}
                  {selectedEvent?.registrations.length} people
                </p>
                <div className="flex justify-end text-md mt-2 font-semibold">
                  {selectedEvent?.comments?.length || 0} Comments |{" "}
                  {selectedEvent?.likes || 0} Likes
                </div>
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
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventManagement;
