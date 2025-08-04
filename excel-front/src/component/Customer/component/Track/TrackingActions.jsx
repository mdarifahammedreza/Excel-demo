const TrackingActions = ({ onDownload, onShare, onSupport }) => (
  <div className="flex justify-center space-x-4">
    <button onClick={onDownload} className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
      <i className="fas fa-download mr-2"></i>Download Receipt
    </button>
    <button onClick={onShare} className="bg-primary-orange text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
      <i className="fas fa-share mr-2"></i>Share Tracking
    </button>
    <button onClick={onSupport} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
      <i className="fas fa-headset mr-2"></i>Contact Support
    </button>
  </div>
);

export default TrackingActions;
