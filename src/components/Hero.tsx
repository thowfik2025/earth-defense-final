import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cosmic-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cosmic-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-nebula-pink/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Alert Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-danger-red/20 border border-danger-red/50 rounded-full animate-pulse-glow">
          <AlertTriangle className="w-5 h-5 text-danger-red" />
          <span className="text-sm font-semibold text-danger-red">THREAT DETECTED</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="glow-text-blue text-primary">Impactor-2025</span>
          <br />
          <span className="text-foreground">Asteroid Impact Simulator</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A newly discovered near-Earth asteroid poses a potential threat. 
          Explore real NASA data, simulate impact scenarios, and evaluate mitigation strategies.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="text-3xl font-bold text-primary glow-text-blue">30,000+</div>
            <div className="text-sm text-muted-foreground mt-1">Near-Earth Objects</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="text-3xl font-bold text-cosmic-purple glow-text-purple">Real-Time</div>
            <div className="text-sm text-muted-foreground mt-1">NASA Data Integration</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="text-3xl font-bold text-warning-orange glow-text-orange">3D</div>
            <div className="text-sm text-muted-foreground mt-1">Impact Visualization</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg" 
            onClick={scrollToSimulator}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-blue font-semibold"
          >
            Launch Simulator
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => document.getElementById("asteroids")?.scrollIntoView({ behavior: "smooth" })}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Explore Asteroids
          </Button>
        </div>
      </div>
    </section>
  );
};
