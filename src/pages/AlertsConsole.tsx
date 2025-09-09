import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  XCircle,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { mockAlerts } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function AlertsConsole() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState<string | null>(null);
  const [actionPlans, setActionPlans] = useState<Record<string, string>>({});

  const selectedAlertData = alerts.find(alert => alert.id === selectedAlert);

  const severityColors = {
    high: "border-destructive bg-destructive/5 shadow-critical",
    medium: "border-warning bg-warning/5 shadow-alert",
    low: "border-success bg-success/5"
  };

  const severityBadges = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-warning text-warning-foreground",
    low: "bg-success text-success-foreground"
  };

  const statusColors = {
    pending: "bg-warning text-warning-foreground",
    acknowledged: "bg-primary text-primary-foreground", 
    escalated: "bg-destructive text-destructive-foreground",
    resolved: "bg-success text-success-foreground"
  };

  const updateAlertStatus = (alertId: string, newStatus: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: newStatus as any }
        : alert
    ));
  };

  const generateActionPlan = async (alertId: string) => {
    setGeneratingPlan(alertId);
    
    // Simulate AI API call
    setTimeout(() => {
      const alert = alerts.find(a => a.id === alertId);
      let plan = "";
      
      if (alert?.type === "Traffic Accident") {
        plan = `EMERGENCY RESPONSE PROTOCOL:

1. IMMEDIATE ACTIONS (0-5 minutes):
   • Dispatch emergency services to NH-8 Junction 15
   • Activate traffic diversion protocols via alternate routes
   • Deploy traffic control personnel to manage flow
   • Alert nearby hospitals of incoming casualties

2. TRAFFIC MANAGEMENT (5-30 minutes):
   • Redirect traffic through Fateh Sagar Road and Delhi Gate
   • Activate electronic signage for alternate route guidance  
   • Coordinate with traffic police for manual overrides
   • Monitor congestion levels on diverted routes

3. COMMUNICATION (Ongoing):
   • Issue public advisory via radio and social media
   • Update GPS navigation systems with road closure
   • Coordinate with media for traffic updates
   • Inform local businesses of potential delays

4. RECOVERY PHASE (30+ minutes):
   • Clear accident scene with towing services
   • Inspect road surface for damage requiring repair
   • Gradually restore normal traffic patterns
   • Document incident for future prevention analysis`;
      } else {
        plan = `STANDARD RESPONSE PROTOCOL:

1. ASSESSMENT:
   • Verify incident details and severity level
   • Deploy field personnel for on-site evaluation
   • Gather additional information from available cameras

2. IMMEDIATE RESPONSE:
   • Implement appropriate traffic control measures
   • Coordinate with relevant departments/services
   • Monitor situation for escalation requirements

3. RESOLUTION:
   • Execute corrective actions as needed
   • Restore normal operations
   • Document incident and response actions`;
      }
      
      setActionPlans({ ...actionPlans, [alertId]: plan });
      setGeneratingPlan(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Alerts List */}
      <div className="w-1/2 border-r border-border">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <h1 className="text-xl font-semibold text-foreground">Active Alerts</h1>
              <Badge variant="outline">{alerts.length} Total</Badge>
            </div>
            <Button size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {alerts.map((alert) => (
            <Card 
              key={alert.id}
              className={cn(
                "m-4 cursor-pointer transition-all duration-300 border-2",
                selectedAlert === alert.id 
                  ? "border-primary shadow-command" 
                  : severityColors[alert.severity]
              )}
              onClick={() => setSelectedAlert(alert.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs", severityBadges[alert.severity])}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge className={cn("text-xs", statusColors[alert.status])}>
                      {alert.status.toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {alert.id}
                  </span>
                </div>
                <CardTitle className="text-lg">{alert.type}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {alert.timestamp}
                  </div>
                  <p className="text-sm text-foreground mt-3">
                    {alert.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Alert Details */}
      <div className="flex-1">
        {selectedAlertData ? (
          <div className="h-full flex flex-col">
            <div className="bg-card border-b border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground mb-2">
                    {selectedAlertData.type}
                  </h1>
                  <div className="flex items-center gap-3">
                    <Badge className={cn("text-sm", severityBadges[selectedAlertData.severity])}>
                      {selectedAlertData.severity.toUpperCase()} PRIORITY
                    </Badge>
                    <Badge className={cn("text-sm", statusColors[selectedAlertData.status])}>
                      {selectedAlertData.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateAlertStatus(selectedAlertData.id, "acknowledged")}
                    disabled={selectedAlertData.status !== "pending"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Acknowledge
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateAlertStatus(selectedAlertData.id, "resolved")}
                    disabled={selectedAlertData.status === "resolved"}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Resolve
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-medium text-foreground">{selectedAlertData.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <p className="font-medium text-foreground">{selectedAlertData.timestamp}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Incident Details</h3>
                <Card className="p-4 bg-muted/30">
                  <p className="text-foreground">{selectedAlertData.description}</p>
                </Card>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">AI Response Plan</h3>
                  {!actionPlans[selectedAlertData.id] && (
                    <Button
                      onClick={() => generateActionPlan(selectedAlertData.id)}
                      disabled={generatingPlan === selectedAlertData.id}
                      className="bg-gradient-primary hover:shadow-command"
                    >
                      {generatingPlan === selectedAlertData.id ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Action Plan
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {actionPlans[selectedAlertData.id] ? (
                  <Card className="p-4 bg-gradient-card border-primary/30">
                    <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                      {actionPlans[selectedAlertData.id]}
                    </pre>
                  </Card>
                ) : generatingPlan === selectedAlertData.id ? (
                  <Card className="p-8 bg-muted/30 border-primary/50">
                    <div className="text-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                      <p className="text-muted-foreground">AI is analyzing the incident and generating an optimized response plan...</p>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-8 bg-muted/30 border-dashed border-2 border-muted-foreground/30">
                    <div className="text-center">
                      <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Click "Generate Action Plan" to get AI-powered response recommendations</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Select an Alert</h2>
              <p className="text-muted-foreground">Choose an alert from the list to view details and manage response</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}