
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface SalaryExpectationSelectionProps {
  value: number;
  onChange: (value: number) => void;
}

const SalaryExpectationSelection = ({ value, onChange }: SalaryExpectationSelectionProps) => {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };
  
  // Calculate relevant salary ranges for UI feedback
  const getSalaryCategory = (amount: number) => {
    if (amount < 40000) return { label: "Entry Level", color: "bg-blue-500" };
    if (amount < 80000) return { label: "Mid Level", color: "bg-green-500" };
    if (amount < 130000) return { label: "Senior Level", color: "bg-purple-500" };
    return { label: "Executive Level", color: "bg-orange-500" };
  };
  
  const salaryCategory = getSalaryCategory(value);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">What's your salary expectation?</h2>
      <p className="text-gray-600 text-center mb-8">
        This helps us match you with appropriate career paths
      </p>
      
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-primary mb-2">
            ${value.toLocaleString()}
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${salaryCategory.color}`}>
            {salaryCategory.label}
          </span>
        </div>
        
        <div className="px-6">
          <Slider
            min={20000}
            max={200000}
            step={5000}
            value={[value]}
            onValueChange={handleSliderChange}
          />
          
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>$20K</span>
            <span>$200K+</span>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>The average salary for your selected interests is approximately <b>$80,000</b></p>
        </div>
      </div>
    </div>
  );
};

export default SalaryExpectationSelection;
