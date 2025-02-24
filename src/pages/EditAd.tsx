
import { useNavigate, useParams } from "react-router-dom";
import { useAdvertisements } from "../hooks/useAdvertisements";
import { useToast } from "@/components/ui/use-toast";
import AdForm from "../components/AdForm";

const EditAd = () => {
  const { id } = useParams();
  const { advertisements, updateAdvertisement } = useAdvertisements();
  const navigate = useNavigate();
  const { toast } = useToast();

  const ad = advertisements.find((a) => a.id === id);

  if (!ad) {
    navigate("/advertisements");
    return null;
  }

  const handleSubmit = (data: any) => {
    const success = updateAdvertisement({ ...data, id });

    if (success) {
      toast({
        title: "Advertisement Updated",
        description: "Your advertisement has been updated successfully.",
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
        <h1 className="text-3xl font-bold text-gray-900">Edit Advertisement</h1>
        <AdForm onSubmit={handleSubmit} defaultValues={ad} />
      </div>
    </div>
  );
};

export default EditAd;
