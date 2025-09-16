import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Maximize2, 
  Volume2, 
  VolumeX,
  Settings,
  RefreshCw,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { mockCameras } from "@/data/mockData";
import { cn } from "@/lib/utils";

// Sample traffic video URLs (using placeholder and sample videos)
const trafficVideos = [
  // "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
  // "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
];

export default function CameraGrid() {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [muteAll, setMuteAll] = useState(true);
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

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

  useEffect(() => {
    // Auto-play all videos when component mounts
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = muteAll;
        video.play().catch(console.error);
      }
    });
  }, []);

  useEffect(() => {
    // Update mute state for all videos
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = muteAll;
      }
    });
  }, [muteAll]);

  const toggleVideoPlayback = (cameraId: string) => {
    const video = videoRefs.current[cameraId];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideos(prev => ({ ...prev, [cameraId]: true }));
      } else {
        video.pause();
        setPlayingVideos(prev => ({ ...prev, [cameraId]: false }));
      }
    }
  };

  const restartVideo = (cameraId: string) => {
    const video = videoRefs.current[cameraId];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const getVideoUrl = (index: number) => {
    return trafficVideos[index % trafficVideos.length];
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
      <div className="p-3 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {mockCameras.map((camera, index) => (
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
              {/* Camera Feed */}
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden group">
                {/* Status Indicator */}
                <div className="absolute top-2 left-2 z-20">
                  <Badge className={cn("text-xs font-mono animate-fade-in", statusColors[camera.status])}>
                    {statusLabels[camera.status]}
                  </Badge>
                </div>

                {/* Control Buttons */}
                <div className="absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 bg-black/50 hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayback(camera.id);
                    }}
                  >
                    {playingVideos[camera.id] === false ? 
                      <Play className="h-3 w-3 text-white" /> : 
                      <Pause className="h-3 w-3 text-white" />
                    }
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 bg-black/50 hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      restartVideo(camera.id);
                    }}
                  >
                    <RotateCcw className="h-3 w-3 text-white" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 bg-black/50 hover:bg-black/70"
                  >
                    <Maximize2 className="h-3 w-3 text-white" />
                  </Button>
                </div>

                {/* Video Feed */}
                {camera.status === "online" ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={el => { videoRefs.current[camera.id] = el; }}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted={muteAll}
                      playsInline
                      onLoadStart={() => setPlayingVideos(prev => ({ ...prev, [camera.id]: true }))}
                      onError={() => console.error(`Video error for camera ${camera.id}`)}
                    >
                      <source src={getVideoUrl(index)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    
                    {/* Live Indicator */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-2 z-10">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white text-xs font-mono bg-black/70 px-2 py-1 rounded">
                        LIVE
                      </span>
                    </div>
                    
                    {/* Timestamp */}
                    <div className="absolute bottom-2 right-2 text-white text-xs font-mono bg-black/70 px-2 py-1 rounded z-10">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                ) : camera.status === "warning" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-warning/10">
                    <div className="text-center">
                      <div className="text-warning text-3xl animate-pulse mb-2">⚠️</div>
                      <div className="text-warning text-sm font-mono">SIGNAL WEAK</div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-destructive/10">
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-destructive/50 mx-auto mb-2" />
                      <div className="text-destructive text-sm font-mono">NO SIGNAL</div>
                    </div>
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
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative w-full max-w-6xl animate-scale-in">
            <Card className="overflow-hidden border-2 border-primary shadow-command">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedCamera(null)}
                  className="absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-black/70 animate-fade-in"
                >
                  Close
                </Button>
                
                {/* Full-screen video */}
                {(() => {
                  const selectedCameraData = mockCameras.find(c => c.id === selectedCamera);
                  const selectedIndex = mockCameras.findIndex(c => c.id === selectedCamera);
                  
                  if (selectedCameraData?.status === "online") {
                    return (
                      <div className="relative w-full h-full">
                        <video
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted={muteAll}
                          playsInline
                          controls
                        >
                          <source src={getVideoUrl(selectedIndex)} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Video Info Overlay */}
                        <div className="absolute top-4 left-4 z-10 bg-black/70 rounded-lg p-3">
                          <h2 className="text-white text-xl font-semibold mb-1">
                            {selectedCameraData.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-white text-sm">LIVE FEED</span>
                          </div>
                        </div>
                        
                        {/* Controls */}
                        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="bg-black/50 hover:bg-black/70 text-white"
                            onClick={() => toggleVideoPlayback(selectedCamera)}
                          >
                            {playingVideos[selectedCamera] === false ? 
                              <Play className="h-4 w-4" /> : 
                              <Pause className="h-4 w-4" />
                            }
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="bg-black/50 hover:bg-black/70 text-white"
                            onClick={() => restartVideo(selectedCamera)}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h2 className="text-white text-2xl font-semibold">
                          {selectedCameraData?.name}
                        </h2>
                        <p className="text-white/70 mt-2">
                          {selectedCameraData?.status === "offline" ? "Camera Offline" : "Signal Issue"}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}