
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  BarChart3,
  Book,
  Calendar,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("timeline");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };
  
  const navItems = [
    {
      name: "Career Timeline",
      path: "/dashboard",
      icon: Calendar,
      id: "timeline"
    },
    {
      name: "Skill Gap Analysis",
      path: "/skill-gap",
      icon: BarChart3,
      id: "skills"
    },
    {
      name: "Career Swap",
      path: "/career-swap",
      icon: Briefcase,
      id: "swap"
    },
    {
      name: "Day in Life",
      path: "/day-in-life",
      icon: Book,
      id: "day"
    },
    {
      name: "Career Coach",
      path: "/career-coach",
      icon: MessageSquare,
      id: "coach"
    }
  ];
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white shadow-sm">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-career-DEFAULT">CareerSim</h1>
        </div>
        
        <div className="flex flex-col flex-grow p-4 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "justify-start",
                activeItem === item.id
                  ? "bg-career-light text-career-DEFAULT font-medium"
                  : "text-gray-600"
              )}
              onClick={() => {
                setActiveItem(item.id);
                navigate(item.path);
              }}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-career-light flex items-center justify-center text-career-DEFAULT mr-3">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">Demo User</p>
              <p className="text-xs text-gray-500">demo@example.com</p>
            </div>
          </div>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="justify-start w-full text-gray-600"
              onClick={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-gray-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-career-DEFAULT">CareerSim</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black/50">
          <div className="bg-white w-2/3 h-screen shadow-lg animate-fade-in">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold text-career-DEFAULT">Menu</h1>
            </div>
            
            <div className="flex flex-col p-4 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "justify-start",
                    activeItem === item.id
                      ? "bg-career-light text-career-DEFAULT font-medium"
                      : "text-gray-600"
                  )}
                  onClick={() => {
                    setActiveItem(item.id);
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Button>
              ))}
            </div>
            
            <div className="p-4 border-t mt-auto">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-career-light flex items-center justify-center text-career-DEFAULT mr-3">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-medium">Demo User</p>
                  <p className="text-xs text-gray-500">demo@example.com</p>
                </div>
              </div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="justify-start w-full text-gray-600"
                  onClick={() => {
                    navigate("/settings");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start w-full text-gray-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow pt-4 md:pt-0">
        <div className="h-16 md:h-0" />
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
