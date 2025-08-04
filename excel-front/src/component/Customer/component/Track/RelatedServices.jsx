const RelatedServices = () => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { icon: 'fa-phone', color: 'text-primary-blue', title: 'Call Support', text: '+1 (555) 123-4567' },
        { icon: 'fa-envelope', color: 'text-primary-orange', title: 'Email Us', text: 'support@swifttrack.com' },
        { icon: 'fa-comments', color: 'text-green-500', title: 'Live Chat', text: 'Available 24/7' }
      ].map((service, idx) => (
        <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
          <i className={`fas ${service.icon} ${service.color} text-2xl mb-2`}></i>
          <h4 className="font-medium text-gray-800">{service.title}</h4>
          <p className="text-sm text-gray-600">{service.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default RelatedServices;
