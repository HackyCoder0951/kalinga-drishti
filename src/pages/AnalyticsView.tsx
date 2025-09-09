import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  MapPin,
  Activity,
  Users
} from "lucide-react";

export default function AnalyticsView() {
  const mockAnalytics = {
    hourlyTraffic: [
      { hour: "00:00", volume: 120 },
      { hour: "06:00", volume: 450 },
      { hour: "08:00", volume: 890 },
      { hour: "12:00", volume: 650 },
      { hour: "18:00", volume: 920 },
      { hour: "22:00", volume: 340 }
    ],
    topViolationLocations: [
      { location: "Chetak Circle", violations: 45 },
      { location: "NH-8 Junction", violations: 38 },
      { location: "Suraj Pole", violations: 29 },
      { location: "Fateh Sagar Road", violations: 22 }
    ],
    performanceMetrics: {
      averageResponseTime: "3.2 min",
      resolutionRate: "94.5%",
      operatorEfficiency: "87%",
      systemUptime: "99.8%"
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Traffic patterns and operational insights</p>
          </div>
        </div>
        <Badge variant="outline" className="text-sm">
          Last Updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-primary border-primary/30 shadow-command">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockAnalytics.performanceMetrics.averageResponseTime}</div>
            <p className="text-xs text-white/70">↗ 12% improvement</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success border-success/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Resolution Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockAnalytics.performanceMetrics.resolutionRate}</div>
            <p className="text-xs text-white/70">↗ 5% increase</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Operator Efficiency</CardTitle>
            <Users className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockAnalytics.performanceMetrics.operatorEfficiency}</div>
            <p className="text-xs text-white/70">↘ 2% decline</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning border-warning/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black/90">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{mockAnalytics.performanceMetrics.systemUptime}</div>
            <p className="text-xs text-black/70">↗ Target: 99.9%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Volume Chart */}
        <Card className="bg-gradient-card border-2 border-border shadow-subtle">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">24-Hour Traffic Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.hourlyTraffic.map((data) => (
                <div key={data.hour} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-mono">{data.hour}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                        style={{ width: `${(data.volume / 1000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground w-16 text-right">{data.volume}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Violation Locations */}
        <Card className="bg-gradient-card border-2 border-border shadow-subtle">
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Top Violation Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topViolationLocations.map((location, index) => (
                <div key={location.location} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20 text-destructive text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{location.location}</p>
                      <p className="text-xs text-muted-foreground">Junction ID: JNC-{String(index + 1).padStart(3, '0')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{location.violations}</p>
                    <p className="text-xs text-muted-foreground">violations</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Section */}
      <Card className="mt-8 bg-muted/20 border-2 border-dashed border-muted-foreground/30">
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Advanced Analytics Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Connect to Supabase to unlock real-time traffic analysis, predictive modeling, and advanced reporting features.
          </p>
          <Badge variant="outline" className="text-sm">
            Requires Backend Integration
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}