
import { useState } from "react";

interface WorkplaceOption {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface WorkplacePreferenceSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

const workplaceOptions: WorkplaceOption[] = [
  {
    value: "remote",
    label: "Remote",
    description: "Work from anywhere, fully remote",
    icon: "🏠"
  },
  {
    value: "hybrid",
    label: "Hybrid",
    description: "Mix of remote and office work",
    icon: "🔄"
  },
  {
    value: "onsite",
    label: "On-site",
    description: "Traditional office environment",
    icon: "🏢"
  }
];

const WorkplacePreferenceSelection = ({ value, onChange }: WorkplacePreferenceSelectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">What's your preferred work environment?</h2>
      <p className="text-gray-600 text-center mb-8">
        This helps us find roles that match your lifestyle preferences
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workplaceOptions.map((option) => (
          <div
            key={option.value}
            className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all cursor-pointer hover:scale-105 ${
              value === option.value
                ? "border-primary bg-primary/10 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="text-4xl mb-4">{option.icon}</div>
            <h3 className="text-lg font-medium">{option.label}</h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkplacePreferenceSelection;
