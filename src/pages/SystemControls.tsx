import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Power, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Shield,
  Database,
  Wifi,
  Server,
  Activity,
  Users,
  Bell
} from "lucide-react";
import { mockSystemData } from "@/data/mockData";

export default function SystemControls() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoSignalControl, setAutoSignalControl] = useState(true);

  const handleEmergencyToggle = () => {
    setEmergencyMode(!emergencyMode);
    // In real implementation, this would trigger emergency protocols
  };

  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    // In real implementation, this would enable maintenance mode
  };

  const handleSignalOverride = (junctionId: string, action: string) => {
    console.log(`Signal override: Junction ${junctionId} - ${action}`);
    // In real implementation, this would send commands to traffic signals
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Controls</h1>
            <p className="text-muted-foreground mt-1">
              Traffic infrastructure management and system operations
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant={emergencyMode ? "destructive" : "secondary"} className="px-3 py-1">
              <AlertTriangle className="h-4 w-4 mr-1" />
              {emergencyMode ? "Emergency Mode" : "Normal Operations"}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="signals" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="signals">Signal Control</TabsTrigger>
            <TabsTrigger value="system">System Status</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Signal Control Tab */}
          <TabsContent value="signals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Auto Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Automatic Control
                  </CardTitle>
                  <CardDescription>
                    AI-powered traffic signal optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto Signal Control</span>
                    <Switch 
                      checked={autoSignalControl} 
                      onCheckedChange={setAutoSignalControl}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Optimization Level</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Manual Overrides */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Power className="h-5 w-5" />
                    Manual Overrides
                  </CardTitle>
                  <CardDescription>
                    Direct control of traffic signals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {mockSystemData.junctions.slice(0, 4).map((junction) => (
                      <div key={junction.id} className="p-3 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{junction.name}</span>
                          <Badge 
                            variant={junction.status === 'green' ? 'default' : 
                                   junction.status === 'yellow' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {junction.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs"
                            onClick={() => handleSignalOverride(junction.id, 'green')}
                          >
                            Green
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs"
                            onClick={() => handleSignalOverride(junction.id, 'red')}
                          >
                            Red
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Junctions Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Junction Status Overview</CardTitle>
                <CardDescription>Real-time status of all traffic junctions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {mockSystemData.junctions.map((junction) => (
                    <div key={junction.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{junction.name}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          junction.status === 'green' ? 'bg-green-500' :
                          junction.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        Last Update: {junction.lastUpdate}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs"
                        onClick={() => handleSignalOverride(junction.id, 'override')}
                      >
                        Override Control
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Server Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Server className="h-5 w-5" />
                    Server Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </CardContent>
              </Card>

              {/* Network Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wifi className="h-5 w-5" />
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSystemData.networkStatus.map((connection) => (
                    <div key={connection.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          connection.status === 'Online' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm">{connection.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{connection.latency}</div>
                        <div className="text-xs font-medium">{connection.status}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Database Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Database className="h-5 w-5" />
                    Database Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Primary DB: Healthy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Backup DB: Synced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Query Response: 12ms</span>
                  </div>
                  <Separator />
                  <div className="text-xs text-muted-foreground">
                    Last Backup: 2 hours ago
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Services Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Services</CardTitle>
                <CardDescription>Status of critical system components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSystemData.services.map((service) => (
                    <div key={service.name} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{service.name}</span>
                        <Badge variant={service.status === 'Running' ? 'default' : 'destructive'}>
                          {service.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Uptime: {service.uptime}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Protocols
                </CardTitle>
                <CardDescription>
                  Critical system controls for emergency situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-destructive/5">
                  <div>
                    <div className="font-medium">Emergency Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Override all signals, activate emergency protocols
                    </div>
                  </div>
                  <Switch 
                    checked={emergencyMode} 
                    onCheckedChange={handleEmergencyToggle}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-500/5">
                  <div>
                    <div className="font-medium">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Disable automatic controls for system maintenance
                    </div>
                  </div>
                  <Switch 
                    checked={maintenanceMode} 
                    onCheckedChange={handleMaintenanceToggle}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="destructive" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    All Signals Red
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Lock All Controls
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    System Alert
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Notify Operators
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>General system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-refresh intervals</span>
                    <span className="text-sm text-muted-foreground">30 seconds</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Alert notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark mode</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sound alerts</span>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Operator access and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Admin Access</div>
                      <div className="text-xs text-muted-foreground">Full system control</div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Operator Level</div>
                      <div className="text-xs text-muted-foreground">Limited controls</div>
                    </div>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Users
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}