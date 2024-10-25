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
  const [events, setEvents] = useState<any[]>([]);
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
      setEvents(data);
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
          console.log( newEvent );

          const response = await fetch(`${API_URL}/events/edit_event/${eventId}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newEvent),
          });
  
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
        const response = await fetch(`${API_URL}/events/delete_event/${eventId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="p-4 max-w-4xl mx-auto">
      <Toaster /> {/* Add the Toaster component here */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <div className="flex gap-2">
          {currentUser ? (
            <>
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsOpen(true)}
              >
                <Plus size={16} />
                Add Event
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
          )}
        </div>
      </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    setNewEvent(event);
                    setIsEditMode(true);
                    setIsOpen(true);
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
  );
};

export default EventManagement;
