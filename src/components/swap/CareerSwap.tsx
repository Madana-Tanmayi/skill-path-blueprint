
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Career options
const careerOptions = [
  { value: "developer", label: "Software Developer" },
  { value: "designer", label: "UX Designer" },
  { value: "manager", label: "Product Manager" },
  { value: "data", label: "Data Scientist" },
  { value: "devops", label: "DevOps Engineer" },
];

// Sample data for different career paths
const careerData = {
  developer: {
    salaryData: [
      { year: "Year 1", current: 60000, swapped: 0 },
      { year: "Year 3", current: 80000, swapped: 0 },
      { year: "Year 5", current: 110000, swapped: 0 },
      { year: "Year 7", current: 140000, swapped: 0 },
      { year: "Year 10", current: 170000, swapped: 0 },
    ],
    skills: ["JavaScript", "React", "Node.js", "SQL", "System Design", "API Development"],
    outlook: "High demand, 22% growth expected through 2029",
    timeToSenior: "4-5 years",
  },
  designer: {
    salaryData: [
      { year: "Year 1", current: 0, swapped: 55000 },
      { year: "Year 3", current: 0, swapped: 75000 },
      { year: "Year 5", current: 0, swapped: 95000 },
      { year: "Year 7", current: 0, swapped: 120000 },
      { year: "Year 10", current: 0, swapped: 145000 },
    ],
    skills: ["UI Design", "User Research", "Prototyping", "Design Systems", "Figma", "Visual Design"],
    outlook: "Growing demand, 15% growth expected through 2029",
    timeToSenior: "3-4 years",
  },
  manager: {
    salaryData: [
      { year: "Year 1", current: 0, swapped: 70000 },
      { year: "Year 3", current: 0, swapped: 95000 },
      { year: "Year 5", current: 0, swapped: 120000 },
      { year: "Year 7", current: 0, swapped: 150000 },
      { year: "Year 10", current: 0, swapped: 190000 },
    ],
    skills: ["Product Strategy", "User Stories", "Roadmapping", "Stakeholder Management", "Analytics", "A/B Testing"],
    outlook: "Competitive field, 10% growth expected through 2029",
    timeToSenior: "5-6 years",
  },
  data: {
    salaryData: [
      { year: "Year 1", current: 0, swapped: 65000 },
      { year: "Year 3", current: 0, swapped: 90000 },
      { year: "Year 5", current: 0, swapped: 115000 },
      { year: "Year 7", current: 0, swapped: 140000 },
      { year: "Year 10", current: 0, swapped: 175000 },
    ],
    skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization", "Big Data"],
    outlook: "Very high demand, 28% growth expected through 2029",
    timeToSenior: "3-5 years",
  },
  devops: {
    salaryData: [
      { year: "Year 1", current: 0, swapped: 70000 },
      { year: "Year 3", current: 0, swapped: 95000 },
      { year: "Year 5", current: 0, swapped: 125000 },
      { year: "Year 7", current: 0, swapped: 150000 },
      { year: "Year 10", current: 0, swapped: 180000 },
    ],
    skills: ["CI/CD", "Cloud Services", "Container Orchestration", "Infrastructure as Code", "Linux", "Monitoring"],
    outlook: "High demand, 15% growth expected through 2029",
    timeToSenior: "4-5 years",
  },
};

const CareerSwap = () => {
  const [selectedCareer, setSelectedCareer] = useState("designer");
  const currentCareer = "developer"; // Assuming current career is developer
  
  // Generate combined data for chart
  const generateChartData = () => {
    return careerData[currentCareer as keyof typeof careerData].salaryData.map((item, index) => {
      const swappedData = careerData[selectedCareer as keyof typeof careerData].salaryData[index];
      return {
        ...item,
        swapped: swappedData.swapped
      };
    });
  };
  
  const chartData = generateChartData();
  
  // Get comparison data
  const getCurrentCareerDetails = () => careerData[currentCareer as keyof typeof careerData];
  const getSwappedCareerDetails = () => careerData[selectedCareer as keyof typeof careerData];
  
  const currentCareerDetails = getCurrentCareerDetails();
  const swappedCareerDetails = getSwappedCareerDetails();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Career Swap Simulator</h1>
        <p className="text-muted-foreground">
          Compare your current path with an alternative career
        </p>
      </div>
      
      <Card className="border-2 border-gray-100">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Compare Careers</CardTitle>
              <CardDescription>
                See how your career trajectory would change with a different path
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="font-medium text-sm text-muted-foreground">
                Current: Software Developer
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={selectedCareer} 
                onValueChange={setSelectedCareer}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select career" />
                </SelectTrigger>
                <SelectContent>
                  {careerOptions.map((option) => (
                    option.value !== currentCareer && (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    )
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" className="bg-career-DEFAULT hover:bg-career-dark">
                <RefreshCw className="h-4 w-4 mr-2" />
                Simulate
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  name="Software Developer"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="swapped"
                  name={careerOptions.find(o => o.value === selectedCareer)?.label}
                  stroke="#0D9488"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="border rounded-lg p-4 bg-blue-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-career-DEFAULT">Software Developer</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  Current Career
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Salary After 10 Years</p>
                  <p className="font-medium text-lg">${currentCareerDetails.salaryData[4].current.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time to Senior Level</p>
                  <p className="font-medium">{currentCareerDetails.timeToSenior}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Outlook</p>
                  <p className="font-medium">{currentCareerDetails.outlook}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Key Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentCareerDetails.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-teal-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-career-teal">
                  {careerOptions.find(o => o.value === selectedCareer)?.label}
                </h3>
                <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-200">
                  Alternative Path
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Salary After 10 Years</p>
                  <p className="font-medium text-lg">${swappedCareerDetails.salaryData[4].swapped.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time to Senior Level</p>
                  <p className="font-medium">{swappedCareerDetails.timeToSenior}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Outlook</p>
                  <p className="font-medium">{swappedCareerDetails.outlook}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Key Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {swappedCareerDetails.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-teal-100 text-teal-800 border-teal-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Career Swap Analysis</h3>
            <p className="text-sm text-gray-600">
              {selectedCareer === "designer" && (
                "Switching from Software Development to UX Design would leverage your technical knowledge while requiring new design skills. Initial salary might decrease slightly, but long-term growth potential is similar. The transition would take approximately 1-2 years of focused learning and portfolio building."
              )}
              {selectedCareer === "manager" && (
                "Moving to Product Management from development is a natural progression for developers who enjoy working with both business and technical teams. While the early career salary is higher, the technical ceiling might be lower in the very long term. This path typically requires strong communication skills and business acumen."
              )}
              {selectedCareer === "data" && (
                "Transitioning to Data Science would build upon your programming skills while requiring new expertise in statistics and machine learning. The career offers similar compensation to software development with potentially more specialized work. This change would require approximately 1 year of focused study."
              )}
              {selectedCareer === "devops" && (
                "Shifting to DevOps Engineering would be a fairly smooth transition from software development, utilizing your existing coding skills while learning infrastructure and automation. Salary trajectories are similar, with DevOps often commanding slightly higher early-career salaries but potentially less growth at the very senior levels."
              )}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="bg-career-DEFAULT hover:bg-career-dark">
          Save This Comparison
        </Button>
        <Button variant="outline">
          Detailed Transition Plan
        </Button>
      </div>
    </div>
  );
};

export default CareerSwap;
