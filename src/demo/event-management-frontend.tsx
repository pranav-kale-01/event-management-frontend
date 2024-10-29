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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/api";

const EventManagement: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // const [events, setEvents] = useState<any[]>([]);
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

  const events = [
    {
      _id: "671bbf0b05c6dbc92d4b2076",
      title: "Football Match",
      category: "Sports",
      date: new Date("2023-10-15T00:00:00.000Z"), // Date in ISO format
      description: "Exciting football match between top teams.",
      organizer: "Sports Committee",
      createdAt: new Date("2023-09-25T15:53:47.364Z"), // Date in ISO format
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2077",
      title: "Basketball Tournament",
      category: "Sports",
      date: new Date("2023-10-20T00:00:00.000Z"),
      description: "Annual basketball tournament with local teams.",
      organizer: "Sports Committee",
      createdAt: new Date("2023-09-26T15:53:47.364Z"),
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2078",
      title: "Cricket League",
      category: "Sports",
      date: new Date("2023-10-25T00:00:00.000Z"),
      description: "Cricket league featuring regional teams.",
      organizer: "Cricket Association",
      createdAt: new Date("2023-09-27T15:53:47.364Z"),
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2079",
      title: "Hackathon",
      category: "Technical",
      date: new Date("2023-11-01T00:00:00.000Z"),
      description: "24-hour hackathon to create innovative solutions.",
      organizer: "Tech Club",
      createdAt: new Date("2023-09-28T15:53:47.364Z"),
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2080",
      title: "Workshop on AI",
      category: "Technical",
      date: new Date("2023-11-05T00:00:00.000Z"),
      description: "Hands-on workshop on AI and machine learning.",
      organizer: "AI Society",
      createdAt: new Date("2023-09-29T15:53:47.364Z"),
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2081",
      title: "Robotics Competition",
      category: "Technical",
      date: new Date("2023-11-10T00:00:00.000Z"),
      description: "Compete with your robots in various challenges.",
      organizer: "Robotics Club",
      createdAt: new Date("2023-09-30T15:53:47.364Z"),
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2082",
      title: "Annual Cultural Fest",
      category: "Cultural",
      date: new Date("2023-11-15T00:00:00.000Z"),
      description: "Celebrating culture with performances and stalls.",
      organizer: "Cultural Committee",
      createdAt: new Date("2023-10-01T15:53:47.364Z"),
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2083",
      title: "Dance Competition",
      category: "Cultural",
      date: new Date("2023-11-18T00:00:00.000Z"),
      description: "Show your dance skills and compete with others.",
      organizer: "Dance Society",
      createdAt: new Date("2023-10-02T15:53:47.364Z"),
      __v: 0,
    },
    {
      _id: "671bbf0b05c6dbc92d4b2084",
      title: "Music Night",
      category: "Cultural",
      date: new Date("2023-11-22T00:00:00.000Z"),
      description: "Enjoy live music performances from local artists.",
      organizer: "Music Club",
      createdAt: new Date("2023-10-03T15:53:47.364Z"),
      __v: 0,
    },
  ];

  const comments = [
    {
      eventId: "671bbf0b05c6dbc92d4b2076",
      student: "Alice",
      comment: "Excited for the match!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2076",
      student: "Bob",
      comment: "Let's win this!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2077",
      student: "Charlie",
      comment: "Can't wait to see the teams play!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2077",
      student: "Dana",
      comment: "Go team!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2078",
      student: "Eve",
      comment: "Who will be the champion?",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2078",
      student: "Frank",
      comment: "I hope it doesn't rain!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2079",
      student: "Grace",
      comment: "Ready to innovate!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2079",
      student: "Heidi",
      comment: "Looking forward to the challenges!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2080",
      student: "Ivan",
      comment: "AI is the future!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2080",
      student: "Judy",
      comment: "Excited to learn new skills!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2081",
      student: "Mallory",
      comment: "Hope to see some cool robots!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2081",
      student: "Niaj",
      comment: "Let's build something amazing!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2082",
      student: "Olivia",
      comment: "Can't wait for the performances!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2082",
      student: "Peggy",
      comment: "It's going to be a blast!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2083",
      student: "Quentin",
      comment: "Dance like no one is watching!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2083",
      student: "Rupert",
      comment: "I'm rooting for my friend!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2084",
      student: "Sybil",
      comment: "Looking forward to the live music!",
    },
    {
      eventId: "671bbf0b05c6dbc92d4b2084",
      student: "Trent",
      comment: "Music brings us all together!",
    },
  ];

  const [newEvent, setNewEvent] = useState({
    _id: "",
    title: "",
    category: "Technical",
    date: "",
    description: "",
    organizer: "",
  });

  useEffect(() => {
    fetchEvents();
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
      const response = await fetch(`${API_URL}/events`, {
        method: "GET", // Use the appropriate HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // setEvents(data);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
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
    setCurrentUser(null);
    navigate("/login");
  };

  const handleAddEvent = async () => {
    try {
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/events/add_event`, {
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
          `${API_URL}/events/edit_event/${eventId}`,
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
          `${API_URL}/events/delete_event/${eventId}`,
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
        <div className="flex justify-between items-center mb-6 px-8 my-4">
          <h1 className="text-2xl font-bold">Upcoming Events</h1>
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
          <div className="events-section flex flex-col items-end p-8">
            <Button
              className="flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <Plus size={16} />
              Add Event
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {events.map((event) => (
                <Card key={event._id} className="shadow-sm">
                  <CardHeader>
                    <CardTitle className={getCategoryColor(event.category)}>
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => {
                          // setNewEvent(event);
                          // setIsEditMode(true);
                          // setIsOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
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
          <div className="mt-8 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Student Comments</h2>
            <div className="grid grid-cols-1 gap-4 overflow-y-scroll no-scrollbar h-[85vh]">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardHeader>
                      <CardTitle>{comment.student}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{comment.comment}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No comments available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className=" text-black text-center p-4">
          <p className="text-sm">
            JNEC Aurangabad | Contact: 123-456-7890 | Address: Aurangabad,
            Maharashtra, India
          </p>
        </footer>
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
                className="w-full p-2 border rounded-md"
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
      </div>
    </div>
  );
};

export default EventManagement;
