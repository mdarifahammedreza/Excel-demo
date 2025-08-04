import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useUser } from "../../../../GlobalContext/UserContext";
import MapPicker from "./MapPicker"; // Ensure correct import

const BookingModal = ({ isOpen, onClose,setbooked }) => {
  const { user } = useUser();

  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [parcelSize, setParcelSize] = useState("small");
  const [parcelType, setParcelType] = useState("document");
  const [paymentType, setPaymentType] = useState("COD");
  const [amount, setAmount] = useState(250);
  const [loading, setLoading] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapMode, setMapMode] = useState("pickup");

  const schema = z.object({
    pickupAddress: z.string().min(5, "Pickup address is too short"),
    deliveryAddress: z.string().min(5, "Delivery address is too short"),
    parcelSize: z.enum(["small", "medium", "large"]),
    parcelType: z.enum(["document", "box", "fragile", "other"]),
    paymentType: z.enum(["COD", "prepaid"]),
    amount: z.number().positive("Amount must be greater than 0"),
  });

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const address = res.data?.display_name;
          if (address) {
            setPickupAddress(address);
            toast.success("Pickup address set to current location.");
          } else {
            toast.error("Failed to retrieve address.");
          }
        } catch {
          toast.error("Error fetching address.");
        }
      },
      () => toast.error("Permission denied or failed to get location.")
    );
  };

  const handleMapSelect = (address) => {
    if (mapMode === "pickup") {
      setPickupAddress(address);
      toast.success("Pickup address selected from map.");
    } else {
      setDeliveryAddress(address);
      toast.success("Delivery address selected from map.");
    }
    setMapOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      toast.error("Please log in to book a parcel.");
      return;
    }

    const payload = {
      pickupAddress,
      deliveryAddress,
      parcelSize,
      parcelType,
      paymentType,
      amount: Number(amount),
    };

    const validation = schema.safeParse(payload);
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Validation error.");
      return;
    }const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/parcels`, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Parcel booked successfully! 🎉");
      resetForm();
      setbooked(Math.random())
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Booking failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPickupAddress("");
    setDeliveryAddress("");
    setParcelSize("small");
    setParcelType("document");
    setPaymentType("COD");
    setAmount(250);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2">
        <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Book New Parcel</h2>
            <button onClick={onClose} className="text-xl hover:text-red-500">✖</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 flex justify-between">
                  Pickup Address
                  <div className="flex flex-col space-y-1 text-right">
                    <button
                      type="button"
                      onClick={fetchCurrentLocation}
                      className="text-green-600 hover:underline text-xs"
                    >
                      + Current Location
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMapMode("pickup");
                        setMapOpen(true);
                      }}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      + Select from Map
                    </button>
                  </div>
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  rows={3}
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 flex justify-between">
                  Delivery Address
                  <button
                    type="button"
                    onClick={() => {
                      setMapMode("delivery");
                      setMapOpen(true);
                    }}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    + Select from Map
                  </button>
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  rows={3}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold">Parcel Size</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={parcelSize}
                  onChange={(e) => setParcelSize(e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">Parcel Type</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={parcelType}
                  onChange={(e) => setParcelType(e.target.value)}
                >
                  <option value="document">Document</option>
                  <option value="box">Box</option>
                  <option value="fragile">Fragile</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold">Payment Type</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="prepaid">Bkash</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">Amount</label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border rounded-lg"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white flex items-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Booking..." : "Book Parcel"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {mapOpen && (
        <MapPicker
          onClose={() => setMapOpen(false)}
          onSelectLocation={handleMapSelect}
        />
      )}
    </>
  );
};

export default BookingModal;
