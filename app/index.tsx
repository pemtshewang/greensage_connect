import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { getValueFor } from "../securestore";

async function checkLogin() {
  const value = await getValueFor("token");
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
  return false;
}

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const isLoggedIn = await checkLogin();
      setLoggedIn(isLoggedIn);
    }
    checkAuth();
  }, []);

  if (!loggedIn) {
    return <Redirect href="/Auth/login" />;
  }

  return (
    <Redirect href="/tabs/Home" />
  );
}
