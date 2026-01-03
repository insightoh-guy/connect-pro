import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Award,
  LogOut,
  User,
  Settings,
  Bell
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [activeJobs] = useState(8);
  const [totalJobs] = useState(24);
  const [trainersHired] = useState(15);
  const [completedSessions] = useState(42);
  const [totalSpent] = useState(487500);
  const [pendingSessions] = useState(12);

  const handleLogout = () => {
    navigate("/auth");
  };

  const jobPostings = [
    { id: 1, title: "React Advanced Training", status: "active", applicants: 12, hired: 2 },
    { id: 2, title: "Leadership Workshop", status: "active", applicants: 8, hired: 1 },
    { id: 3, title: "Python Fundamentals", status: "filled", applicants: 15, hired: 3 },
    { id: 4, title: "Agile Methodology", status: "active", applicants: 6, hired: 0 },
  ];

  const recentTrainers = [
    { id: 1, name: "Priya Sharma", expertise: "React & Frontend", rating: 4.8, sessions: 8 },
    { id: 2, name: "Rahul Kumar", expertise: "Python & Backend", rating: 4.9, sessions: 12 },
    { id: 3, name: "Amit Patel", expertise: "Leadership", rating: 4.7, sessions: 6 },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">MatchaTrainer Vendor Portal</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/vendor-profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/vendor-settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/notifications")}>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Vendor Dashboard</h2>
          <p className="text-muted-foreground">Manage your training programs and trainer relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJobs}</div>
              <p className="text-xs text-muted-foreground">
                {totalJobs} total postings
              </p>
              <Progress value={(activeJobs / totalJobs) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trainers Hired</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trainersHired}</div>
              <p className="text-xs text-muted-foreground">
                Active relationships
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across {completedSessions} sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSessions}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled this month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="trainers">Trainers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Your Job Postings</h3>
              <Button>
                <Briefcase className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <div className="grid gap-4">
              {jobPostings.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{job.title}</h4>
                          <Badge variant={job.status === "active" ? "default" : "secondary"}>
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{job.applicants} applicants</span>
                          <span>•</span>
                          <span>{job.hired} hired</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trainers" className="space-y-4">
            <h3 className="text-xl font-semibold">Your Trainers</h3>
            
            <div className="grid gap-4">
              {recentTrainers.map((trainer) => (
                <Card key={trainer.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1">{trainer.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{trainer.expertise}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-primary" />
                            <span>{trainer.rating} rating</span>
                          </div>
                          <span>•</span>
                          <span>{trainer.sessions} sessions completed</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-xl font-semibold">Performance Analytics</h3>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending</CardTitle>
                  <CardDescription>Training investment over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "December", amount: 95000 },
                      { month: "November", amount: 82000 },
                      { month: "October", amount: 78000 },
                      { month: "September", amount: 91000 },
                      { month: "August", amount: 72000 },
                      { month: "July", amount: 69500 },
                    ].map((data) => (
                      <div key={data.month}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-muted-foreground">{data.month}</span>
                          <span className="font-medium">₹{data.amount.toLocaleString()}</span>
                        </div>
                        <Progress value={(data.amount / 100000) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Success Rate</CardTitle>
                  <CardDescription>Completion and satisfaction metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Completion Rate</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <Progress value={94} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Average Satisfaction</span>
                        <span className="text-sm font-medium">4.6/5.0</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Trainer Retention</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <Progress value={87} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorDashboard;
