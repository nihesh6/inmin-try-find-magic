import { useState } from "react";
import { Search, Sparkles, Mic } from "lucide-react";
import { Button } from "./ui/enhanced-button";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  onSearch,
  placeholder = "Ask our AI: 'Find me comfortable shoes for long walks'...",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const aiSuggestions = [
    "Find me comfortable running shoes under $200",
    "I need professional clothes for job interviews",
    "Show me wireless headphones for working out",
    "Looking for luxury skincare for sensitive skin",
    "Find affordable electronics for students",
    "I want trendy glasses that suit my face",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
      toast.success("🤖 Gemini AI is analyzing your request...");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    toast.success("🤖 Using AI suggestion...");
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search implementation would go here
    toast.info("🎤 Voice search coming soon!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
          <div className="relative bg-background border-2 border-border rounded-2xl shadow-colorful hover:shadow-glow transition-all duration-300">
            <div className="flex items-center">
              <div className="pl-4 pr-3">
                <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-0 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
              />

              <div className="flex items-center gap-2 pr-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleVoiceSearch}
                  className={`hover:bg-accent transition-all ${
                    isListening
                      ? "text-primary animate-pulse-glow"
                      : "text-muted-foreground"
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </Button>

                <Button
                  type="submit"
                  variant="magic"
                  size="default"
                  className="rounded-xl"
                >
                  <Sparkles className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI indicator */}
        <div className="absolute -top-2 -right-2">
          <div className="bg-gradient-primary text-primary-foreground text-xs px-2 py-1 rounded-full shadow-lg animate-bounce-gentle">
            🤖 Gemini AI
          </div>
        </div>
      </form>

      {/* Quick suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {[
          "comfortable shoes for long walks",
          "luxury skincare for sensitive skin",
          "wireless headphones for gym",
          "professional clothes for interviews",
        ].map((suggestion) => (
          <Button
            key={suggestion}
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
              toast.success("🤖 Using AI suggestion...");
            }}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-full border border-border hover:border-primary"
          >
            {suggestion}
          </Button>
        ))}
      </div>

      {/* AI helper text */}
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3 text-purple-400" />
          Ask in natural language - our AI understands context and preferences
        </p>
      </div>
    </div>
  );
};
