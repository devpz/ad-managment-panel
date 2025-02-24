
import { useNavigate } from "react-router-dom";
import { useAdvertisements } from "../hooks/useAdvertisements";
import { useToast } from "@/components/ui/use-toast";
import AdForm from "../components/AdForm";

const CreateAd = () => {
  const { addAdvertisement } = useAdvertisements();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    const success = addAdvertisement({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    });

    if (success) {
      toast({
        title: "Advertisement Created",
        description: "Your new advertisement has been created successfully.",
      });
      navigate("/advertisements");
    } else {
      toast({
        title: "Error",
        description: "An advertisement with this name already exists.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Advertisement</h1>
        <AdForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateAd;
