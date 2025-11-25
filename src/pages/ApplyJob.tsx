import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  MapPin, 
  DollarSign, 
  Calendar, 
  Users,
  Clock,
  Building2,
  Search,
  Filter,
  Info,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [selectedJob, setSelectedJob] = useState<typeof availableJobs[0] | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  // Mock data - will be replaced with real data from backend
  const availableJobs = [
    {
      id: 1,
      title: "React Advanced Patterns Workshop",
      vendor: "Tech Training Co.",
      location: "Mumbai, Maharashtra",
      type: "online",
      level: "advanced",
      duration: "3 days",
      startDate: "2025-02-15",
      endDate: "2025-02-17",
      participants: 30,
      hourlyRate: 3000,
      totalCompensation: 72000,
      skills: ["React", "TypeScript", "Design Patterns"],
      description: "Intensive workshop on advanced React patterns including compound components, render props, and custom hooks.",
      status: "open"
    },
    {
      id: 2,
      title: "Full-Stack JavaScript Bootcamp",
      vendor: "Code Academy India",
      location: "Bangalore, Karnataka",
      type: "hybrid",
      level: "intermediate",
      duration: "5 days",
      startDate: "2025-03-01",
      endDate: "2025-03-05",
      participants: 25,
      hourlyRate: 2500,
      totalCompensation: 100000,
      skills: ["JavaScript", "Node.js", "MongoDB", "React"],
      description: "Comprehensive bootcamp covering full-stack development from basics to deployment.",
      status: "open"
    },
    {
      id: 3,
      title: "Cloud Architecture with AWS",
      vendor: "Enterprise Solutions Ltd.",
      location: "Delhi NCR",
      type: "in-person",
      level: "advanced",
      duration: "2 days",
      startDate: "2025-02-20",
      endDate: "2025-02-21",
      participants: 20,
      hourlyRate: 3500,
      totalCompensation: 56000,
      skills: ["AWS", "Cloud Architecture", "DevOps"],
      description: "Deep dive into AWS services and cloud architecture best practices for enterprise applications.",
      status: "open"
    },
    {
      id: 4,
      title: "Python for Data Science",
      vendor: "Data Learning Hub",
      location: "Pune, Maharashtra",
      type: "online",
      level: "beginner",
      duration: "4 days",
      startDate: "2025-02-25",
      endDate: "2025-02-28",
      participants: 35,
      hourlyRate: 2000,
      totalCompensation: 64000,
      skills: ["Python", "Pandas", "Data Analysis"],
      description: "Introduction to Python programming with focus on data science applications and analytics.",
      status: "open"
    },
  ];

  const handleApply = (jobId: number, jobTitle: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      toast({
        title: "Application Submitted!",
        description: `Your application for "${jobTitle}" has been submitted successfully.`,
      });
    }
  };

  const handleShowInfo = (job: typeof availableJobs[0]) => {
    setSelectedJob(job);
    setIsInfoDialogOpen(true);
  };

  const filteredJobs = availableJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = filterLevel === "all" || job.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/trainer-dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">MatchaTrainer</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Available Training Opportunities</h2>
          <p className="text-muted-foreground">Find and apply to training sessions that match your expertise</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by title, vendor, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {availableJobs.length} opportunities
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <Building2 className="w-4 h-4" />
                      {job.vendor}
                    </CardDescription>
                  </div>
                  <Badge variant={job.type === "online" ? "default" : "secondary"} className="ml-4">
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{job.description}</p>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(job.startDate).toLocaleDateString()} - {new Date(job.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{job.participants} participants</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* Compensation and Level */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Compensation</p>
                      <p className="text-2xl font-bold flex items-center gap-1">
                        <DollarSign className="w-5 h-5" />
                        ₹{job.totalCompensation.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">₹{job.hourlyRate}/hour</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Level</p>
                      <Badge variant="secondary" className="mt-1 capitalize">{job.level}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="lg"
                      variant="outline"
                      onClick={() => handleShowInfo(job)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Info
                    </Button>
                    <Button 
                      size="lg"
                      onClick={() => handleApply(job.id, job.title)}
                      className={appliedJobs.includes(job.id) ? "bg-green-600 hover:bg-green-700" : ""}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {appliedJobs.includes(job.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No jobs found matching your criteria. Try adjusting your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Info Dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-base">
                  <Building2 className="w-4 h-4" />
                  {selectedJob.vendor}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                {/* Job Details */}
                <div>
                  <h4 className="font-semibold mb-3">Job Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{selectedJob.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedJob.startDate).toLocaleDateString()} - {new Date(selectedJob.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Training Duration</p>
                        <p className="text-sm text-muted-foreground">{selectedJob.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Participants</p>
                        <p className="text-sm text-muted-foreground">{selectedJob.participants} participants</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant={selectedJob.type === "online" ? "default" : "secondary"}>
                        {selectedJob.type}
                      </Badge>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {selectedJob.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="font-semibold mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* Compensation */}
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Compensation Details</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hourly Rate</p>
                      <p className="text-xl font-bold">₹{selectedJob.hourlyRate.toLocaleString()}/hour</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Compensation</p>
                      <p className="text-2xl font-bold text-primary">₹{selectedJob.totalCompensation.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1"
                    size="lg"
                    onClick={() => {
                      handleApply(selectedJob.id, selectedJob.title);
                      setIsInfoDialogOpen(false);
                    }}
                    disabled={appliedJobs.includes(selectedJob.id)}
                  >
                    {appliedJobs.includes(selectedJob.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Applied
                      </>
                    ) : (
                      "Apply Now"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsInfoDialogOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyJob;
