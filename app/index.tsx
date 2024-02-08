import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { getValueFor } from "../securestore";
import LoaderScreen from "../components/LoaderSplash";

async function checkLogin() {
  const value = await getValueFor("token");
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
  return false;
}

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const isLoggedIn = await checkLogin();
      setLoggedIn(isLoggedIn);
    }
    checkAuth();
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);

  if (loading) {
    return <LoaderScreen message="Authenticating User" />
  }
  if (loggedIn === null) {
    // Add a loading state if necessary
    return <ActivityIndicator />;
  }

  if (!loggedIn) {
    return <Redirect href="/Auth/login" />;
  }

  return <Redirect href="/tabs/Home" />;
}
