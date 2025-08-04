const RecipientInfo = ({ recipient }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold text-gray-800 mb-3">Recipient Information</h3>
    <div className="space-y-2 text-sm">
      <p><span className="font-medium">Name:</span> {recipient.name}</p>
      <p><span className="font-medium">Phone:</span> {recipient.phone}</p>
      <p><span className="font-medium">Address:</span> {recipient.address}</p>
    </div>
  </div>
);

export default RecipientInfo;
