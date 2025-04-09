
import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Book, BookOpen } from "lucide-react";

// Sample skills data
const skillsData = [
  { subject: 'JavaScript', current: 70, required: 90 },
  { subject: 'React', current: 65, required: 85 },
  { subject: 'Node.js', current: 50, required: 75 },
  { subject: 'SQL', current: 60, required: 70 },
  { subject: 'System Design', current: 40, required: 80 },
  { subject: 'Testing', current: 45, required: 65 },
];

// Sample courses data
const coursesData = [
  {
    id: 1,
    title: "Advanced React Patterns",
    provider: "Udemy",
    duration: "20 hours",
    difficulty: "Intermediate",
    link: "#",
    category: "technical"
  },
  {
    id: 2,
    title: "System Design for Senior Engineers",
    provider: "Coursera",
    duration: "40 hours",
    difficulty: "Advanced",
    link: "#",
    category: "technical"
  },
  {
    id: 3,
    title: "Node.js Performance Optimization",
    provider: "Frontend Masters",
    duration: "12 hours",
    difficulty: "Intermediate",
    link: "#",
    category: "technical"
  },
  {
    id: 4,
    title: "SQL Mastery",
    provider: "Pluralsight",
    duration: "15 hours",
    difficulty: "Intermediate",
    link: "#",
    category: "technical"
  },
  {
    id: 5,
    title: "Technical Leadership 101",
    provider: "LinkedIn Learning",
    duration: "8 hours",
    difficulty: "Intermediate",
    link: "#",
    category: "soft"
  },
  {
    id: 6,
    title: "Communication for Engineers",
    provider: "Coursera",
    duration: "10 hours",
    difficulty: "Beginner",
    link: "#",
    category: "soft"
  }
];

// Sample books data
const booksData = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "technical"
  },
  {
    id: 2,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "technical"
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    category: "technical"
  },
  {
    id: 4,
    title: "Soft Skills: The Software Developer's Life Manual",
    author: "John Sonmez",
    category: "soft"
  }
];

const SkillGapAnalysis = () => {
  const [resourceTab, setResourceTab] = useState("courses");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const filteredCourses = coursesData.filter(course => 
    categoryFilter === "all" ? true : course.category === categoryFilter
  );
  
  const filteredBooks = booksData.filter(book =>
    categoryFilter === "all" ? true : book.category === categoryFilter
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Skill Gap Analysis</h1>
        <p className="text-muted-foreground">
          Compare your current skills with what you'll need for your career goals
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-2 border-gray-100">
          <CardHeader>
            <CardTitle>Skills Comparison</CardTitle>
            <CardDescription>
              See how your current skills compare to what's required for your target role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Your Skills"
                    dataKey="current"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Required Skills"
                    dataKey="required"
                    stroke="#0D9488"
                    fill="#0D9488"
                    fillOpacity={0.4}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-career-DEFAULT hover:bg-career-dark">
              Refresh Skills Assessment
            </Button>
            <Button variant="outline">
              Edit My Skills
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle>Key Areas to Improve</CardTitle>
            <CardDescription>Focus on these skills for fastest growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsData
                .sort((a, b) => (b.required - b.current) - (a.required - a.current))
                .slice(0, 4)
                .map((skill, index) => {
                  const gap = skill.required - skill.current;
                  let priorityColor;
                  
                  if (gap > 30) priorityColor = "bg-red-100 text-red-800";
                  else if (gap > 15) priorityColor = "bg-yellow-100 text-yellow-800";
                  else priorityColor = "bg-green-100 text-green-800";
                  
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{skill.subject}</h3>
                        <Badge className={priorityColor}>
                          {gap > 30 ? "High Priority" : gap > 15 ? "Medium Priority" : "Low Priority"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Current: {skill.current}%</span>
                        <span>Required: {skill.required}%</span>
                        <span>Gap: {gap}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-2 bg-career-DEFAULT rounded-full"
                          style={{width: `${skill.current}%`}}
                        />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Recommended Resources</CardTitle>
              <CardDescription>
                Courses, books and other materials to help close your skill gap
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={categoryFilter === "all" ? "default" : "outline"}
                onClick={() => setCategoryFilter("all")}
                className={categoryFilter === "all" ? "bg-career-DEFAULT" : ""}
              >
                All
              </Button>
              <Button 
                variant={categoryFilter === "technical" ? "default" : "outline"}
                onClick={() => setCategoryFilter("technical")}
                className={categoryFilter === "technical" ? "bg-career-DEFAULT" : ""}
              >
                Technical
              </Button>
              <Button 
                variant={categoryFilter === "soft" ? "default" : "outline"}
                onClick={() => setCategoryFilter("soft")}
                className={categoryFilter === "soft" ? "bg-career-DEFAULT" : ""}
              >
                Soft Skills
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={resourceTab} onValueChange={setResourceTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT">
                        <GraduationCap size={20} />
                      </div>
                      <Badge variant="outline">{course.difficulty}</Badge>
                    </div>
                    <h3 className="font-medium mt-2">{course.title}</h3>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {course.provider} • {course.duration}
                    </div>
                    <Button className="w-full mt-4 bg-career-DEFAULT hover:bg-career-dark">
                      View Course
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="books" className="mt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT">
                        <Book size={20} />
                      </div>
                      <Badge variant="outline">Book</Badge>
                    </div>
                    <h3 className="font-medium mt-2">{book.title}</h3>
                    <div className="mt-1 text-sm text-muted-foreground">
                      by {book.author}
                    </div>
                    <Button className="w-full mt-4 bg-career-DEFAULT hover:bg-career-dark">
                      Find Book
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillGapAnalysis;
