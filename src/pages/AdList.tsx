
import { Link } from "react-router-dom";
import { useAdvertisements } from "../hooks/useAdvertisements";
import { Advertisement } from "../types/advertisement";
import { useToast } from "@/components/ui/use-toast";

const AdList = () => {
  const { advertisements, removeAdvertisement, loadSampleData } = useAdvertisements();
  const { toast } = useToast();

  const handleDelete = (ad: Advertisement) => {
    removeAdvertisement(ad.id);
    toast({
      title: "Advertisement Deleted",
      description: `${ad.name} has been removed.`,
    });
  };

  const handleLoadSample = () => {
    loadSampleData();
    toast({
      title: "Sample Data Loaded",
      description: "Sample advertisements have been loaded.",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Advertisements</h1>
          <div className="space-x-4">
            <button
              onClick={handleLoadSample}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Load Sample Data
            </button>
            <Link
              to="/advertisements/new"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create New Ad
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advertisements.map((ad) => (
            <div
              key={ad.id}
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{ad.name}</h3>
                <div className="space-x-2">
                  <Link
                    to={`/advertisements/edit/${ad.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(ad)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{ad.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Start: {new Date(ad.startDate).toLocaleDateString()}</p>
                <p>End: {new Date(ad.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        {advertisements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No advertisements yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdList;
