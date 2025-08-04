const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.OPENCAGE_API_KEY;

async function geocodeAddress(address) {
  try {
    const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
      params: {
        q: address,
        key: API_KEY,
        limit: 1,
      },
    });

    const result = res.data.results[0];
    if (!result) return null;

    return {
      lat: result.geometry.lat,
      lng: result.geometry.lng,
      formatted: result.formatted,
    };
  } catch (err) {
    console.error("Geocode error:", err.message);
    return null;
  }
}
module.exports = { geocodeAddress };


