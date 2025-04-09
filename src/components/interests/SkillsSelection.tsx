
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";

interface SkillsSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

const suggestedSkills = [
  "JavaScript", "Python", "React", "SQL", "Data Analysis", 
  "Communication", "Project Management", "UI Design", "Java", 
  "TypeScript", "Node.js", "AWS", "Docker", "Marketing", 
  "Leadership", "Problem Solving"
];

const SkillsSelection = ({ value, onChange }: SkillsSelectionProps) => {
  const [newSkill, setNewSkill] = useState("");
  
  const skillsArray = value ? value.split(",").map(s => s.trim()).filter(Boolean) : [];
  
  const addSkill = (skill: string) => {
    if (skill && !skillsArray.includes(skill)) {
      const newSkillsArray = [...skillsArray, skill];
      onChange(newSkillsArray.join(", "));
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    const newSkillsArray = skillsArray.filter(skill => skill !== skillToRemove);
    onChange(newSkillsArray.join(", "));
  };
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill) {
      e.preventDefault();
      addSkill(newSkill);
      setNewSkill("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">What skills do you have?</h2>
      <p className="text-gray-600 text-center mb-6">
        Select existing skills or add your own
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {skillsArray.map((skill) => (
          <div 
            key={skill} 
            className="bg-blue-100 text-blue-800 pl-3 pr-2 py-1 rounded-full flex items-center text-sm"
          >
            {skill}
            <button 
              onClick={() => removeSkill(skill)} 
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              <XCircle size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Type a skill and press Enter..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <Button 
          onClick={() => {
            if (newSkill) {
              addSkill(newSkill);
              setNewSkill("");
            }
          }}
          variant="outline"
          size="icon"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Skills</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              disabled={skillsArray.includes(skill)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                skillsArray.includes(skill)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSelection;
