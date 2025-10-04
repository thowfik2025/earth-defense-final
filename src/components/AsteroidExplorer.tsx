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

const fetchNearEarthObjects = async () => {
  const today = new Date().toISOString().split("T")[0];
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
  );
  if (!response.ok) throw new Error("Failed to fetch NEO data");
  const data = await response.json();
  const neos = Object.values(data.near_earth_objects).flat() as NeoData[];
  return neos.slice(0, 6); // Limit to 6 for display
};

export const AsteroidExplorer = () => {
  const { data: asteroids, isLoading, error } = useQuery({
    queryKey: ["neo-data"],
    queryFn: fetchNearEarthObjects,
    refetchInterval: 300000, // Refetch every 5 minutes
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

  if (error) {
    return (
      <section id="asteroids" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <p className="mt-4 text-muted-foreground">Failed to load asteroid data</p>
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
            Real-time near-Earth objects detected by NASA today
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
