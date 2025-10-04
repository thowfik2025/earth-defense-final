import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Play, RotateCcw, MapPin } from "lucide-react";
import { toast } from "sonner";

export const AsteroidTrajectoryMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [impactPoint, setImpactPoint] = useState({ lat: 35, lon: -85 });
  const animationRef = useRef<number>();
  const progressRef = useRef(0);

  useEffect(() => {
    drawScene();
  }, [impactPoint]);

  const drawScene = (progress: number = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#0a0118";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 100; i++) {
      const x = (i * 37) % canvas.width;
      const y = (i * 73) % canvas.height;
      const size = Math.random() * 2;
      ctx.fillRect(x, y, size, size);
    }

    // Draw Earth
    const earthX = canvas.width / 2;
    const earthY = canvas.height / 2;
    const earthRadius = 120;

    // Earth glow
    const earthGlow = ctx.createRadialGradient(earthX, earthY, earthRadius * 0.8, earthX, earthY, earthRadius * 1.3);
    earthGlow.addColorStop(0, "rgba(59, 130, 246, 0.3)");
    earthGlow.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = earthGlow;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Earth sphere with gradient
    const earthGradient = ctx.createRadialGradient(earthX - 30, earthY - 30, 10, earthX, earthY, earthRadius);
    earthGradient.addColorStop(0, "#60a5fa");
    earthGradient.addColorStop(0.5, "#3b82f6");
    earthGradient.addColorStop(1, "#1e3a8a");
    ctx.fillStyle = earthGradient;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw continents (simplified)
    ctx.fillStyle = "#10b981";
    ctx.globalAlpha = 0.7;
    // Simplified land masses
    ctx.beginPath();
    ctx.ellipse(earthX + 20, earthY - 20, 40, 30, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(earthX - 30, earthY + 10, 35, 45, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Convert lat/lon to point on sphere
    const impactX = earthX + Math.cos(impactPoint.lon * Math.PI / 180) * Math.sin((90 - impactPoint.lat) * Math.PI / 180) * earthRadius;
    const impactY = earthY + Math.sin((90 - impactPoint.lat) * Math.PI / 180) * earthRadius * 0.7;

    // Draw impact target
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(impactX, impactY, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(impactX - 15, impactY);
    ctx.lineTo(impactX + 15, impactY);
    ctx.moveTo(impactX, impactY - 15);
    ctx.lineTo(impactX, impactY + 15);
    ctx.stroke();

    // Draw asteroid trajectory
    const startX = 50;
    const startY = 80;
    const trajectoryProgress = Math.min(progress, 1);

    // Trajectory path
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(
      canvas.width * 0.3,
      canvas.height * 0.2,
      impactX,
      impactY
    );
    ctx.stroke();
    ctx.setLineDash([]);

    // Asteroid position
    const t = trajectoryProgress;
    const asteroidX = startX * (1 - t) * (1 - t) + canvas.width * 0.3 * 2 * (1 - t) * t + impactX * t * t;
    const asteroidY = startY * (1 - t) * (1 - t) + canvas.height * 0.2 * 2 * (1 - t) * t + impactY * t * t;

    // Asteroid glow
    const asteroidGlow = ctx.createRadialGradient(asteroidX, asteroidY, 0, asteroidX, asteroidY, 20);
    asteroidGlow.addColorStop(0, "rgba(251, 146, 60, 0.8)");
    asteroidGlow.addColorStop(1, "rgba(251, 146, 60, 0)");
    ctx.fillStyle = asteroidGlow;
    ctx.beginPath();
    ctx.arc(asteroidX, asteroidY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Asteroid body
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.arc(asteroidX, asteroidY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Asteroid highlight
    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.arc(asteroidX - 2, asteroidY - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Impact effect when asteroid reaches Earth
    if (trajectoryProgress >= 0.95) {
      const impactRadius = (trajectoryProgress - 0.95) * 400;
      const impactGlow = ctx.createRadialGradient(impactX, impactY, 0, impactX, impactY, impactRadius);
      impactGlow.addColorStop(0, "rgba(239, 68, 68, 0.6)");
      impactGlow.addColorStop(0.5, "rgba(251, 146, 60, 0.3)");
      impactGlow.addColorStop(1, "rgba(251, 146, 60, 0)");
      ctx.fillStyle = impactGlow;
      ctx.beginPath();
      ctx.arc(impactX, impactY, impactRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px sans-serif";
    ctx.fillText("Impactor-2025", asteroidX + 15, asteroidY - 10);
    ctx.fillText("Earth", earthX + earthRadius + 15, earthY);
    ctx.fillText(`Impact: ${impactPoint.lat.toFixed(1)}°N, ${Math.abs(impactPoint.lon).toFixed(1)}°W`, 10, canvas.height - 10);
  };

  const animate = () => {
    if (progressRef.current >= 1) {
      progressRef.current = 1;
      setIsAnimating(false);
      toast.error("Impact! Catastrophic collision detected!");
      return;
    }

    progressRef.current += 0.01;
    drawScene(progressRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    toast.info("Tracking asteroid trajectory...");
    animate();
  };

  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    progressRef.current = 0;
    setIsAnimating(false);
    drawScene(0);
    toast.success("Simulation reset");
  };

  const randomizeImpact = () => {
    const newLat = Math.random() * 90 - 45;
    const newLon = Math.random() * 180 - 90;
    setImpactPoint({ lat: newLat, lon: newLon });
    resetAnimation();
    toast.info(`New impact point: ${newLat.toFixed(1)}°, ${newLon.toFixed(1)}°`);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="trajectory" className="py-20 px-4 bg-space-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-text-blue text-primary">Trajectory Visualization</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch Impactor-2025's approach path and predicted impact location
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Impact Trajectory Map
            </CardTitle>
            <CardDescription>
              Real-time visualization of asteroid approach vector and Earth impact zone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative bg-space-dark rounded-lg overflow-hidden border border-primary/20">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={startAnimation}
                disabled={isAnimating}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-blue"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Simulation
              </Button>
              <Button
                onClick={resetAnimation}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={randomizeImpact}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Random Impact Point
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-danger-red" />
                Current Target Zone
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Latitude:</span>
                  <span className="ml-2 font-semibold text-primary">{impactPoint.lat.toFixed(2)}°</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Longitude:</span>
                  <span className="ml-2 font-semibold text-primary">{impactPoint.lon.toFixed(2)}°</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
