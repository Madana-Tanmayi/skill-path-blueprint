
/**
 * Calculate the cosine similarity between two vectors
 * @param vecA - First vector
 * @param vecB - Second vector
 * @returns The cosine similarity ranging from 0 to 1
 */
export const calculateCosineSimilarity = (vecA: number[], vecB: number[]): number => {
  // Check if vectors have the same length
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same length for cosine similarity calculation");
  }
  
  // Calculate dot product
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  
  // Calculate magnitudes
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  
  // Handle zero magnitudes to prevent division by zero
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  // Calculate cosine similarity
  return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Convert a text string of skills to a vector based on predefined skill categories
 * @param skillsText - Comma-separated string of skills
 * @param skillCategories - Map of skill categories to their representative skills
 * @returns A vector representation of the skills
 */
export const skillsToVector = (
  skillsText: string, 
  skillCategories: Record<string, string[]>
): number[] => {
  const userSkills = skillsText.toLowerCase().split(",").map(skill => skill.trim());
  
  // Create a vector with zeros for each category
  return Object.keys(skillCategories).map(category => {
    const categorySkills = skillCategories[category];
    // Count how many of the user's skills match this category
    const matchCount = userSkills.filter(skill => 
      categorySkills.some(catSkill => catSkill.toLowerCase().includes(skill) || 
                                    skill.includes(catSkill.toLowerCase()))
    ).length;
    
    // Return a value between 0 and 1 representing the match level
    return categorySkills.length > 0 ? matchCount / categorySkills.length : 0;
  });
};

/**
 * Career path data with required skills and attributes
 */
export const careerPaths = [
  {
    id: "web-dev",
    title: "Web Development",
    skills: ["JavaScript", "HTML", "CSS", "React", "Node.js", "TypeScript"],
    workplaceTypes: ["remote", "hybrid", "onsite"],
    salaryRange: { min: 60000, max: 150000 },
    positions: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
    vector: [0.9, 0.2, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8]  // Pre-computed vector
  },
  {
    id: "data-science",
    title: "Data Science",
    skills: ["Python", "R", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
    workplaceTypes: ["hybrid", "onsite"],
    salaryRange: { min: 70000, max: 180000 },
    positions: ["Data Scientist", "Data Analyst", "Machine Learning Engineer"],
    vector: [0.2, 0.9, 0.8, 0.2, 0.1, 0.1, 0.1, 0.1]  // Pre-computed vector
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
    workplaceTypes: ["remote", "hybrid"],
    salaryRange: { min: 55000, max: 140000 },
    positions: ["UI Designer", "UX Designer", "Product Designer"],
    vector: [0.3, 0.1, 0.1, 0.9, 0.7, 0.2, 0.1, 0.1]  // Pre-computed vector
  },
  {
    id: "devops",
    title: "DevOps Engineering",
    skills: ["Docker", "Kubernetes", "CI/CD", "Cloud Services", "Linux", "Shell Scripting"],
    workplaceTypes: ["remote", "hybrid", "onsite"],
    salaryRange: { min: 80000, max: 170000 },
    positions: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer"],
    vector: [0.2, 0.3, 0.2, 0.1, 0.8, 0.7, 0.9, 0.2]  // Pre-computed vector
  },
  {
    id: "product-management",
    title: "Product Management",
    skills: ["Product Strategy", "User Stories", "Agile", "Market Research", "Roadmapping"],
    workplaceTypes: ["hybrid", "onsite"],
    salaryRange: { min: 75000, max: 190000 },
    positions: ["Product Manager", "Product Owner", "Technical Product Manager"],
    vector: [0.1, 0.2, 0.3, 0.7, 0.2, 0.9, 0.3, 0.1]  // Pre-computed vector
  }
];

/**
 * Skill categories for vector transformation
 */
export const skillCategories = {
  "programming": ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go", "Ruby", "PHP"],
  "data": ["SQL", "NoSQL", "R", "Tableau", "Power BI", "Excel", "Statistics", "Data Mining"],
  "design": ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "UI", "UX", "Wireframing"],
  "business": ["Project Management", "Agile", "Scrum", "Marketing", "Sales", "Strategy", "Analysis"],
  "devops": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Linux", "Git"],
  "management": ["Leadership", "Team Management", "Product Management", "Roadmapping", "Stakeholder"],
  "soft_skills": ["Communication", "Presentation", "Teamwork", "Problem-solving", "Time Management"],
  "mobile": ["React Native", "Flutter", "Swift", "Kotlin", "Android", "iOS", "Mobile Design"]
};

/**
 * Find career paths that match user interests using cosine similarity
 * @param userInterests - User's selected interests and preferences
 * @returns Array of recommended career paths sorted by similarity score
 */
interface UserInterests {
  domain: string;
  skills: string;
  workplacePreference: "remote" | "hybrid" | "onsite";
  salaryExpectation: number;
  desiredPosition: string;
}

export const findMatchingCareerPaths = (userInterests: UserInterests) => {
  // Convert user skills to vector
  const userVector = skillsToVector(userInterests.skills + "," + userInterests.domain, skillCategories);
  
  // Calculate similarity for each career path
  const results = careerPaths.map(path => {
    // Basic cosine similarity based on skills/domain
    const similarity = calculateCosineSimilarity(userVector, path.vector);
    
    // Additional factors that can affect the match:
    
    // 1. Workplace preference match (0 or 1)
    const workplaceMatch = path.workplaceTypes.includes(userInterests.workplacePreference) ? 1 : 0;
    
    // 2. Salary range match (0 to 1)
    const salaryMatch = userInterests.salaryExpectation >= path.salaryRange.min && 
                        userInterests.salaryExpectation <= path.salaryRange.max ? 1 : 
                        (userInterests.salaryExpectation < path.salaryRange.min ? 
                          path.salaryRange.min / userInterests.salaryExpectation : 
                          userInterests.salaryExpectation / path.salaryRange.max);
    
    // 3. Position match (0 or 0.5)
    const positionMatch = path.positions.some(pos => 
      userInterests.desiredPosition.toLowerCase().includes(pos.toLowerCase()) || 
      pos.toLowerCase().includes(userInterests.desiredPosition.toLowerCase())
    ) ? 0.5 : 0;
    
    // Final weighted score (skills/domain weighted heaviest)
    const finalScore = (similarity * 0.6) + (workplaceMatch * 0.15) + 
                      (salaryMatch * 0.15) + (positionMatch * 0.1);
    
    return {
      ...path,
      similarityScore: finalScore,
    };
  });
  
  // Sort by similarity score (highest first)
  return results.sort((a, b) => b.similarityScore - a.similarityScore);
};
