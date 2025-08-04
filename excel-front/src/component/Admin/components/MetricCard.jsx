import { toast } from "react-hot-toast";

const MetricCard = ({ title, value, change, color = "blue", Icon }) => {
  const isPositive = change?.includes("+");

  // Tailwind color mappings
  const colorMap = {
    blue: { text: "text-blue-600", bg: "bg-blue-600" },
    green: { text: "text-green-600", bg: "bg-green-600" },
    red: { text: "text-red-600", bg: "bg-red-600" },
    yellow: { text: "text-yellow-600", bg: "bg-yellow-600" },
  };

  const { text, bg } = colorMap[color] || colorMap.blue;

  const handleClick = () => {
    toast.success(`${title} clicked`, {
      icon: <Icon className="w-5 h-5 text-green-600" />,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className={`text-2xl font-bold ${text}`}>{value}</h3>
          {change && (
            <p className={`text-sm mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
          <Icon className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
