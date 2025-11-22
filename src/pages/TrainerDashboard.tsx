import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  Award,
  TrendingUp,
  BookOpen,
  LogOut
} from "lucide-react";

const TrainerDashboard = () => {
  const navigate = useNavigate();

  // Mock data - will be replaced with real data from backend
  const dashboardData = {
    totalTrainings: 24,
    upcomingTrainings: 3,
    completedTrainings: 21,
    totalEarnings: 485000, // in rupees
    thisMonthEarnings: 45000,
    skills: [
      { name: "React", proficiency: 9 },
      { name: "TypeScript", proficiency: 8 },
      { name: "Node.js", proficiency: 7 },
      { name: "AWS", proficiency: 6 },
      { name: "Docker", proficiency: 7 },
    ],
    recentTrainings: [
      { id: 1, title: "Advanced React Patterns", date: "2025-01-15", students: 25, status: "completed" },
      { id: 2, title: "TypeScript for Beginners", date: "2025-01-10", students: 30, status: "completed" },
      { id: 3, title: "Full-Stack Development", date: "2025-01-25", students: 20, status: "upcoming" },
    ],
    rating: 4.8,
    totalReviews: 156
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MatchaTrainer</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/apply-job")}>
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Jobs
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Trainer!</h2>
          <p className="text-muted-foreground">Here's your performance overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Trainings</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalTrainings}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.upcomingTrainings} upcoming
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{dashboardData.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ₹{dashboardData.thisMonthEarnings.toLocaleString()} this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.completedTrainings}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((dashboardData.completedTrainings / dashboardData.totalTrainings) * 100)}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Trainer Rating</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.rating}/5.0</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.totalReviews} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Skills
              </CardTitle>
              <CardDescription>Proficiency levels (1-10)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <Badge variant="secondary">{skill.proficiency}/10</Badge>
                  </div>
                  <Progress value={skill.proficiency * 10} className="h-2" />
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                Update Skills
              </Button>
            </CardContent>
          </Card>

          {/* Recent Trainings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recent Trainings
              </CardTitle>
              <CardDescription>Your latest training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentTrainings.map((training) => (
                  <div 
                    key={training.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{training.title}</h4>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(training.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {training.students} students
                        </span>
                      </div>
                    </div>
                    <Badge variant={training.status === "completed" ? "default" : "secondary"}>
                      {training.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Trainings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={() => navigate("/apply-job")} className="w-full">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Available Jobs
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
              <Button variant="outline" className="w-full">
                <Award className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainerDashboard;
