import { BadgeDollarSign, Clock, Globe, PackageCheck } from "lucide-react";

const services = [
  {
    icon: <PackageCheck className="w-10 h-10 text-white" />,
    title: "Express Delivery",
    description:
      "Get your parcels delivered in record time with our reliable express delivery service.",
    bgColor: "bg-blue-600",
  },
  {
    icon: <Clock className="w-10 h-10 text-white" />,
    title: "Same Day Delivery",
    description:
      "Book and deliver on the same day in select areas, ensuring instant delivery for urgent needs.",
    bgColor: "bg-green-600",
  },
  {
    icon: <Globe className="w-10 h-10 text-white" />,
    title: "International Shipping",
    description:
      "Ship globally with confidence. Fast, secure, and affordable cross-border logistics.",
    bgColor: "bg-purple-600",
  },
  {
    icon: <BadgeDollarSign className="w-10 h-10 text-white" />,
    title: "COD Services",
    description:
      "Offer your customers the convenience of cash-on-delivery with full tracking support.",
    bgColor: "bg-orange-500",
  },
];

const ServicesPage = () => {
  return (
    <div><section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our range of delivery options tailored for speed, reach, and convenience.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon, title, description, bgColor }) => (
            <div
              key={title}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${bgColor}`}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
      
    </section></div>
  );
};

export default ServicesPage;
