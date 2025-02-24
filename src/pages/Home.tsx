import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const Home = () => {
  const [quote, setQuote] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/quotes",
          {
            headers: {
              "X-Api-Key": "Ay6odO5uk9HwRfnatE29yQ==uYvKkjGK4Prl2eJn",
            },
          }
        );
        setQuote(response.data[0]?.quote);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchQuote();
  }, []);

  const handleEnterPanel = () => {
    const password = prompt("Please enter the password to continue:");
    if (password === null) return;

    const isValid = login(password);
    if (isValid) {
      window.location.href = "/advertisements";
    } else {
      toast({
        title: "Invalid Password",
        description: "Please try again with the correct password.",
        variant: "destructive",
      });
      window.location.href = "/error";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Ad Management Panel
          </h1>
          <p className="text-xl text-gray-600 italic">{quote}</p>
        </div>
        <div className="pt-8">
          <button
            onClick={handleEnterPanel}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            Enter Ad Management Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
