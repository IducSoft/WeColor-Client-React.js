import React, { useState, useEffect } from "react";

//Hooks
import useColors from "../../../Hooks/useColors";

//axios
import axios from "axios";

//React icons
import { AiOutlineHeart } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { BiLockOpenAlt } from "react-icons/bi";
import { MdDragHandle } from "react-icons/md";

//Css
import "./GeneratorView-styles.css";

const { REACT_APP_API_DEV_URL } = process.env;

const ColorBox = ({ color }) => {
  const { hex } = color;

  return (
    <>
      <div style={{ backgroundColor: hex }} className="color-box">
        <h1>Color Box</h1>
        <div className="icons">
          <BiCopy />
          <BiLockOpenAlt />
          <MdDragHandle />
        </div>
      </div>
    </>
  );
};

const GeneratorView = () => {
  const [changeColors, setChangeColors] = useState(false);
  const url = REACT_APP_API_DEV_URL;
  const [hexColor, setHexColor] = useState("");
  const [colorPalette, setColorPalette] = useState("");

  useEffect(() => {
    /*const fetchColor = async () => {
      try {
        const color = await axios.get(`${url}/palettes/get/newcolors`);

        setColorPalette(prepareColorPalette(color.data));
        console.log(color.data);
        console.log(colorPalette);
      } catch (error) {}
    };

    fetchColor();*/

    const arrayOfColors = [];

    const min = 0;
    const max = 255;

    let colorOne = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };
    let colorTwo = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };
    let colorThree = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };
    let colorFour = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };
    let colorFive = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };
    let colorSix = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };
    let colorSeven = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };

    const hexOne = transformaRgbAHex(
      colorOne.red,
      colorOne.green,
      colorOne.blue
    );
    const hexTwo = transformaRgbAHex(
      colorTwo.red,
      colorTwo.green,
      colorTwo.blue
    );
    const hexThree = transformaRgbAHex(
      colorThree.red,
      colorThree.green,
      colorThree.blue
    );
    const hexFour = transformaRgbAHex(
      colorFour.red,
      colorFour.green,
      colorFour.blue
    );
    const hexFive = transformaRgbAHex(
      colorFive.red,
      colorFive.green,
      colorFive.blue
    );
    const hexSix = transformaRgbAHex(
      colorSix.red,
      colorSix.green,
      colorSix.blue
    );
    const hexSeven = transformaRgbAHex(
      colorSeven.red,
      colorSeven.green,
      colorSeven.blue
    );

    arrayOfColors.push({ hex: hexOne, rgb: colorOne });
    arrayOfColors.push({ hex: hexTwo, rgb: colorTwo });
    arrayOfColors.push({ hex: hexThree, rgb: colorThree });
    arrayOfColors.push({ hex: hexFour, rgb: colorFour });
    arrayOfColors.push({ hex: hexFive, rgb: colorFive });
    arrayOfColors.push({ hex: hexSix, rgb: colorSix });
    arrayOfColors.push({ hex: hexSeven, rgb: colorSeven });

    function transformaRgbAHex(red, green, blue) {
      let hex = {
        hex_color:
          "#" +
          ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1),
      };
      return hex.hex_color;
    }

    setColorPalette(prepareColorPalette(arrayOfColors));
    console.log(colorPalette);
    return () => {};
  }, [changeColors]);

  const handleClick = () => {
    setChangeColors(!changeColors);
  };

  const prepareColorPalette = (palette) => {
    const colors = palette.splice(0, 5);
    return colors;
  };

  return (
    <>
      <div className="generator-container">
        <div className="title">
          <button onClick={handleClick}>Generar</button>
          <div className="icons">
            <AiOutlineHeart />
            <BsShare />
          </div>
        </div>
        <div className="generator-box">
          {(colorPalette.length === 0 ? [] : colorPalette).map(
            (color, index) => {
              return <ColorBox key={index} color={color} />;
            }
          )}
        </div>
      </div>
    </>
  );
};

export default GeneratorView;
