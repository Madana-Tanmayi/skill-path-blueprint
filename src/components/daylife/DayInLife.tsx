
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlarmClock, Coffee, Users, Code, Monitor, BookOpen, Home } from "lucide-react";

// Sample day in life data
const dayInLifeData = {
  "junior": {
    title: "Junior Developer",
    timeline: [
      {
        time: "8:30 AM",
        activity: "Arrive at office, check emails and Slack messages",
        icon: Coffee,
        details: "Start the day by catching up on messages that came in overnight."
      },
      {
        time: "9:00 AM",
        activity: "Daily stand-up meeting with the team",
        icon: Users,
        details: "Join the team's 15-minute meeting to discuss what you'll work on today, share any blockers, and hear what others are working on."
      },
      {
        time: "9:30 AM",
        activity: "Work on assigned tickets & bug fixes",
        icon: Code,
        details: "Focus on implementing small features and fixing bugs that have been assigned to you in the sprint."
      },
      {
        time: "12:00 PM",
        activity: "Lunch break with team members",
        icon: Coffee,
        details: "Head out with colleagues to a nearby restaurant or eat in the company cafe."
      },
      {
        time: "1:00 PM",
        activity: "Pair programming with senior developer",
        icon: Monitor,
        details: "Work alongside a more experienced developer who helps you understand the codebase better and teaches you best practices."
      },
      {
        time: "3:00 PM",
        activity: "Code review feedback implementation",
        icon: Code,
        details: "Address comments left on your pull request by other team members."
      },
      {
        time: "4:00 PM",
        activity: "Learning time - online course",
        icon: BookOpen,
        details: "Spend time on company-provided learning resources to improve your skills."
      },
      {
        time: "5:30 PM",
        activity: "Wrap up and head home",
        icon: Home,
        details: "Document your progress, plan for tomorrow, and log off for the day."
      }
    ]
  },
  "senior": {
    title: "Senior Developer",
    timeline: [
      {
        time: "8:00 AM",
        activity: "Early start - planning and emails",
        icon: Coffee,
        details: "Get in before most of the team to plan your day and handle important communications."
      },
      {
        time: "9:00 AM",
        activity: "Lead daily stand-up meeting",
        icon: Users,
        details: "Facilitate the team's stand-up, help unblock team members, and align on priorities."
      },
      {
        time: "9:30 AM",
        activity: "Architecture planning & system design",
        icon: Monitor,
        details: "Work on high-level design decisions for new features or improvements to existing systems."
      },
      {
        time: "11:00 AM",
        activity: "Meeting with Product Managers",
        icon: Users,
        details: "Discuss technical feasibility of upcoming features and provide time estimates."
      },
      {
        time: "12:30 PM",
        activity: "Lunch and mentoring session",
        icon: Coffee,
        details: "Have lunch with junior team members, answering their questions and providing guidance."
      },
      {
        time: "1:30 PM",
        activity: "Complex feature implementation",
        icon: Code,
        details: "Work on challenging technical problems that require your expertise."
      },
      {
        time: "3:30 PM",
        activity: "Code reviews for team PRs",
        icon: Code,
        details: "Review and provide feedback on code from multiple team members."
      },
      {
        time: "4:30 PM",
        activity: "Technical documentation & knowledge sharing",
        icon: BookOpen,
        details: "Document architectural decisions and create resources to help the team."
      },
      {
        time: "6:00 PM",
        activity: "End of day - wrap up and planning",
        icon: Home,
        details: "Finish up, check on team progress, and plan for tomorrow before heading home."
      }
    ]
  },
  "manager": {
    title: "Engineering Manager",
    timeline: [
      {
        time: "8:00 AM",
        activity: "Early start - review metrics & goals",
        icon: Monitor,
        details: "Begin the day by reviewing team performance metrics and progress toward quarterly goals."
      },
      {
        time: "9:00 AM",
        activity: "Attend leadership stand-up",
        icon: Users,
        details: "Sync with other managers and directors on cross-team initiatives and company priorities."
      },
      {
        time: "10:00 AM",
        activity: "1:1 meetings with team members",
        icon: Users,
        details: "Hold individual meetings with team members to discuss their progress, challenges, and career development."
      },
      {
        time: "12:00 PM",
        activity: "Lunch with other engineering managers",
        icon: Coffee,
        details: "Network with peers and discuss common challenges and strategies."
      },
      {
        time: "1:00 PM",
        activity: "Sprint planning & backlog grooming",
        icon: Monitor,
        details: "Work with product managers to prioritize upcoming work and ensure tickets are ready for the team."
      },
      {
        time: "2:30 PM",
        activity: "Resource planning & hiring",
        icon: Users,
        details: "Review team capacity, plan for future hiring needs, and conduct interviews with candidates."
      },
      {
        time: "4:00 PM",
        activity: "Strategic planning with product & design",
        icon: Monitor,
        details: "Collaborate with cross-functional partners on roadmap planning and feature specifications."
      },
      {
        time: "5:30 PM",
        activity: "End-of-day review & emails",
        icon: Home,
        details: "Check in on critical projects, handle important communications, and prepare for tomorrow."
      },
      {
        time: "7:00 PM",
        activity: "Occasional after-hours work",
        icon: Home,
        details: "Address any urgent issues that arise and catch up on strategic thinking when needed."
      }
    ]
  }
};

const DayInLife = () => {
  const [selectedRole, setSelectedRole] = useState("junior");
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(dayInLifeData.junior.timeline[0]);
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setSelectedTimelineItem(dayInLifeData[role as keyof typeof dayInLifeData].timeline[0]);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Day in the Life</h1>
        <p className="text-muted-foreground">
          Experience a typical day in different tech roles
        </p>
      </div>
      
      <Card className="border-2 border-gray-100">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Choose a Role</CardTitle>
              <CardDescription>
                See how professionals at different career stages spend their day
              </CardDescription>
            </div>
            
            <Tabs 
              value={selectedRole} 
              onValueChange={handleRoleChange}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full md:w-auto">
                <TabsTrigger value="junior">Junior Dev</TabsTrigger>
                <TabsTrigger value="senior">Senior Dev</TabsTrigger>
                <TabsTrigger value="manager">Eng Manager</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{dayInLifeData[selectedRole as keyof typeof dayInLifeData].title}</CardTitle>
                    <Badge variant="outline" className="bg-career-light text-career-DEFAULT">
                      Timeline
                    </Badge>
                  </div>
                  <CardDescription>
                    A typical workday for a {dayInLifeData[selectedRole as keyof typeof dayInLifeData].title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {dayInLifeData[selectedRole as keyof typeof dayInLifeData].timeline.map((item, index) => (
                      <div 
                        key={index} 
                        className={`relative flex items-start mb-6 cursor-pointer ${
                          selectedTimelineItem.time === item.time ? "opacity-100" : "opacity-70"
                        }`}
                        onClick={() => setSelectedTimelineItem(item)}
                      >
                        <div className={`w-11 h-11 rounded-full ${
                          selectedTimelineItem.time === item.time 
                            ? "bg-career-DEFAULT text-white"
                            : "bg-gray-100 text-gray-500"
                        } flex items-center justify-center text-sm font-medium mr-3 z-10`}>
                          <AlarmClock size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">{item.time}</div>
                          </div>
                          <p className={`text-sm ${
                            selectedTimelineItem.time === item.time ? "text-career-DEFAULT font-medium" : ""
                          }`}>
                            {item.activity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Activity Detail</CardTitle>
                    <Badge>{selectedTimelineItem.time}</Badge>
                  </div>
                  <CardDescription>
                    More information about this part of the day
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="p-4 bg-career-light rounded-lg mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-career-DEFAULT flex items-center justify-center text-white">
                      <selectedTimelineItem.icon size={20} />
                    </div>
                    <div className="font-medium">{selectedTimelineItem.activity}</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex-grow">
                    <h3 className="font-medium mb-2">Details</h3>
                    <p className="text-sm text-gray-600">
                      {selectedTimelineItem.details}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <p className="text-sm text-gray-500">
                      This information is based on interviews with real professionals in the field and represents a typical workday, though individual experiences may vary based on company, team, and project.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <Card className="border bg-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Key Differences Between Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg bg-white">
                    <h3 className="font-medium mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Junior Developer
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1 pl-4">
                      <li>• More time spent coding</li>
                      <li>• Regular guidance from seniors</li>
                      <li>• Focus on smaller features</li>
                      <li>• Dedicated learning time</li>
                      <li>• More predictable schedule</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-white">
                    <h3 className="font-medium mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Senior Developer
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1 pl-4">
                      <li>• Balance of coding and design</li>
                      <li>• Mentoring responsibilities</li>
                      <li>• Technical decision making</li>
                      <li>• More meetings with stakeholders</li>
                      <li>• Often works on critical systems</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-white">
                    <h3 className="font-medium mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      Engineering Manager
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1 pl-4">
                      <li>• Very meeting-heavy schedule</li>
                      <li>• Minimal to no coding</li>
                      <li>• Focus on people and processes</li>
                      <li>• Strategic planning</li>
                      <li>• Less predictable workday</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="bg-career-DEFAULT hover:bg-career-dark">
          Get Full Day Breakdown
        </Button>
        <Button variant="outline">
          Compare Work-Life Balance
        </Button>
      </div>
    </div>
  );
};

export default DayInLife;
