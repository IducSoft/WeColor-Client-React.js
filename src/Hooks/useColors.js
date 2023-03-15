import { useState, useEffect } from "react";

export default function useColors(min, max) {
  const [colorGen, setColorGen] = useState({});

  useEffect(() => {
    let color = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };

    const hex = transformaRgbAHex(color.red, color.green, color.blue);

    setColorGen({ hex: hex, rgb: color });
  }, []);

  return colorGen;
}

function transformaRgbAHex(red, green, blue) {
  let hex = {
    hex_color:
      "#" +
      ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1),
  };
  return hex.hex_color;
}
