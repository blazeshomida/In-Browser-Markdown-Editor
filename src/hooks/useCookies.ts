import { useState, useEffect } from "react";

// Helper function to get a specific cookie by name and deserialize it
const getCookie = <T>(name: string): T | null => {
  const cookie = document.cookie
    .split("; ")
    .reduce<string | null>((acc, currentCookie) => {
      const [cookieName, cookieValue] = currentCookie.split("=");
      return cookieName === name ? decodeURIComponent(cookieValue) : acc;
    }, null);

  return cookie as T;
};

// Helper function to set a specific cookie by name and serialize it
const setCookie = <T>(name: string, value: T, days?: number): void => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}${expires}; path=/`;
};

// useCookies hook that accepts a generic T
export const useCookies = <T>(name: string, defaultValue: T, days?: number) => {
  const [cookie, setCookieState] = useState<T>(() => {
    const storedCookie = getCookie<T>(name);
    if (storedCookie !== null) {
      return storedCookie;
    } else {
      // If no cookie exists, set the default value
      setCookie(name, defaultValue, days);
      return defaultValue;
    }
  });

  useEffect(() => {
    const storedCookie = getCookie<T>(name);
    if (storedCookie === null) {
      // If no cookie exists, set the default value
      setCookie(name, defaultValue, days);
    }
    setCookieState(storedCookie ?? defaultValue);
  }, [name, defaultValue, days]);

  const updateCookie = (value: T, days?: number) => {
    setCookie(name, value, days);
    setCookieState(value); // Update state after setting the cookie
  };

  return [cookie, updateCookie] as const;
};
