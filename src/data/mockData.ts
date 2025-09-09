// Mock data for the Traffic Management System

export const mockStats = {
  violationsToday: {
    value: 247,
    trend: { direction: "down" as const, percentage: 12 }
  },
  congestionScore: {
    value: "78%",
    trend: { direction: "up" as const, percentage: 5 }
  },
  activeAlerts: {
    value: 14,
    trend: { direction: "down" as const, percentage: 3 }
  },
  systemHealth: {
    value: "94%",
    trend: { direction: "up" as const, percentage: 2 }
  }
};

export const mockAlerts = [
  {
    id: "ALT-001",
    type: "Traffic Accident",
    location: "NH-8 Junction 15, Near City Palace",
    timestamp: "2 min ago",
    severity: "high" as const,
    status: "pending" as const,
    description: "Multi-vehicle collision blocking two lanes. Emergency services dispatched."
  },
  {
    id: "ALT-002", 
    type: "Signal Malfunction",
    location: "Suraj Pole Intersection",
    timestamp: "5 min ago",
    severity: "medium" as const,
    status: "acknowledged" as const,
    description: "Traffic signal showing amber for extended period. Maintenance team notified."
  },
  {
    id: "ALT-003",
    type: "Heavy Congestion",
    location: "Fateh Sagar Lake Road",
    timestamp: "8 min ago", 
    severity: "medium" as const,
    status: "pending" as const,
    description: "Unusual traffic buildup detected. Traffic density 340% above normal."
  },
  {
    id: "ALT-004",
    type: "Road Construction",
    location: "Hiran Magri Sector 4",
    timestamp: "15 min ago",
    severity: "low" as const,
    status: "resolved" as const,
    description: "Lane closure for emergency road repair. Expected duration: 2 hours."
  },
  {
    id: "ALT-005",
    type: "Speed Violation",
    location: "Delhi Gate Flyover",
    timestamp: "18 min ago",
    severity: "low" as const,
    status: "pending" as const,
    description: "Vehicle detected at 95 km/h in 60 km/h zone. License plate: RJ14-AB-1234"
  }
];

export const mockViolations = [
  {
    id: "VIO-2024-001245",
    licensePlate: "RJ14-CD-5678",
    violationType: "Red Light Violation", 
    timestamp: "2024-01-15 14:23:15",
    location: "Chetak Circle, Camera-03",
    status: "Under Review"
  },
  {
    id: "VIO-2024-001246",
    licensePlate: "RJ14-EF-9012",
    violationType: "Speed Violation",
    timestamp: "2024-01-15 14:18:42", 
    location: "NH-8 Junction 12, Speed Camera-07",
    status: "Penalty Issued"
  },
  {
    id: "VIO-2024-001247",
    licensePlate: "RJ14-GH-3456",
    violationType: "Lane Violation",
    timestamp: "2024-01-15 14:15:33",
    location: "Fateh Sagar Road, Camera-11", 
    status: "Under Review"
  },
  {
    id: "VIO-2024-001248",
    licensePlate: "RJ14-IJ-7890",
    violationType: "No Helmet",
    timestamp: "2024-01-15 14:12:18",
    location: "University Road, Camera-15",
    status: "Penalty Issued"
  }
];

export const mockCameras = [
  { id: "CAM-001", name: "Junction 1 - Northbound", status: "online" as const },
  { id: "CAM-002", name: "Junction 1 - Southbound", status: "online" as const },
  { id: "CAM-003", name: "Junction 2 - Eastbound", status: "online" as const },
  { id: "CAM-004", name: "Junction 2 - Westbound", status: "offline" as const },
  { id: "CAM-005", name: "Junction 3 - Northbound", status: "online" as const },
  { id: "CAM-006", name: "Junction 3 - Southbound", status: "warning" as const },
  { id: "CAM-007", name: "Junction 4 - Eastbound", status: "online" as const },
  { id: "CAM-008", name: "Junction 4 - Westbound", status: "online" as const },
  { id: "CAM-009", name: "NH-8 Speed Camera", status: "online" as const },
  { id: "CAM-010", name: "City Palace Junction", status: "online" as const },
  { id: "CAM-011", name: "Fateh Sagar Monitoring", status: "online" as const },
  { id: "CAM-012", name: "Suraj Pole Camera", status: "warning" as const },
  { id: "CAM-013", name: "Chetak Circle Monitor", status: "online" as const },
  { id: "CAM-014", name: "University Road Cam", status: "online" as const },
  { id: "CAM-015", name: "Delhi Gate Flyover", status: "online" as const },
  { id: "CAM-016", name: "Hiran Magri Sector", status: "online" as const }
];

export const mockTrafficSignals = [
  { 
    id: "SIG-001", 
    location: "Chetak Circle",
    coordinates: { lat: 24.5854, lng: 73.7125 },
    status: "green" as const,
    lastUpdate: "2024-01-15T14:25:00Z"
  },
  {
    id: "SIG-002",
    location: "Suraj Pole",
    coordinates: { lat: 24.5804, lng: 73.6833 },
    status: "red" as const,
    lastUpdate: "2024-01-15T14:24:45Z"
  },
  {
    id: "SIG-003", 
    location: "Delhi Gate",
    coordinates: { lat: 24.5916, lng: 73.6852 },
    status: "yellow" as const,
    lastUpdate: "2024-01-15T14:24:30Z"
  },
  {
    id: "SIG-004",
    location: "Fateh Sagar Junction",
    coordinates: { lat: 24.5908, lng: 73.6758 },
    status: "green" as const, 
    lastUpdate: "2024-01-15T14:25:10Z"
  },
  {
    id: "SIG-005",
    location: "City Palace Junction",
    coordinates: { lat: 24.5764, lng: 73.6833 },
    status: "red" as const,
    lastUpdate: "2024-01-15T14:24:15Z"
  }
];

export const mockMapAlerts = [
  {
    id: "MAP-ALT-001",
    coordinates: { lat: 24.5889, lng: 73.6917 },
    type: "accident",
    severity: "high" as const,
    title: "Traffic Accident",
    description: "Multi-vehicle collision on NH-8"
  },
  {
    id: "MAP-ALT-002", 
    coordinates: { lat: 24.5804, lng: 73.6833 },
    type: "malfunction",
    severity: "medium" as const,
    title: "Signal Malfunction", 
    description: "Traffic signal malfunction at Suraj Pole"
  },
  {
    id: "MAP-ALT-003",
    coordinates: { lat: 24.5908, lng: 73.6758 },
    type: "congestion",
    severity: "medium" as const,
    title: "Heavy Traffic",
    description: "Congestion on Fateh Sagar Road"
  }
];