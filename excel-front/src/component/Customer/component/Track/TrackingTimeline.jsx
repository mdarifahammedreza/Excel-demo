const TrackingTimeline = ({ timeline }) => (
  <div className="mb-8">
    <h3 className="font-semibold text-gray-800 mb-4">Tracking Timeline</h3>
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
      {timeline.map((item, index) => (
        <div key={index} className="relative flex items-start mb-6">
          <div className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center relative z-10 ${item.pulse && 'animate-pulse'}`}>
            <i className={`${item.icon} text-white text-sm`}></i>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className={`font-semibold ${item.textColor}`}>{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                {item.extra && <p className="text-sm text-primary-blue font-medium">{item.extra}</p>}
              </div>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrackingTimeline;
