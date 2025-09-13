import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoSignalControl, setAutoSignalControl] = useState(true);
  const [alertNotifications, setAlertNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [junctionStates, setJunctionStates] = useState<Record<string, string>>({});

  const handleEmergencyToggle = () => {
    setEmergencyMode(!emergencyMode);
    toast({
      title: emergencyMode ? "Emergency Mode Disabled" : "Emergency Mode Activated",
      description: emergencyMode 
        ? "System returned to normal operations" 
        : "All signals locked, emergency protocols active",
      variant: emergencyMode ? "default" : "destructive",
    });
  };

  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: maintenanceMode ? "Maintenance Mode Disabled" : "Maintenance Mode Enabled",
      description: maintenanceMode 
        ? "Automatic controls re-enabled" 
        : "Automatic controls disabled for maintenance",
    });
  };

  const handleSignalOverride = (junctionId: string, action: string) => {
    setJunctionStates(prev => ({ ...prev, [junctionId]: action }));
    toast({
      title: "Signal Override",
      description: `Junction ${junctionId} signal set to ${action.toUpperCase()}`,
    });
  };

  const handleEmergencyAction = (action: string) => {
    toast({
      title: "Emergency Action",
      description: `${action} command executed`,
      variant: "destructive",
    });
  };

  const handleSystemAction = (action: string) => {
    toast({
      title: "System Action",
      description: `${action} completed successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10 p-3 sm:p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 relative z-10">
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
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
            <TabsTrigger value="signals" className="text-xs sm:text-sm">Signal Control</TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm">System Status</TabsTrigger>
            <TabsTrigger value="emergency" className="text-xs sm:text-sm">Emergency</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">Settings</TabsTrigger>
          </TabsList>

          {/* Signal Control Tab */}
          <TabsContent value="signals" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Auto Control Panel */}
              <Card className="bg-gradient-to-br from-card to-accent/10 border-2 hover:border-primary/20 transition-smooth">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
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
                      onCheckedChange={(checked) => {
                        setAutoSignalControl(checked);
                        toast({
                          title: checked ? "Auto Control Enabled" : "Auto Control Disabled",
                          description: checked 
                            ? "AI optimization is now active" 
                            : "Manual control is now active",
                        });
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Optimization Level</span>
                      <span className="font-medium text-primary">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Manual Overrides */}
              <Card className="bg-gradient-to-br from-card to-warning/5 border-2 hover:border-warning/20 transition-smooth">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Power className="h-5 w-5 text-warning" />
                    Manual Overrides
                  </CardTitle>
                  <CardDescription>
                    Direct control of traffic signals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mockSystemData.junctions.slice(0, 4).map((junction) => (
                      <div key={junction.id} className="p-3 border rounded-lg space-y-2 bg-muted/20 hover:bg-muted/40 transition-smooth">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{junction.name}</span>
                          <Badge 
                            variant={
                              (junctionStates[junction.id] || junction.status) === 'green' ? 'default' : 
                              (junctionStates[junction.id] || junction.status) === 'yellow' ? 'secondary' : 'destructive'
                            }
                            className="text-xs"
                          >
                            {(junctionStates[junction.id] || junction.status).toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant={(junctionStates[junction.id] || junction.status) === 'green' ? 'default' : 'outline'}
                            className="flex-1 text-xs"
                            onClick={() => handleSignalOverride(junction.id, 'green')}
                          >
                            Green
                          </Button>
                          <Button 
                            size="sm" 
                            variant={(junctionStates[junction.id] || junction.status) === 'red' ? 'destructive' : 'outline'}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {mockSystemData.junctions.map((junction) => (
                    <div key={junction.id} className="p-4 border rounded-lg hover:bg-primary/5 transition-smooth bg-gradient-to-br from-card to-accent/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{junction.name}</span>
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          (junctionStates[junction.id] || junction.status) === 'green' ? 'bg-success shadow-success' :
                          (junctionStates[junction.id] || junction.status) === 'yellow' ? 'bg-warning shadow-warning' : 'bg-destructive shadow-destructive'
                        }`} />
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        Last Update: {junction.lastUpdate}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs hover:bg-primary hover:text-primary-foreground transition-smooth"
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
          <TabsContent value="system" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Server Status */}
              <Card className="bg-gradient-to-br from-card to-success/5 border-2 hover:border-success/20 transition-smooth">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Server className="h-5 w-5 text-success" />
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
                  <Button 
                    variant="destructive" 
                    className="flex items-center gap-2 hover:scale-105 transition-smooth"
                    onClick={() => handleEmergencyAction("All Signals Red")}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    All Signals Red
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 hover:scale-105 transition-smooth"
                    onClick={() => handleEmergencyAction("Lock All Controls")}
                  >
                    <Shield className="h-4 w-4" />
                    Lock All Controls
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 hover:scale-105 transition-smooth"
                    onClick={() => handleEmergencyAction("System Alert")}
                  >
                    <Bell className="h-4 w-4" />
                    System Alert
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 hover:scale-105 transition-smooth"
                    onClick={() => handleEmergencyAction("Notify Operators")}
                  >
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
                    <Switch 
                      checked={alertNotifications} 
                      onCheckedChange={(checked) => {
                        setAlertNotifications(checked);
                        handleSystemAction(checked ? "Enabled alert notifications" : "Disabled alert notifications");
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark mode</span>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={(checked) => {
                        setDarkMode(checked);
                        handleSystemAction(checked ? "Enabled dark mode" : "Enabled light mode");
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sound alerts</span>
                    <Switch 
                      checked={soundAlerts} 
                      onCheckedChange={(checked) => {
                        setSoundAlerts(checked);
                        handleSystemAction(checked ? "Enabled sound alerts" : "Disabled sound alerts");
                      }}
                    />
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