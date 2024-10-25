import React, { useState, useEffect } from "react";
import {
  Search,
  Map,
  Navigation2,
  Book,
  Coffee,
  Building,
  Users,
  Computer,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define types for the location and API response
interface Location {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof iconMap; // Ensures the icon key is one of the keys in iconMap
  details?: Record<string, string>; // Additional details can be a key-value pair
}

// Map of icon names to icon components
const iconMap = {
  Building,
  Book,
  Coffee,
  Computer,
  Users,
};

// API service for backend communication
const api = {
  baseUrl: "http://localhost:3001/api", // Update this with your actual backend URL

  async fetchLocations(): Promise<Location[]> {
    try {
      const response = await fetch(`${this.baseUrl}/locations`);
      if (!response.ok) throw new Error("Failed to fetch locations");
      return await response.json();
    } catch (error) {
      throw new Error("Could not load campus locations");
    }
  },

  async searchLocations(query: string): Promise<Location[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/locations/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Search failed");
      return await response.json();
    } catch (error) {
      throw new Error("Search operation failed");
    }
  },

  async getLocationDetails(id: string): Promise<Location> {
    try {
      const response = await fetch(`${this.baseUrl}/locations/${id}`);
      if (!response.ok) throw new Error("Failed to fetch location details");
      return await response.json();
    } catch (error) {
      throw new Error("Could not load location details");
    }
  },
};

const CampusNavigator: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Location[] | null>(null);

  // Load initial locations
  useEffect(() => {
    loadLocations();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults(null);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.fetchLocations();
      setLocations(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await api.searchLocations(searchQuery);
      setSearchResults(results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async (location: Location) => {
    try {
      setLoading(true);
      setError(null);
      const details = await api.getLocationDetails(location.id);
      setSelectedLocation(details);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayLocations = searchResults || locations;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-6 h-6" />
            MGM College Campus Navigator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white" // Ensures input background is white
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Campus Locations</h3>
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                displayLocations.map((location) => {
                  const IconComponent = iconMap[location.icon] || Building;
                  return (
                    <div
                      key={location.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedLocation?.id === location.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{location.name}</h4>
                          <p className="text-sm text-gray-600">
                            {location.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading && selectedLocation ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  ) : selectedLocation ? (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        {React.createElement(
                          iconMap[selectedLocation.icon] || Building,
                          {
                            className: "w-6 h-6 text-blue-600",
                          }
                        )}
                        <h3 className="font-semibold text-xl">
                          {selectedLocation.name}
                        </h3>
                      </div>
                      <p className="mb-4">{selectedLocation.description}</p>
                      {selectedLocation.details && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">
                            Additional Information
                          </h4>
                          <ul className="list-disc pl-4 space-y-1">
                            {Object.entries(selectedLocation.details).map(
                              ([key, value]) => (
                                <li key={key} className="text-sm">
                                  <span className="font-medium">{key}:</span>{" "}
                                  {value}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-blue-600">
                        <Navigation2 className="w-5 h-5" />
                        <span className="font-medium">Get Directions</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Select a location to view details
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampusNavigator;
