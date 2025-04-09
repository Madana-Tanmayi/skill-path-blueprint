
import { useState } from "react";

interface DomainOption {
  name: string;
  color: string;
}

interface DomainSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

const domainOptions: DomainOption[] = [
  { name: "Web Development", color: "bg-blue-100 border-blue-300 hover:bg-blue-200" },
  { name: "Data Science", color: "bg-purple-100 border-purple-300 hover:bg-purple-200" },
  { name: "UI/UX Design", color: "bg-pink-100 border-pink-300 hover:bg-pink-200" },
  { name: "Mobile Development", color: "bg-green-100 border-green-300 hover:bg-green-200" },
  { name: "DevOps", color: "bg-orange-100 border-orange-300 hover:bg-orange-200" },
  { name: "Cybersecurity", color: "bg-red-100 border-red-300 hover:bg-red-200" },
  { name: "Product Management", color: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200" },
  { name: "Artificial Intelligence", color: "bg-indigo-100 border-indigo-300 hover:bg-indigo-200" },
  { name: "Cloud Computing", color: "bg-sky-100 border-sky-300 hover:bg-sky-200" },
  { name: "Marketing", color: "bg-emerald-100 border-emerald-300 hover:bg-emerald-200" },
  { name: "Business Analysis", color: "bg-slate-100 border-slate-300 hover:bg-slate-200" },
  { name: "Other", color: "bg-gray-100 border-gray-300 hover:bg-gray-200" },
];

const DomainSelection = ({ value, onChange }: DomainSelectionProps) => {
  const [customDomain, setCustomDomain] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === "Other") {
      setIsCustom(true);
      onChange(customDomain);
    } else {
      setIsCustom(false);
      onChange(option);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDomain(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">What is your domain of interest?</h2>
      <p className="text-gray-600 text-center mb-6">
        Select the primary field you're interested in pursuing
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {domainOptions.map((option) => (
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
          <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 mb-1">
            Specify your domain:
          </label>
          <input
            type="text"
            id="customDomain"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={customDomain}
            onChange={handleCustomChange}
            placeholder="e.g. Quantum Computing"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default DomainSelection;
