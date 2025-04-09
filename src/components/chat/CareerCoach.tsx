
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Send, Mic, Bot, User } from "lucide-react";

// Sample conversation data
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    content: "👋 Hi there! I'm your AI Career Coach. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
  },
  {
    id: 2,
    sender: "bot",
    content: "I can answer questions about your career path, skills to learn, or provide advice on job searching!",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString()
  }
];

// Sample suggested questions
const suggestedQuestions = [
  "How can I become a Senior Developer faster?",
  "What happens if I switch to Product Management?",
  "Which skills should I focus on learning next?",
  "Will AI replace my job in the future?",
  "How can I negotiate a higher salary?"
];

const CareerCoach = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (message = inputValue) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = getBotResponse(message);
      
      botResponses.forEach((response, index) => {
        setTimeout(() => {
          setMessages(prev => [
            ...prev, 
            {
              id: prev.length + 1,
              sender: "bot",
              content: response,
              timestamp: new Date().toISOString()
            }
          ]);
          
          if (index === botResponses.length - 1) {
            setLoading(false);
          }
        }, index * 1000);
      });
    }, 1000);
  };
  
  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("senior developer") || lowerMessage.includes("faster")) {
      return [
        "To become a Senior Developer faster, I recommend focusing on these key areas:",
        "1. Build systems, not just features - senior devs think about architecture",
        "2. Mentor junior developers to solidify your knowledge",
        "3. Lead technical projects and take ownership",
        "4. Contribute to open source or write technical articles",
        "5. Develop soft skills like communication and leadership",
        "Would you like me to elaborate on any of these areas?"
      ];
    } else if (lowerMessage.includes("switch") || lowerMessage.includes("product management")) {
      return [
        "Switching to Product Management from development is an interesting career pivot!",
        "Here's what this transition might look like:",
        "• Your technical background will be a major advantage",
        "• You'll need to develop business and user-focused skills",
        "• Initial salary might decrease slightly before growing",
        "• Learning curve: 6-12 months to become effective",
        "• I recommend getting certifications in product management and working on side projects to build your portfolio"
      ];
    } else if (lowerMessage.includes("skills") || lowerMessage.includes("learning")) {
      return [
        "Based on your career goals as a developer, I recommend focusing on these skills next:",
        "• System design and architecture",
        "• Advanced JavaScript and React patterns",
        "• Testing and CI/CD best practices",
        "• Data structures and algorithms (for interviews)",
        "• Technical communication and documentation",
        "I'd also suggest exploring cloud services like AWS or Azure, as they're highly valuable in today's market."
      ];
    } else if (lowerMessage.includes("ai") || lowerMessage.includes("replace")) {
      return [
        "Great question about AI and the future of development!",
        "AI won't replace developers, but it will change how we work. Here's why:",
        "• AI is great at generating routine code but struggles with complex systems",
        "• Developers who can collaborate with AI tools will be more valuable",
        "• Focus on skills that complement AI: system design, creative problem-solving, and human-centered design",
        "• Learn to use AI tools like GitHub Copilot to enhance your productivity rather than seeing them as competition"
      ];
    } else if (lowerMessage.includes("salary") || lowerMessage.includes("negotiate")) {
      return [
        "Here are some proven strategies for salary negotiation:",
        "1. Research market rates for your specific role and location",
        "2. Document your achievements and value-add to the company",
        "3. Practice your negotiation conversation with specific numbers",
        "4. Consider the total compensation package, not just base salary",
        "5. Be confident but collaborative in your approach",
        "Would you like me to help you create a personalized negotiation script?"
      ];
    } else {
      return [
        "Thanks for your question! I'd be happy to help with that.",
        "To give you the most accurate advice, could you provide a bit more context about your current role and career goals?"
      ];
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Career Coach</h1>
        <p className="text-muted-foreground">
          Get personalized career advice and answers to your questions
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="md:col-span-3 border-2 border-gray-100 flex flex-col h-[600px]">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-career-DEFAULT text-white">
                  <Bot size={16} />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Career Coach</CardTitle>
                <CardDescription>AI-powered career advisor</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-career-DEFAULT text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-center mb-1 space-x-2">
                    {message.sender === "bot" ? (
                      <Bot size={14} className="text-career-DEFAULT" />
                    ) : (
                      <User size={14} />
                    )}
                    <span className="text-xs opacity-70">
                      {message.sender === "bot" ? "Career Coach" : "You"} • {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-career-DEFAULT animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-career-DEFAULT animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-career-DEFAULT animate-pulse delay-300"></div>
                    <span className="text-sm text-gray-500">Typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <Separator />
          <CardFooter className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="w-full flex space-x-2"
            >
              <Input
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
                disabled={loading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-career-DEFAULT hover:bg-career-dark"
                disabled={loading}
              >
                <Send size={18} />
              </Button>
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                disabled={loading}
              >
                <Mic size={18} />
              </Button>
            </form>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle>Suggested Questions</CardTitle>
            <CardDescription>
              Try asking one of these questions to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleSendMessage(question)}
                disabled={loading}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerCoach;
