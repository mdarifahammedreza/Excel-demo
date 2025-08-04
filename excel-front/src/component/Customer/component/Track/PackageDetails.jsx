const PackageDetails = ({ details }) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-8">
    <h3 className="font-semibold text-gray-800 mb-3">Package Details</h3>
    <div className="grid md:grid-cols-4 gap-4 text-sm">
      <div>
        <p className="font-medium text-gray-700">Weight</p>
        <p className="text-gray-600">{details.weight}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Size</p>
        <p className="text-gray-600">{details.size}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Payment</p>
        <p className="text-gray-600">{details.payment}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Delivery Agent</p>
        <p className="text-gray-600">{details.agent}</p>
      </div>
    </div>
  </div>
);

export default PackageDetails;
