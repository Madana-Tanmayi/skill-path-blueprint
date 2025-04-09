
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DomainSelection from "@/components/interests/DomainSelection";
import SkillsSelection from "@/components/interests/SkillsSelection";
import WorkplacePreferenceSelection from "@/components/interests/WorkplacePreferenceSelection";
import SalaryExpectationSelection from "@/components/interests/SalaryExpectationSelection";
import PositionSelection from "@/components/interests/PositionSelection";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";

type FormStep = "domain" | "skills" | "workplace" | "salary" | "position";

const Interests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<FormStep>("domain");
  const [formData, setFormData] = useState({
    domain: "",
    skills: "",
    workplacePreference: "hybrid",
    salaryExpectation: 60000,
    desiredPosition: "",
  });
  
  const steps: FormStep[] = ["domain", "skills", "workplace", "salary", "position"];
  const currentStepIndex = steps.indexOf(currentStep);
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // Store user preferences in localStorage
    localStorage.setItem("userInterests", JSON.stringify(formData));

    // Show success toast
    toast({
      title: "Preferences saved",
      description: "We've saved your career preferences",
    });

    // Redirect to dashboard
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case "domain":
        return (
          <DomainSelection 
            value={formData.domain} 
            onChange={(value) => updateFormData("domain", value)} 
          />
        );
      case "skills":
        return (
          <SkillsSelection 
            value={formData.skills} 
            onChange={(value) => updateFormData("skills", value)} 
          />
        );
      case "workplace":
        return (
          <WorkplacePreferenceSelection 
            value={formData.workplacePreference} 
            onChange={(value) => updateFormData("workplacePreference", value)} 
          />
        );
      case "salary":
        return (
          <SalaryExpectationSelection 
            value={formData.salaryExpectation} 
            onChange={(value) => updateFormData("salaryExpectation", value)} 
          />
        );
      case "position":
        return (
          <PositionSelection 
            value={formData.desiredPosition} 
            onChange={(value) => updateFormData("desiredPosition", value)} 
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 p-4">
      <Card className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          {steps.map((step, index) => (
            <div 
              key={step} 
              className="flex flex-col items-center mx-2"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index === currentStepIndex 
                    ? "bg-primary text-primary-foreground" 
                    : index < currentStepIndex 
                      ? "bg-primary/20 text-primary" 
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <div className="text-xs mt-1 text-gray-500 hidden md:block">
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </div>
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-8">
          {!isFirstStep && (
            <Button 
              onClick={prevStep} 
              variant="outline"
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          {isFirstStep && <div></div>}
          
          {!isLastStep ? (
            <Button 
              onClick={nextStep} 
              className="flex items-center"
              disabled={
                (currentStep === "domain" && !formData.domain) ||
                (currentStep === "skills" && !formData.skills) ||
                (currentStep === "position" && !formData.desiredPosition)
              }
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="bg-green-600 hover:bg-green-700"
              disabled={!formData.desiredPosition}
            >
              Complete
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Interests;
