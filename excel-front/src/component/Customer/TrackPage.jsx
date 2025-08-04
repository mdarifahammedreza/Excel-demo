import { useState } from "react";
import { useLoaderData } from "react-router";
import LiveMap from "./component/Track/LiveMap";
import PackageDetails from "./component/Track/PackageDetails";
import RecipientInfo from "./component/Track/RecipientInfo";
import RelatedServices from "./component/Track/RelatedServices";
import SenderInfo from "./component/Track/SenderInfo";
import TrackingActions from "./component/Track/TrackingActions";
import TrackingHeader from "./component/Track/TrackingHeader";
import TrackingTimeline from "./component/Track/TrackingTimeline";

const TrackPage = () => {
  const parcel = useLoaderData(); // parcel object
  const [trackingNumber, setTrackingNumber] = useState(parcel?.trackingCode || "");

  const handleTrack = () => {
    if (trackingNumber) {
      document.getElementById("trackingResults").scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Please enter a tracking number");
    }
  };

  const handleDownload = () => alert("Downloading receipt...");
  const handleShare = () => alert("Sharing tracking...");
  const handleSupport = () => alert("Contacting support...");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <TrackingHeader
        onTrack={handleTrack}
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
      />

      <div id="trackingResults" className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {/* Dynamic tracking data */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tracking Details</h2>
            <p className="text-gray-600">
              Tracking ID: <span className="font-mono font-bold text-primary-blue">#{parcel.trackingCode}</span>
            </p>
          </div>
          <div className="text-right">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {parcel.status}
            </span>
            <p className="text-sm text-gray-600 mt-1">
              Last updated: {new Date(parcel.timestamps?.bookedAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <SenderInfo
            sender={{
              name: parcel.customerId?.name,
              phone: parcel.customerId?.phone,
              address: parcel.pickupAddress
            }}
          />
          <RecipientInfo
            recipient={{
              name: "Recipient", // You can update this from another field if available
              phone: "N/A", // Update if you store this
              address: parcel.deliveryAddress
            }}
          />
        </div>

        <PackageDetails
          details={{
            weight: "N/A", // Add if available
            size: parcel.parcelSize,
            payment: `${parcel.paymentType?.toUpperCase()} - $${parcel.amount}`,
            agent: parcel.agentId?.name || "Not Assigned"
          }}
        />

        <TrackingTimeline
          timeline={[
            {
              bg: "bg-green-500",
              icon: "fas fa-check",
              title: "Booked",
              description: "Your parcel has been booked",
              time: new Date(parcel.timestamps?.bookedAt).toLocaleString(),
              textColor: "text-gray-800"
            },
            {
              bg: parcel.status === "Picked Up" || parcel.status === "In Transit" || parcel.status === "Delivered"
                ? "bg-green-500"
                : "bg-gray-300",
              icon: "fas fa-truck",
              title: "Picked Up",
              description: "Collected from sender's location",
              time: parcel.timestamps?.pickedUpAt
                ? new Date(parcel.timestamps.pickedUpAt).toLocaleString()
                : "Pending",
              textColor:
                parcel.status === "Picked Up" || parcel.status === "In Transit" || parcel.status === "Delivered"
                  ? "text-gray-800"
                  : "text-gray-500"
            },
            {
              bg: parcel.status === "In Transit" || parcel.status === "Delivered" ? "bg-primary-blue" : "bg-gray-300",
              icon: "fas fa-truck-moving",
              title: "In Transit",
              description: "Package is en route",
              time: "TBD",
              pulse: parcel.status === "In Transit",
              textColor:
                parcel.status === "In Transit" || parcel.status === "Delivered" ? "text-gray-800" : "text-gray-500"
            },
            {
              bg: parcel.status === "Delivered" ? "bg-green-500" : "bg-gray-300",
              icon: "fas fa-home",
              title: "Delivered",
              description: "Delivered to recipient",
              time: parcel.timestamps?.deliveredAt
                ? new Date(parcel.timestamps.deliveredAt).toLocaleString()
                : "Estimated",
              textColor: parcel.status === "Delivered" ? "text-gray-800" : "text-gray-500"
            }
          ]}
        />

{parcel.status === "In Transit" || parcel.status === "Delivered" ? (
  <LiveMap parcelId={parcel._id} status={parcel.status} />
) : (
  <div className="text-center text-gray-500 py-4">
    Live tracking will be available once the parcel is out for delivery.
  </div>
)}


        <TrackingActions
          onDownload={handleDownload}
          onShare={handleShare}
          onSupport={handleSupport}
        />
      </div>

      <RelatedServices />
    </div>
  );
};

export default TrackPage;
