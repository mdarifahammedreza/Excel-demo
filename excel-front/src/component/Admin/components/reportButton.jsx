import { Download } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUser } from "../../../GlobalContext/UserContext";

const ExportReportsButton = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user } = useUser();

  const handleExportCSV = async () => {
    try {
      const endpoint = `${API_BASE_URL}/reports/export`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch report");

      const blob = await res.blob();

      const fileURL = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = "parcel_report.csv";
      a.click();

      toast.success("Report exported as CSV");
    } catch (err) {
      toast.error("Export failed");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleExportCSV}
      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
    >
      <Download className="w-4 h-4" />
      Export Data as CSV
    </button>
  );
};

export default ExportReportsButton;
