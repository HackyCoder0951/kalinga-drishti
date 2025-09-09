import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Download,
  Calendar,
  MapPin
} from "lucide-react";
import { mockViolations } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function ViolationsView() {
  const [violations] = useState(mockViolations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedViolation, setSelectedViolation] = useState<string | null>(null);

  const filteredViolations = violations.filter(violation =>
    violation.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    violation.violationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    violation.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedViolationData = violations.find(v => v.id === selectedViolation);

  const statusColors = {
    "Under Review": "bg-warning text-warning-foreground",
    "Penalty Issued": "bg-destructive text-destructive-foreground", 
    "Dismissed": "bg-muted text-muted-foreground",
    "Paid": "bg-success text-success-foreground"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Traffic Violations</h1>
            <Badge variant="outline">{violations.length} Total Records</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by license plate, violation type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Violations Table */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Card className="overflow-hidden border-2 border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Violation ID</TableHead>
                    <TableHead className="font-semibold">License Plate</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Date & Time</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredViolations.map((violation) => (
                    <TableRow 
                      key={violation.id}
                      className={cn(
                        "cursor-pointer hover:bg-muted/30 transition-colors",
                        selectedViolation === violation.id && "bg-primary/5 border-l-4 border-l-primary"
                      )}
                      onClick={() => setSelectedViolation(violation.id)}
                    >
                      <TableCell className="font-mono text-sm">{violation.id}</TableCell>
                      <TableCell className="font-semibold">{violation.licensePlate}</TableCell>
                      <TableCell>{violation.violationType}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(violation.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{violation.location}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", statusColors[violation.status as keyof typeof statusColors])}>
                          {violation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>

        {/* Violation Details Panel */}
        {selectedViolationData && (
          <div className="w-96 border-l border-border bg-card/50 p-6 overflow-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Violation Details</h2>
                <Card className="p-4 space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Violation ID</span>
                    <p className="font-mono text-sm font-medium">{selectedViolationData.id}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">License Plate</span>
                    <p className="text-lg font-bold text-foreground">{selectedViolationData.licensePlate}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Violation Type</span>
                    <p className="font-medium text-foreground">{selectedViolationData.violationType}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="mt-1">
                      <Badge className={cn("text-sm", statusColors[selectedViolationData.status as keyof typeof statusColors])}>
                        {selectedViolationData.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-md font-semibold text-foreground mb-3">Incident Information</h3>
                <Card className="p-4 space-y-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <span className="text-sm text-muted-foreground">Date & Time</span>
                      <p className="text-sm font-medium">
                        {new Date(selectedViolationData.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <span className="text-sm text-muted-foreground">Location</span>
                      <p className="text-sm font-medium">{selectedViolationData.location}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-md font-semibold text-foreground mb-3">Evidence</h3>
                <Card className="p-4">
                  {/* Simulated evidence images */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded border-2 border-border flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Camera View 1</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded border-2 border-border flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Camera View 2</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Evidence
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Evidence
                    </Button>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-md font-semibold text-foreground mb-3">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Issue Penalty Notice
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Court Hearing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Dismiss Violation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}