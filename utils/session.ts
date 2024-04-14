import { getValueFor } from "../securestore";

export async function checkLogin() {
  const value = await getValueFor("token");
  if (value) {
    try {
      const parsedValue = JSON.parse(value as string);
      const token = parsedValue.accessToken?.token;
      if (token) {
        const expiresAt = new Date(parsedValue.accessToken.expiresAt);
        const currentTime = new Date();
        if (expiresAt > currentTime) {
          return true;
        } else {
          alert("Session Expired");
          return false;
        }
      }
    } catch (err) {
      return false;
    }
  }
  return false;
}