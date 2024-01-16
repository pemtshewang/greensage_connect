const LocationDetails = async ({ latitude, longitude }: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${process.env.EXPO_PUBLIC_OPENCAGE_API}`
    );
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};
export default LocationDetails;
