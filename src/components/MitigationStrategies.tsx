import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Rocket, Zap, Magnet, Clock } from "lucide-react";

const strategies = [
  {
    icon: Rocket,
    title: "Kinetic Impactor",
    description: "Launch a spacecraft to collide with the asteroid and alter its trajectory",
    effectiveness: "High",
    leadTime: "Years",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Magnet,
    title: "Gravity Tractor",
    description: "Use a spacecraft's gravitational pull to slowly deflect the asteroid",
    effectiveness: "Medium",
    leadTime: "Decades",
    color: "text-cosmic-purple",
    bgColor: "bg-cosmic-purple/10",
  },
  {
    icon: Zap,
    title: "Laser Ablation",
    description: "Vaporize surface material to create thrust and change trajectory",
    effectiveness: "Medium",
    leadTime: "Years",
    color: "text-danger-red",
    bgColor: "bg-danger-red/10",
  },
  {
    icon: Shield,
    title: "Nuclear Standoff",
    description: "Detonate a nuclear device near the asteroid to deflect it",
    effectiveness: "Very High",
    leadTime: "Months-Years",
    color: "text-warning-orange",
    bgColor: "bg-warning-orange/10",
  },
];

export const MitigationStrategies = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-text-orange text-warning-orange">Mitigation Strategies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proven methods to deflect potentially hazardous asteroids
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {strategies.map((strategy) => {
            const Icon = strategy.icon;
            return (
              <Card key={strategy.title} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${strategy.bgColor}`}>
                      <Icon className={`w-6 h-6 ${strategy.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{strategy.title}</CardTitle>
                      <CardDescription className="text-xs">Effectiveness: {strategy.effectiveness}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Required lead time:</span>
                    <span className="font-semibold text-foreground">{strategy.leadTime}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-primary/5 border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary">NASA's DART Mission Success</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              In September 2022, NASA's Double Asteroid Redirection Test (DART) successfully demonstrated the kinetic impactor technique by 
              deliberately crashing into the asteroid Dimorphos, changing its orbital period by 33 minutes. This historic mission proved that 
              humanity has the technology to defend against asteroid threats.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
