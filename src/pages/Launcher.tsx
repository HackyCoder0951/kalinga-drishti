import { StatCard } from "@/components/StatCard";
import { LauncherButton } from "@/components/LauncherButton";
import { AlertTicker } from "@/components/AlertTicker";
import { 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Camera, 
  Map, 
  ShieldCheck,
  FileText,
  Users,
  Zap
} from "lucide-react";
import { mockStats, mockAlerts } from "@/data/mockData";

export default function Launcher() {
  const openModule = (path: string, windowName: string) => {
    window.open(
      path, 
      windowName, 
      'width=1200,height=800,resizable=yes,scrollbars=yes,status=yes'
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Traffic Management Command Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Udaipur City • Operator: Traffic Control Unit
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-foreground">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="text-muted-foreground">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Violations Today"
            value={mockStats.violationsToday.value}
            icon={ShieldCheck}
            variant="warning"
            trend={mockStats.violationsToday.trend}
            subtitle="Traffic infractions detected"
          />
          <StatCard
            title="Congestion Score"
            value={mockStats.congestionScore.value}
            icon={BarChart3}
            variant="critical"
            trend={mockStats.congestionScore.trend}
            subtitle="Current traffic density"
          />
          <StatCard
            title="Active Alerts"
            value={mockStats.activeAlerts.value}
            icon={AlertTriangle}
            variant="warning"
            trend={mockStats.activeAlerts.trend}
            subtitle="Incidents requiring attention"
          />
          <StatCard
            title="System Health"
            value={mockStats.systemHealth.value}
            icon={Activity}
            variant="success"
            trend={mockStats.systemHealth.trend}
            subtitle="Network & cameras online"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Launchers */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Launch Modules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LauncherButton
                title="Live Traffic Map"
                description="Real-time traffic signals, alerts, and road conditions across Udaipur"
                icon={Map}
                onClick={() => openModule('/map', 'TrafficMapWindow')}
              />
              
              <LauncherButton
                title="Camera Grid"
                description="Live video feeds from all traffic monitoring cameras and junctions"
                icon={Camera}
                onClick={() => openModule('/cameras', 'CameraGridWindow')}
              />
              
              <LauncherButton
                title="Alerts Console"
                description="Active incident management and AI-powered response planning"
                icon={AlertTriangle}
                onClick={() => openModule('/alerts', 'AlertsConsoleWindow')}
              />
              
              <LauncherButton
                title="Violation Logs"
                description="Traffic infringement records, evidence, and enforcement tracking"
                icon={FileText}
                onClick={() => openModule('/violations', 'ViolationLogsWindow')}
              />
              
              <LauncherButton
                title="Analytics Dashboard"
                description="Traffic patterns, performance metrics, and operational insights"
                icon={BarChart3}
                onClick={() => openModule('/analytics', 'AnalyticsWindow')}
              />
              
              <LauncherButton
                title="System Control"
                description="Network monitoring, device management, and system configuration"
                icon={Zap}
                onClick={() => openModule('/system', 'SystemControlWindow')}
              />
            </div>
          </div>

          {/* Alert Ticker */}
          <div>
            <AlertTicker alerts={mockAlerts} />
          </div>
        </div>
      </div>
    </div>
  );
}