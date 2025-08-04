const TrackingHeader = ({ onTrack, trackingNumber, setTrackingNumber }) => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Track Your Parcel</h1>
    <div className="max-w-md mx-auto">
      <div className="flex">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
        <button
          onClick={onTrack}
          className="bg-primary-orange text-white px-6 py-3 rounded-r-lg hover:bg-orange-700 transition"
        >
          <i className="fas fa-search">Search</i>
        </button>
      </div>
    </div>
  </div>
);

export default TrackingHeader;
