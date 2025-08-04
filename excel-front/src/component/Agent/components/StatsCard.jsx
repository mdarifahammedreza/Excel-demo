const StatsCard = ({ icon: Icon, title, count, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    <Icon className={`text-3xl mb-3 ${color}`} />
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className={`text-2xl font-bold ${color}`}>{count}</p>
  </div>
);

export default StatsCard;
