const LocationDetails = async ({ latitude, longitude }: {
  latitude: number;
  longitude: number;
}) => {
  console.log('LocationDetails', latitude, longitude);
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=${process.env.EXPO_PUBLIC_OPENCAGE_API}&q=${latitude}+${longitude}&pretty=1`
    );
    const data = await response.json();
    return data.results[0].components;
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};
export default LocationDetails;
