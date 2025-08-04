import { Truck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600  rounded-lg flex items-center justify-center">
                 <Truck className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold">ExcelTrack</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for fast and reliable courier services.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Express Delivery</a></li>
              <li><a href="#" className="hover:text-white transition">Same Day Delivery</a></li>
              <li><a href="#" className="hover:text-white transition">International Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">COD Services</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Track Package</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p><i className="fas fa-phone mr-2"></i> +1 (555) 123-4567</p>
              <p><i className="fas fa-envelope mr-2"></i> support@swifttrack.com</p>
              <p><i className="fas fa-map-marker-alt mr-2"></i> 123 Logistics Ave, City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SwiftTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
