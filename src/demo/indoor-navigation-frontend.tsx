import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Navigation, Locate } from 'lucide-react';
import axios from 'axios';

interface Location {
  id: number;
  name: string;
  x: number;
  y: number;
}

interface Building {
  id: number;
  name: string;
  floors: number;
}

interface Path {
  path: { x: number; y: number }[];
  distance: number;
}

interface IndoorNavigationProps {
  buildingId?: number;
}

const IndoorNavigation: React.FC<IndoorNavigationProps> = ({ buildingId = 1 }) => {
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [selectedStart, setSelectedStart] = useState<Location | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [building, setBuilding] = useState<Building | null>(null);
  const [path, setPath] = useState<Path | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch building data
  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await axios.get<Building>(`/api/buildings/${buildingId}`);
        setBuilding(response.data);
      } catch (err) {
        setError('Failed to load building data');
        console.error(err);
      }
    };
    fetchBuilding();
  }, [buildingId]);

  // Fetch floor locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Location[]>(`/api/buildings/${buildingId}/floors/${currentFloor}/locations`);
        setLocations(response.data);
      } catch (err) {
        setError('Failed to load locations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [buildingId, currentFloor]);

  const handleLocationSelect = async (location: Location) => {
    if (!selectedStart) {
      setSelectedStart(location);
      setPath(null);
    } else if (!selectedEnd) {
      setSelectedEnd(location);
      
      try {
        setLoading(true);
        const response = await axios.post<Path>('/api/navigate/', {
          start_id: selectedStart.id,
          end_id: location.id
        });
        setPath(response.data);
      } catch (err) {
        setError('Failed to calculate route');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetSelection = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
    setPath(null);
  };

  const renderFloorMap = () => {
    return (
      <svg viewBox="0 0 300 200" className="w-full h-64 border rounded bg-gray-50">
        {/* Grid lines */}
        <g stroke="gray" strokeWidth="0.5" opacity="0.2">
          {[...Array(30)].map((_, i) => (
            <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="200" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 10} x2="300" y2={i * 10} />
          ))}
        </g>

        {/* Location markers */}
        {locations.map((loc) => (
          <g
            key={loc.id}
            transform={`translate(${loc.x}, ${loc.y})`}
            onClick={() => handleLocationSelect(loc)}
            className="cursor-pointer"
          >
            <circle
              r="5"
              fill={
                loc === selectedStart
                  ? '#22c55e'
                  : loc === selectedEnd
                  ? '#ef4444'
                  : '#3b82f6'
              }
            />
            <text
              x="10"
              y="5"
              fontSize="12"
              fill="black"
              className="select-none"
            >
              {loc.name}
            </text>
          </g>
        ))}

        {/* Navigation path */}
        {path && (
          <path
            d={`M ${path.path.map((p, i) => 
              `${i === 0 ? '' : 'L '}${p.x} ${p.y}`
            ).join(' ')}`}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
        )}
      </svg>
    );
  };

  if (error) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-4">
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            {building ? `${building.name} - Floor ${currentFloor}` : 'Loading...'}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => 
                building && currentFloor < building.floors && 
                setCurrentFloor(currentFloor + 1)
              }
              disabled={!building || currentFloor >= building.floors}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => currentFloor > 1 && setCurrentFloor(currentFloor - 1)}
              disabled={!building || currentFloor <= 1}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              Loading...
            </div>
          ) : (
            renderFloorMap()
          )}
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Locate className="h-4 w-4 text-green-500" />
              <span>Start: {selectedStart?.name || 'Select starting point'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-red-500" />
              <span>End: {selectedEnd?.name || 'Select destination'}</span>
            </div>
            {path && (
              <div className="text-sm text-gray-600">
                Distance: {path.distance.toFixed(2)} meters
              </div>
            )}
          </div>

          <Button
            variant="outline"
            onClick={resetSelection}
            disabled={!selectedStart && !selectedEnd}
            className="w-full"
          >
            Reset Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndoorNavigation;
