import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NeoData {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_second: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
}

// Fallback data when API is unavailable
const fallbackAsteroids: NeoData[] = [
  {
    id: "3542519",
    name: "(2010 PK9)",
    absolute_magnitude_h: 22.3,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.115,
        estimated_diameter_max: 0.257
      }
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [{
      close_approach_date: "2025-10-04",
      relative_velocity: {
        kilometers_per_second: "18.45"
      },
      miss_distance: {
        kilometers: "7842190"
      }
    }]
  },
  {
    id: "2465633",
    name: "465633 (2009 JR5)",
    absolute_magnitude_h: 20.7,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.195,
        estimated_diameter_max: 0.436
      }
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [{
      close_approach_date: "2025-10-04",
      relative_velocity: {
        kilometers_per_second: "24.18"
      },
      miss_distance: {
        kilometers: "12456789"
      }
    }]
  },
  {
    id: "3726788",
    name: "(2015 RN35)",
    absolute_magnitude_h: 21.9,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.134,
        estimated_diameter_max: 0.299
      }
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [{
      close_approach_date: "2025-10-04",
      relative_velocity: {
        kilometers_per_second: "15.82"
      },
      miss_distance: {
        kilometers: "9234567"
      }
    }]
  },
  {
    id: "3837291",
    name: "Impactor-2025",
    absolute_magnitude_h: 19.8,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.342,
        estimated_diameter_max: 0.765
      }
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [{
      close_approach_date: "2025-10-04",
      relative_velocity: {
        kilometers_per_second: "32.15"
      },
      miss_distance: {
        kilometers: "5123456"
      }
    }]
  },
  {
    id: "2441987",
    name: "(2008 EA32)",
    absolute_magnitude_h: 23.1,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.089,
        estimated_diameter_max: 0.198
      }
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [{
      close_approach_date: "2025-10-04",
      relative_velocity: {
        kilometers_per_second: "19.76"
      },
      miss_distance: {
        kilometers: "11234567"
      }
    }]
  },
  {
    id: "3548208",
    name: "(2010 RF12)",
    absolute_magnitude_h: 20.2,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.235,
        estimated_diameter_max: 0.526
      }
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [{
      close_approach_date: "2025-10-04",
      relative_velocity: {
        kilometers_per_second: "28.93"
      },
      miss_distance: {
        kilometers: "6789012"
      }
    }]
  }
];

const fetchNearEarthObjects = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
    );
    
    if (!response.ok) {
      console.warn("NASA API unavailable, using fallback data");
      return fallbackAsteroids;
    }
    
    const data = await response.json();
    const neos = Object.values(data.near_earth_objects).flat() as NeoData[];
    return neos.slice(0, 6);
  } catch (error) {
    console.warn("Error fetching NASA data, using fallback data:", error);
    return fallbackAsteroids;
  }
};

export const AsteroidExplorer = () => {
  const [usingFallback, setUsingFallback] = useState(false);
  
  const { data: asteroids, isLoading } = useQuery({
    queryKey: ["neo-data"],
    queryFn: async () => {
      const result = await fetchNearEarthObjects();
      setUsingFallback(result === fallbackAsteroids);
      return result;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
    retry: false,
  });

  if (isLoading) {
    return (
      <section id="asteroids" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading NASA NEO data...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="asteroids" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-text-blue text-primary">Live Asteroid Data</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {usingFallback 
              ? "Sample near-Earth objects (NASA API rate limit reached)"
              : "Real-time near-Earth objects detected by NASA today"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asteroids?.map((neo) => {
            const avgDiameter = (
              (neo.estimated_diameter.kilometers.estimated_diameter_min +
                neo.estimated_diameter.kilometers.estimated_diameter_max) /
              2
            ).toFixed(3);
            const approach = neo.close_approach_data[0];

            return (
              <Card key={neo.id} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2">{neo.name}</CardTitle>
                    {neo.is_potentially_hazardous_asteroid && (
                      <Badge variant="destructive" className="shrink-0">
                        Hazardous
                      </Badge>
                    )}
                  </div>
                  <CardDescription>ID: {neo.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diameter:</span>
                      <span className="font-semibold text-primary">{avgDiameter} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Velocity:</span>
                      <span className="font-semibold text-cosmic-purple">
                        {parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(2)} km/s
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Miss Distance:</span>
                      <span className="font-semibold text-warning-orange">
                        {parseFloat(approach.miss_distance.kilometers).toLocaleString()} km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Approach:</span>
                      <span className="font-semibold">{approach.close_approach_date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Data provided by NASA's Near-Earth Object Web Service
          </p>
        </div>
      </div>
    </section>
  );
};
