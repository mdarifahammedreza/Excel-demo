// Calculate distance between two points using Haversine formula
function haversineDistance(a, b) {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in km
  
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
  
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
  
    const aCalc =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  
    return R * c; // Distance in km
  }
  
  // Nearest Neighbor TSP Algorithm
  function getOptimizedRoute(points) {
    if (!points.length) return [];
  
    const visited = new Set();
    const route = [];
  
    let current = points[0]; // Start from first point (can be changed)
    route.push(current);
    visited.add(current);
  
    while (visited.size < points.length) {
      let nearest = null;
      let minDist = Infinity;
  
      for (const point of points) {
        if (visited.has(point)) continue;
  
        const dist = haversineDistance(current, point);
        if (dist < minDist) {
          minDist = dist;
          nearest = point;
        }
      }
  
      if (nearest) {
        route.push(nearest);
        visited.add(nearest);
        current = nearest;
      } else {
        break; // no unvisited points left
      }
    }
  
    return route;
  }
  
  module.exports = {getOptimizedRoute}
  