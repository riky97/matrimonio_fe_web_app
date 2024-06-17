import { useEffect, useState } from "react";
import { IGetWindowDimension } from "../utils/Models";

function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
}

function useWindowDimensions(): IGetWindowDimension {
  const hasWindow: boolean = typeof window !== "undefined";

  function getWindowDimensions(): IGetWindowDimension {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState<IGetWindowDimension>(getWindowDimensions());

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    if (hasWindow) {
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

export { useScrollPosition, useWindowDimensions };
