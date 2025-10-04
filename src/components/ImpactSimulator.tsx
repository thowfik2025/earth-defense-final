import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, Mountain, Waves } from "lucide-react";
import { toast } from "sonner";

export const ImpactSimulator = () => {
  const [diameter, setDiameter] = useState([0.5]); // km
  const [velocity, setVelocity] = useState([20]); // km/s
  const [angle, setAngle] = useState([45]); // degrees
  const [results, setResults] = useState<any>(null);

  const calculateImpact = () => {
    // Simplified impact calculations
    const d = diameter[0];
    const v = velocity[0];
    const a = angle[0];
    
    // Estimate mass (assuming typical density of 3000 kg/m³)
    const radius = (d * 1000) / 2; // Convert to meters
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const mass = volume * 3000; // kg
    
    // Calculate kinetic energy (E = 0.5 * m * v²)
    const energyJoules = 0.5 * mass * Math.pow(v * 1000, 2);
    const energyMegatons = energyJoules / (4.184e15); // Convert to megatons TNT
    
    // Estimate crater diameter (simplified scaling)
    const craterDiameter = Math.pow(energyMegatons, 0.3) * 0.8; // km
    
    // Seismic magnitude estimate
    const magnitude = 0.67 * Math.log10(energyMegatons) + 2.7;
    
    // Tsunami risk (if ocean impact)
    const tsunamiHeight = energyMegatons > 100 ? Math.sqrt(energyMegatons / 100) * 10 : 0; // meters
    
    // Angle effect factor
    const angleEfficiency = Math.sin(a * (Math.PI / 180));
    
    setResults({
      energy: energyMegatons.toFixed(2),
      craterDiameter: (craterDiameter * angleEfficiency).toFixed(2),
      magnitude: magnitude.toFixed(1),
      tsunamiHeight: (tsunamiHeight * angleEfficiency).toFixed(1),
      mass: (mass / 1e9).toFixed(2), // Convert to million metric tons
    });

    toast.success("Impact simulation complete!");
  };

  return (
    <section id="simulator" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-text-purple text-secondary">Impact Simulator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Adjust asteroid parameters to predict impact consequences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Asteroid Parameters
              </CardTitle>
              <CardDescription>Configure the asteroid's characteristics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Diameter</Label>
                  <span className="text-sm font-semibold text-primary">{diameter[0]} km</span>
                </div>
                <Slider
                  value={diameter}
                  onValueChange={setDiameter}
                  min={0.1}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Typical range: 0.1 km (house-sized) to 10 km (extinction-level)</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Impact Velocity</Label>
                  <span className="text-sm font-semibold text-cosmic-purple">{velocity[0]} km/s</span>
                </div>
                <Slider
                  value={velocity}
                  onValueChange={setVelocity}
                  min={11}
                  max={72}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Range: 11 km/s (minimum) to 72 km/s (head-on collision)</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Impact Angle</Label>
                  <span className="text-sm font-semibold text-warning-orange">{angle[0]}°</span>
                </div>
                <Slider
                  value={angle}
                  onValueChange={setAngle}
                  min={15}
                  max={90}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">15° (grazing) to 90° (perpendicular impact)</p>
              </div>

              <Button 
                onClick={calculateImpact} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-blue font-semibold"
              >
                Calculate Impact
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-warning-orange" />
                Impact Predictions
              </CardTitle>
              <CardDescription>Estimated consequences of the impact</CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Impact Energy</span>
                      <span className="text-2xl font-bold text-warning-orange glow-text-orange">
                        {results.energy} MT
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Megatons of TNT equivalent</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <Mountain className="w-6 h-6 text-primary mb-2" />
                      <div className="text-2xl font-bold text-primary">{results.craterDiameter} km</div>
                      <div className="text-xs text-muted-foreground mt-1">Crater Diameter</div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <Zap className="w-6 h-6 text-danger-red mb-2" />
                      <div className="text-2xl font-bold text-danger-red">{results.magnitude}</div>
                      <div className="text-xs text-muted-foreground mt-1">Seismic Magnitude</div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <Waves className="w-6 h-6 text-cosmic-blue mb-2" />
                      <div className="text-2xl font-bold text-cosmic-blue">{results.tsunamiHeight} m</div>
                      <div className="text-xs text-muted-foreground mt-1">Tsunami Height</div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <Calculator className="w-6 h-6 text-cosmic-purple mb-2" />
                      <div className="text-2xl font-bold text-cosmic-purple">{results.mass} Mt</div>
                      <div className="text-xs text-muted-foreground mt-1">Asteroid Mass</div>
                    </div>
                  </div>

                  <div className="bg-danger-red/10 border border-danger-red/30 rounded-lg p-4">
                    <p className="text-sm text-danger-red font-semibold mb-2">⚠️ Impact Assessment</p>
                    <p className="text-xs text-muted-foreground">
                      {parseFloat(results.energy) < 1 && "Local damage - similar to a small nuclear weapon"}
                      {parseFloat(results.energy) >= 1 && parseFloat(results.energy) < 100 && "Regional catastrophe - severe destruction over hundreds of kilometers"}
                      {parseFloat(results.energy) >= 100 && parseFloat(results.energy) < 10000 && "Continental disaster - widespread devastation and climate effects"}
                      {parseFloat(results.energy) >= 10000 && "Global extinction event - civilization-ending impact"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Configure parameters and click Calculate Impact to see predictions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
