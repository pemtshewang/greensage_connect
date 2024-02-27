import * as Location from 'expo-location';

export default async function getLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }
  let location = await Location.getCurrentPositionAsync();
  const exLocation = {
    lat: location.coords.latitude.toString(),
    long: location.coords.longitude.toString(),
  }
  return exLocation;
};


