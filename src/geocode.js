async function getLatLong(location) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    location
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data[0]) {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      console.log("FOUND: ", latitude, longitude);
      return { latitude, longitude };
    } else {
      console.log("Location not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    return null;
  }
}

export default getLatLong;
