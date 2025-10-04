import { Satellite } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Satellite className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Impactor-2025</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-2">
              Data provided by NASA's Near-Earth Object Web Service and USGS
            </p>
            <p className="text-xs text-muted-foreground">
              Built for educational and research purposes. Not for official hazard assessment.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            NASA Space Apps Challenge 2025 | Created to advance planetary defense awareness
          </p>
        </div>
      </div>
    </footer>
  );
};
