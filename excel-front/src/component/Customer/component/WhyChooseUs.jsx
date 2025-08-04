import { Clock, ShieldCheck, Smartphone } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose SwiftTrack?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Real-time Tracking */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
            <p className="text-gray-600">
              Track your parcels live with GPS coordinates and get instant updates on delivery status.
            </p>
          </div>

          {/* Secure Delivery */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Delivery</h3>
            <p className="text-gray-600">
              Your parcels are safe with our verified delivery agents and secure handling process.
            </p>
          </div>

          {/* Easy Booking */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
            <p className="text-gray-600">
              Book parcel pickups instantly through our user-friendly platform with just a few clicks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
