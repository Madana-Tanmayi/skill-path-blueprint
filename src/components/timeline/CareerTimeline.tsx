
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Briefcase, DollarSign, Building } from "lucide-react";

// Sample data for the timeline
const timelineData = {
  "5years": [
    {
      year: "Year 1",
      role: "Junior Developer",
      salary: 60000,
      responsibilities: ["Basic coding tasks", "Bug fixes", "Testing"],
      companyType: "Small startup",
      growthScore: 40
    },
    {
      year: "Year 2",
      role: "Developer",
      salary: 68000,
      responsibilities: ["Feature development", "Code reviews", "Technical documentation"],
      companyType: "Small startup",
      growthScore: 55
    },
    {
      year: "Year 3",
      role: "Mid-level Developer",
      salary: 75000,
      responsibilities: ["Complex features", "Mentoring juniors", "Architecture decisions"],
      companyType: "Mid-sized company",
      growthScore: 65
    },
    {
      year: "Year 4",
      role: "Senior Developer",
      salary: 88000,
      responsibilities: ["System design", "Team leadership", "Project planning"],
      companyType: "Mid-sized company",
      growthScore: 75
    },
    {
      year: "Year 5",
      role: "Senior Developer II",
      salary: 95000,
      responsibilities: ["Technical leadership", "Architecture planning", "Cross-team collaboration"],
      companyType: "Large corporation",
      growthScore: 85
    }
  ],
  "10years": [
    {
      year: "Year 1",
      role: "Junior Developer",
      salary: 60000,
      responsibilities: ["Basic coding tasks", "Bug fixes", "Testing"],
      companyType: "Small startup",
      growthScore: 40
    },
    {
      year: "Year 3",
      role: "Mid-level Developer",
      salary: 75000,
      responsibilities: ["Complex features", "Mentoring juniors", "Architecture decisions"],
      companyType: "Mid-sized company",
      growthScore: 65
    },
    {
      year: "Year 5",
      role: "Senior Developer",
      salary: 95000,
      responsibilities: ["Technical leadership", "Architecture planning", "Cross-team collaboration"],
      companyType: "Large corporation",
      growthScore: 85
    },
    {
      year: "Year 7",
      role: "Lead Developer",
      salary: 120000,
      responsibilities: ["Team management", "Strategic planning", "Technical direction"],
      companyType: "Large corporation",
      growthScore: 90
    },
    {
      year: "Year 10",
      role: "Engineering Manager",
      salary: 150000,
      responsibilities: ["Department leadership", "Budget management", "Strategic planning"],
      companyType: "FAANG",
      growthScore: 95
    }
  ],
  "15years": [
    {
      year: "Year 1",
      role: "Junior Developer",
      salary: 60000,
      responsibilities: ["Basic coding tasks", "Bug fixes", "Testing"],
      companyType: "Small startup",
      growthScore: 40
    },
    {
      year: "Year 3",
      role: "Mid-level Developer",
      salary: 75000,
      responsibilities: ["Complex features", "Mentoring juniors", "Architecture decisions"],
      companyType: "Mid-sized company",
      growthScore: 65
    },
    {
      year: "Year 5",
      role: "Senior Developer",
      salary: 95000,
      responsibilities: ["Technical leadership", "Architecture planning", "Cross-team collaboration"],
      companyType: "Large corporation",
      growthScore: 85
    },
    {
      year: "Year 8",
      role: "Lead Developer",
      salary: 120000,
      responsibilities: ["Team management", "Strategic planning", "Technical direction"],
      companyType: "Large corporation",
      growthScore: 90
    },
    {
      year: "Year 10",
      role: "Engineering Manager",
      salary: 150000,
      responsibilities: ["Department leadership", "Budget management", "Strategic planning"],
      companyType: "FAANG",
      growthScore: 95
    },
    {
      year: "Year 15",
      role: "CTO",
      salary: 200000,
      responsibilities: ["Company strategy", "Technology visioning", "Executive leadership"],
      companyType: "FAANG or own startup",
      growthScore: 99
    }
  ]
};

// Getting data for charts
const getChartData = (timeframe: string) => {
  return timelineData[timeframe as keyof typeof timelineData].map(item => ({
    name: item.year,
    salary: item.salary,
    growth: item.growthScore
  }));
};

const CareerTimeline = () => {
  const [timeframe, setTimeframe] = useState("5years");
  const [selectedYear, setSelectedYear] = useState(timelineData["5years"][0]);
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    setSelectedYear(timelineData[value as keyof typeof timelineData][0]);
  };
  
  const handleYearClick = (entry: any) => {
    const yearData = timelineData[timeframe as keyof typeof timelineData].find(
      item => item.year === entry.name
    );
    if (yearData) {
      setSelectedYear(yearData);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Career Timeline</h1>
          <p className="text-muted-foreground">
            See your likely career path, year by year
          </p>
        </div>
        <Tabs 
          value={timeframe} 
          onValueChange={handleTimeframeChange}
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="5years">5 Years</TabsTrigger>
            <TabsTrigger value="10years">10 Years</TabsTrigger>
            <TabsTrigger value="15years">15 Years</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-2 border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle>Salary & Career Growth</CardTitle>
            <CardDescription>Click on any point to see details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData(timeframe)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  onClick={handleYearClick}
                >
                  <defs>
                    <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `$${value / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="salary"
                    name="Salary"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorSalary)"
                    activeDot={{ r: 6, onClick: (_, event) => handleYearClick(event.payload) }}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="growth"
                    name="Career Growth"
                    stroke="#0D9488"
                    fillOpacity={1}
                    fill="url(#colorGrowth)"
                    activeDot={{ r: 6, onClick: (_, event) => handleYearClick(event.payload) }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>{selectedYear.year} Details</CardTitle>
              <Badge variant="outline" className="bg-career-light text-career-DEFAULT">
                {selectedYear.companyType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{selectedYear.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Salary</p>
                <p className="font-medium">
                  ${selectedYear.salary.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT">
                <Building size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Likely Company Type</p>
                <p className="font-medium">{selectedYear.companyType}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">Key Responsibilities</p>
              <ul className="space-y-1">
                {selectedYear.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-career-DEFAULT"></div>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="bg-career-DEFAULT hover:bg-career-dark">
          <Calendar className="mr-2 h-4 w-4" />
          Export Timeline
        </Button>
        <Button variant="outline">
          Adjust Career Parameters
        </Button>
      </div>
    </div>
  );
};

export default CareerTimeline;
