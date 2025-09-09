import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Maximize2, 
  Volume2, 
  VolumeX,
  Settings,
  RefreshCw
} from "lucide-react";
import { mockCameras } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function CameraGrid() {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [muteAll, setMuteAll] = useState(false);

  const statusColors = {
    online: "bg-success text-success-foreground",
    offline: "bg-destructive text-destructive-foreground", 
    warning: "bg-warning text-warning-foreground"
  };

  const statusLabels = {
    online: "LIVE",
    offline: "OFFLINE",
    warning: "FAULT"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">Live Camera Grid</h1>
          <Badge variant="outline">16 Cameras Active</Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMuteAll(!muteAll)}
            className="flex items-center gap-2"
          >
            {muteAll ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muteAll ? "Unmute All" : "Mute All"}
          </Button>
          
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
          
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockCameras.map((camera) => (
            <Card 
              key={camera.id} 
              className={cn(
                "relative overflow-hidden cursor-pointer transition-all duration-300 border-2",
                selectedCamera === camera.id 
                  ? "border-primary shadow-command" 
                  : "border-border hover:border-primary/50 hover:shadow-subtle"
              )}
              onClick={() => setSelectedCamera(selectedCamera === camera.id ? null : camera.id)}
            >
              {/* Camera Feed Simulation */}
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                {/* Status Indicator */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge className={cn("text-xs font-mono", statusColors[camera.status])}>
                    {statusLabels[camera.status]}
                  </Badge>
                </div>

                {/* Expand Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                >
                  <Maximize2 className="h-4 w-4 text-white" />
                </Button>

                {/* Simulated Video Feed */}
                {camera.status === "online" ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Animated grid pattern to simulate video */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600/30 to-green-600/30 animate-pulse" />
                    </div>
                    
                    {/* Simulated traffic elements */}
                    <div className="absolute bottom-1/3 left-1/4 w-3 h-6 bg-yellow-400 rounded animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-3 h-6 bg-red-400 rounded animate-pulse" />
                    <div className="absolute top-1/3 left-1/3 w-2 h-4 bg-white rounded animate-bounce" />
                    
                    {/* Timestamp */}
                    <div className="absolute bottom-2 left-2 text-white text-xs font-mono bg-black/70 px-2 py-1 rounded">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                ) : camera.status === "warning" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-warning/10">
                    <div className="text-warning text-2xl animate-pulse">⚠️</div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-destructive/10">
                    <div className="text-destructive text-sm font-mono">NO SIGNAL</div>
                  </div>
                )}
              </div>

              {/* Camera Info */}
              <div className="p-3 bg-card">
                <h3 className="font-medium text-foreground text-sm mb-1">
                  {camera.name}
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{camera.id}</span>
                  <span className={cn(
                    "font-mono",
                    camera.status === "online" ? "text-success" :
                    camera.status === "warning" ? "text-warning" : "text-destructive"
                  )}>
                    {camera.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedCamera && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-6xl">
            <Card className="overflow-hidden border-2 border-primary">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedCamera(null)}
                  className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70"
                >
                  Close
                </Button>
                
                {/* Large camera feed simulation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h2 className="text-white text-2xl font-semibold">
                      {mockCameras.find(c => c.id === selectedCamera)?.name}
                    </h2>
                    <p className="text-white/70 mt-2">Full-screen camera view</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}