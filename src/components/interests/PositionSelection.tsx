
import { useState } from "react";

interface PositionOption {
  name: string;
  color: string;
}

interface PositionSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

const positionOptions: PositionOption[] = [
  { name: "Junior Developer", color: "bg-blue-100 border-blue-300 hover:bg-blue-200" },
  { name: "Frontend Developer", color: "bg-purple-100 border-purple-300 hover:bg-purple-200" },
  { name: "Backend Developer", color: "bg-green-100 border-green-300 hover:bg-green-200" },
  { name: "Full Stack Developer", color: "bg-indigo-100 border-indigo-300 hover:bg-indigo-200" },
  { name: "UI/UX Designer", color: "bg-pink-100 border-pink-300 hover:bg-pink-200" },
  { name: "Data Scientist", color: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200" },
  { name: "Data Analyst", color: "bg-amber-100 border-amber-300 hover:bg-amber-200" },
  { name: "Product Manager", color: "bg-red-100 border-red-300 hover:bg-red-200" },
  { name: "DevOps Engineer", color: "bg-orange-100 border-orange-300 hover:bg-orange-200" },
  { name: "System Architect", color: "bg-emerald-100 border-emerald-300 hover:bg-emerald-200" },
  { name: "Project Manager", color: "bg-sky-100 border-sky-300 hover:bg-sky-200" },
  { name: "Other", color: "bg-gray-100 border-gray-300 hover:bg-gray-200" },
];

const PositionSelection = ({ value, onChange }: PositionSelectionProps) => {
  const [customPosition, setCustomPosition] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === "Other") {
      setIsCustom(true);
      onChange(customPosition);
    } else {
      setIsCustom(false);
      onChange(option);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPosition(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">What position are you aiming for?</h2>
      <p className="text-gray-600 text-center mb-6">
        Select your desired job title or position
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {positionOptions.map((option) => (
          <div
            key={option.name}
            className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 cursor-pointer ${
              value === option.name
                ? "border-primary bg-primary/10"
                : `${option.color} border-opacity-50`
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <p className="font-medium text-center">{option.name}</p>
          </div>
        ))}
      </div>

      {isCustom && (
        <div className="mt-4">
          <label htmlFor="customPosition" className="block text-sm font-medium text-gray-700 mb-1">
            Specify your desired position:
          </label>
          <input
            type="text"
            id="customPosition"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={customPosition}
            onChange={handleCustomChange}
            placeholder="e.g. Machine Learning Engineer"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default PositionSelection;
