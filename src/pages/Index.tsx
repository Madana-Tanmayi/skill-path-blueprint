
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Calendar,
  BarChart3,
  ArrowRight,
  BookOpen,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      navigate("/dashboard");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-career-DEFAULT rounded-md flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-xl font-bold text-career-DEFAULT">CareerSim</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-career-DEFAULT">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-career-DEFAULT">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-career-DEFAULT">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button className="bg-career-DEFAULT hover:bg-career-dark" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
                Visualize Your <span className="text-career-DEFAULT">Future Career</span> Path
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                See your likely career progression year by year, analyze your skill gaps, 
                and explore alternative paths with our AI-powered simulator.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="bg-career-DEFAULT hover:bg-career-dark text-lg" size="lg" onClick={() => navigate("/register")}>
                  Start Your Journey <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
                  Try Demo
                </Button>
              </div>
            </div>
            
            <div className="p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/60 shadow-xl">
              <img 
                src="https://res.cloudinary.com/dkhpiib0e/image/upload/v1712745012/career-simulation-platform_bagrdm.svg" 
                alt="Career Simulation" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Powerful Career Planning Features</h2>
            <p className="text-lg text-gray-600 mt-2">
              Tools to help you visualize, plan, and optimize your career path
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Career Timeline</h3>
              <p className="text-gray-600 mb-4">
                See your likely path year by year, including projected roles, 
                responsibilities, and income ranges.
              </p>
              <Button variant="link" className="p-0 text-career-DEFAULT" onClick={() => navigate("/login")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Skill Gap Analysis</h3>
              <p className="text-gray-600 mb-4">
                Compare your current skills with what's needed for your target role and get 
                personalized learning recommendations.
              </p>
              <Button variant="link" className="p-0 text-career-DEFAULT" onClick={() => navigate("/login")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mb-4">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Career Swap Simulator</h3>
              <p className="text-gray-600 mb-4">
                Curious about a different career path? See how switching would affect 
                your trajectory and salary prospects.
              </p>
              <Button variant="link" className="p-0 text-career-DEFAULT" onClick={() => navigate("/login")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">"Day in the Life" Generator</h3>
              <p className="text-gray-600 mb-4">
                Experience what a typical day looks like for professionals in your 
                target role at different career stages.
              </p>
              <Button variant="link" className="p-0 text-career-DEFAULT" onClick={() => navigate("/login")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Career Coach Bot</h3>
              <p className="text-gray-600 mb-4">
                Get personalized advice and answers to your specific career 
                questions from our AI-powered career coach.
              </p>
              <Button variant="link" className="p-0 text-career-DEFAULT" onClick={() => navigate("/login")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 17 5.2 3.2-1.5-6L21 9.3l-6.2-.6L12 3 9.2 8.7 3 9.3l5.3 4.9-1.5 6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Famous Career Paths</h3>
              <p className="text-gray-600 mb-4">
                Compare your projected career path with those of famous professionals 
                in your field for inspiration.
              </p>
              <Button variant="link" className="p-0 text-career-DEFAULT" onClick={() => navigate("/login")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="text-lg text-gray-600 mt-2">
              Three simple steps to visualize your career future
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-career-DEFAULT text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Enter your current skills, education, experience, and career goals 
                to get started.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-career-DEFAULT text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Generate Your Timeline</h3>
              <p className="text-gray-600">
                Our AI engine analyzes your profile and creates a personalized 
                career projection based on real-world data.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-career-DEFAULT text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Explore & Optimize</h3>
              <p className="text-gray-600">
                Interact with your timeline, test different scenarios, and get 
                actionable recommendations to accelerate your growth.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-career-DEFAULT hover:bg-career-dark" size="lg" onClick={() => navigate("/register")}>
              Start Your Career Simulation
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Users Say</h2>
            <p className="text-lg text-gray-600 mt-2">
              Hear from professionals who've mapped their career journey with us
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Alex Johnson</h3>
                  <p className="text-sm text-gray-500">Junior Developer → Senior Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The career timeline was surprisingly accurate! It helped me see what skills 
                I needed to focus on to accelerate my growth. Two years later, I'm right on 
                track with the projection."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Sarah Liu</h3>
                  <p className="text-sm text-gray-500">Software Dev → Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was considering a switch to product management but was worried about the impact. 
                The career swap simulator showed me exactly what to expect and how to prepare. 
                The transition has been much smoother as a result."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-DEFAULT mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Mike Rodriguez</h3>
                  <p className="text-sm text-gray-500">Recent CS Graduate</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As someone just starting out, the skill gap analysis was eye-opening. 
                It helped me prioritize what to learn first and set realistic expectations 
                for my first few years in the industry."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-career-DEFAULT text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Map Your Career Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are using data-driven insights to 
            navigate their career paths more strategically.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-career-DEFAULT hover:bg-gray-100"
            onClick={() => navigate("/register")}
          >
            Create Your Free Account
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-career-DEFAULT font-bold text-xl">
                  C
                </div>
                <span className="text-xl font-bold text-white">CareerSim</span>
              </div>
              <p className="text-sm">
                AI-powered career simulation and planning platform to help you visualize 
                and optimize your professional journey.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Career Timeline</a></li>
                <li><a href="#" className="hover:text-white">Skill Gap Analysis</a></li>
                <li><a href="#" className="hover:text-white">Career Swap Simulator</a></li>
                <li><a href="#" className="hover:text-white">Day in Life Generator</a></li>
                <li><a href="#" className="hover:text-white">Career Coach Bot</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Data Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} CareerSim. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
