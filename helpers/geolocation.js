export const triggerDistance = 100;

export const humanDistance = (distInMetres = 0) => {
  if (distInMetres) {
    const value = Math.round(distInMetres);
    if (value < 1000) return `${value} m`;
    if (value < 10000) return `${(value / 1000).toFixed(2)} km`;
    return `${Math.round(value / 1000)} km`;
  }
  return 0;
};

export const bearingTo = (from, to) => {
  if (from && to) {
    let d2r = Math.PI / 180;
    let r2d = 180 / Math.PI;
    let lat1 = from.lat * d2r;
    let lat2 = to.lat * d2r;
    let dLon = (to.lng - from.lng) * d2r;
    let y = Math.sin(dLon) * Math.cos(lat2);
    let x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return (parseInt(Math.atan2(y, x) * r2d) + 360) % 360;
  }
  return 0;
};

export const addLocationFields = ({ item, current, bearing: _bearing }) => {
  if (current) {
    const distanceValue = current.distanceTo(item.latlng);
    const bearing = bearingTo(current, item.latlng) - _bearing;
    const distance = humanDistance(distanceValue);
    return { ...item, bearing, distance, distanceValue };
  }
  return item;
};

export const zoomBounds = { min: 14, max: 18 };
