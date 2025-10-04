import { Hero } from "@/components/Hero";
import { AsteroidExplorer } from "@/components/AsteroidExplorer";
import { AsteroidTrajectoryMap } from "@/components/AsteroidTrajectoryMap";
import { ImpactSimulator } from "@/components/ImpactSimulator";
import { MitigationStrategies } from "@/components/MitigationStrategies";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AsteroidExplorer />
      <AsteroidTrajectoryMap />
      <ImpactSimulator />
      <MitigationStrategies />
      <Footer />
    </div>
  );
};

export default Index;
