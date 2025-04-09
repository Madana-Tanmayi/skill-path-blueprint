
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CareerTimeline from "@/components/timeline/CareerTimeline";
import { findMatchingCareerPaths } from "@/utils/similarityUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserInterests {
  domain: string;
  skills: string;
  workplacePreference: "remote" | "hybrid" | "onsite";
  salaryExpectation: number;
  desiredPosition: string;
}

interface CareerPathMatch {
  id: string;
  title: string;
  skills: string[];
  similarityScore: number;
  positions: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInterests, setUserInterests] = useState<UserInterests | null>(null);
  const [careerMatches, setCareerMatches] = useState<CareerPathMatch[]>([]);
  
  useEffect(() => {
    // Check if user has completed the interests form
    const interestsData = localStorage.getItem("userInterests");
    
    if (interestsData) {
      const parsedInterests = JSON.parse(interestsData);
      setUserInterests(parsedInterests);
      
      // Calculate career path matches
      const matches = findMatchingCareerPaths(parsedInterests);
      setCareerMatches(matches);
    } else {
      // Redirect to interests page if not completed
      navigate("/interests");
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      {userInterests && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Your Career Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Domain:</span>
                <p className="text-gray-800">{userInterests.domain}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Desired Position:</span>
                <p className="text-gray-800">{userInterests.desiredPosition}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Workplace Preference:</span>
                <p className="text-gray-800 capitalize">{userInterests.workplacePreference}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => navigate("/interests")}
            >
              Update Preferences
            </Button>
          </div>
          
          {careerMatches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recommended Career Path</CardTitle>
                  <CardDescription>
                    Based on your interests and skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">{careerMatches[0].title}</h3>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-500">Key Skills:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {careerMatches[0].skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-500">Potential Positions:</h4>
                    <ul className="list-disc list-inside text-sm mt-1">
                      {careerMatches[0].positions.map((position, index) => (
                        <li key={index}>{position}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-500">Match Score:</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.round(careerMatches[0].similarityScore * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1">
                      {Math.round(careerMatches[0].similarityScore * 100)}% match
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Alternative Career Path</CardTitle>
                  <CardDescription>
                    Another option that matches your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {careerMatches.length > 1 ? (
                    <>
                      <h3 className="text-lg font-semibold">{careerMatches[1].title}</h3>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-500">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {careerMatches[1].skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-500">Potential Positions:</h4>
                        <ul className="list-disc list-inside text-sm mt-1">
                          {careerMatches[1].positions.map((position, index) => (
                            <li key={index}>{position}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-500">Match Score:</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${Math.round(careerMatches[1].similarityScore * 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right mt-1">
                          {Math.round(careerMatches[1].similarityScore * 100)}% match
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">No alternative career path found</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          
          <h2 className="text-2xl font-bold mt-6 mb-4">Your Career Timeline</h2>
          <CareerTimeline />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
