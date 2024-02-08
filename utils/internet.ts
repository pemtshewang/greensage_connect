import * as Network from 'expo-network';

export const checkInternetConnection = async () => {
  const con = await Network.getNetworkStateAsync();
  return con.isInternetReachable;
}
