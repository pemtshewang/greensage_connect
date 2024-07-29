import { getValueFor } from "../securestore";

export async function checkLogin() {
  try {
    const value = await getValueFor("token");
    if (!value) return false;

    const parsedValue = JSON.parse(value as string);
    const token = parsedValue.accessToken?.token;
    if (!token) return false;

    const expiresAt = new Date(parsedValue.accessToken.expiresAt);
    const currentTime = new Date();
    if (expiresAt > currentTime) {
      return true;
    } else {
      alert("Session Expired");
      return false;
    }
  } catch (err) {
    console.error("Error checking login:", err);
    return false;
  }
}
