import { useEffect, useState } from "react";

const isVisible = () =>
  process.browser &&
  typeof document !== "undefined" &&
  document.visibilityState === "visible";

const useWindowFocus = () => {
  const [focused, setFocused] = useState(isVisible());

  useEffect(() => {
    if (process.browser) {
      return;
    }
    if (typeof window !== "undefined") {
    window.addEventListener("visibilitychange", () => {
      setFocused(!document?.hidden);
    });
  }
    return () => {
      if (typeof window !== "undefined") {
      window.addEventListener("visibilitychange", () => {
        setFocused(!document?.hidden);
      });
    }
    };
  }, []);

  return focused;
};

export default useWindowFocus;
