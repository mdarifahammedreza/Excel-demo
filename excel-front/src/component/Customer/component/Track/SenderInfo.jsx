const SenderInfo = ({ sender }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold text-gray-800 mb-3">Sender Information</h3>
    <div className="space-y-2 text-sm">
      <p><span className="font-medium">Name:</span> {sender.name}</p>
      <p><span className="font-medium">Phone:</span> {sender.phone}</p>
      <p><span className="font-medium">Address:</span> {sender.address}</p>
    </div>
  </div>
);

export default SenderInfo;
