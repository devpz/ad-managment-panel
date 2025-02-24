
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";

const adSchema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content must be less than 500 characters"),
  startDate: z.string().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  }, "Start date cannot be in the past"),
  endDate: z.string(),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

interface AdFormProps {
  onSubmit: (data: z.infer<typeof adSchema>) => void;
  defaultValues?: z.infer<typeof adSchema>;
}

const AdForm = ({ onSubmit, defaultValues }: AdFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          {...register("content")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          {...register("startDate")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          {...register("endDate")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.endDate && (
          <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Link
          to="/advertisements"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AdForm;
