import React, { useState, useEffect } from "react";

//axios
import axios from "axios";

//Sweet Alert
import Swal from "sweetalert2";

//Copy to clipboard
import copy from "copy-to-clipboard";

//React icons
import { AiOutlineHeart } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { BiCopy,BiUndo, BiRedo } from "react-icons/bi";
import { MdDragHandle } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";

//Material UI
import Divider from '@mui/material/Divider';

//Framer motion
import { AnimatePresence, motion } from "framer-motion";

//React hot toast
import { toast, Toaster } from "react-hot-toast";

//Css
import "./GeneratorView-styles.css";

//Hooks 
import useMobile from "../../../Hooks/useMobile"

//Components
import BasicMenu from "./BasicMenu.jsx";
import Modal from "../../../utils/Modal.jsx";

const ColorBox = ({ color, index, colorPalette }) => {
  const [colorOfColorBox, setColorOfBox] = useState(null);


  const {
    hexPalette,
    rgb: {},
  } = color;

  const genColor = (e) => {
    const pos = e.target.getAttribute("position");
    const min = 0;
    const max = 255;

    let color = {
      red: Math.round(Math.random() * (max - min) + min),
      green: Math.round(Math.random() * (max - min) + min),
      blue: Math.round(Math.random() * (max - min) + min),
    };

    const hex = transformaRgbAHex(color.red, color.green, color.blue);
    setColorOfBox({ hex: hex, rgb: color });

    changePosition(colorPalette, pos, hex, color);
  };

  function transformaRgbAHex(red, green, blue) {
    let hex = {
      hex_color:
        "#" +
        ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1),
    };
    return hex.hex_color;
  }

  const handleCopy = async () => {
    try {
      copy(colorOfColorBox == null ? hexPalette : colorOfColorBox.hex);
      toast("Copied to the clipboard!", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2500,
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  function changePosition(colorPalette, pos, hex, color) {
    if (pos == null) {
      return;
    } else {
      colorPalette[pos] = { hexPalette: hex, rgb: color };
      console.log(colorPalette)
    }
  }



  return (
    <>
      <Toaster position="bottom-center" />
      <div
        style={{
          backgroundColor:
            colorOfColorBox == null ? hexPalette : colorOfColorBox.hex,
        }}
        className="color-box"
      >
        <h1 style={{fontSize:"28px"}}>
          {colorOfColorBox == null
            ? hexPalette.toUpperCase()
            : colorOfColorBox.hex.toUpperCase()}
        </h1>
        <div className="icons">
          <IoMdRefresh
            style={{
              cursor: "pointer",
            }}
            onClick={genColor}
            position={index}
          />
          <BiCopy
            style={{
              cursor: "pointer",
            }}
            onClick={handleCopy}
          />
          <MdDragHandle
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </>
  );
};

const GeneratorView = () => {
  const [changeColors, setChangeColors] = useState(false);
  const url = import.meta.env.VITE_PROD_URL;
  const [colorPalette, setColorPalette] = useState("");
  const isMobile = useMobile()
  const [modalOpen, setModalOpen]=useState(false);
  

  useEffect(() => {
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

    arrayOfColors.push({ hexPalette: hexOne, rgb: colorOne });
    arrayOfColors.push({ hexPalette: hexTwo, rgb: colorTwo });
    arrayOfColors.push({ hexPalette: hexThree, rgb: colorThree });
    arrayOfColors.push({ hexPalette: hexFour, rgb: colorFour });
    arrayOfColors.push({ hexPalette: hexFive, rgb: colorFive });
    arrayOfColors.push({ hexPalette: hexSix, rgb: colorSix });
    arrayOfColors.push({ hexPalette: hexSeven, rgb: colorSeven });

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

/**
 useEffect(()=>{
  const fetchByQuery = async ()=>{

    const query = "#e782c1";
    let headerList = {
      //"Accept":",
      "Content-Type":"application/json",
    }
    
    let options = {
      url:`${url}/palettes/get/search?`,
      method:"GET",
      headers:headerList,
      params:{
        q:query
      },
    }

    try {
      const {data} = await axios.request(options,{
        withCredentials:true,
        credentials:"include"
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

fetchByQuery();

},[]) 
 * */ 

  const prepareColorPalette = (palette) => {
    const colors = palette.splice(0, 5);
    return colors;
  };


  const handleOpenAndCloseModal = ()=>{
    setModalOpen(!modalOpen)
  }

  const pageTransition = {
    in: {
      opacity: 1,
    },
  
    out: {
      opacity: 0,
    },
  };

  return (
    <>
      <div className="generator-container">
        {modalOpen?(
        <AnimatePresence>
           <motion.div
            style={{position:"absolute"}}
            initial={{ scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
          <Modal colorPalette={colorPalette} handleOpenAndCloseModal={handleOpenAndCloseModal} />
          </motion.div>
        </AnimatePresence>
        ):(<></>)}
        <div className="title">
          {/*
          {!isMobile?(

            <span>Generate each color and save the palette!</span>
          ):(<></>)}
           */}
          <div className="icons">

            <BiUndo/>
            <BiRedo/>
     
            <Divider orientation="vertical"  flexItem />
            <span style={{cursor:"pointer"}} onClick={handleOpenAndCloseModal} >
            <AiOutlineHeart style={{alignSelf:"center",paddingTop:"2px", fontSize:"25px"}} />
              Save
            </span>
              <Divider orientation="vertical"  flexItem />
            <span style={{width:"30%"}} >
              <BsShare style={{alignSelf:"center", paddingTop:"2px",fontSize:"25px"}} />
              <BasicMenu/>
            </span>
          </div>
        </div>
        <div className="generator-box">
          {(colorPalette.length === 0 ? [] : colorPalette).map(
            (color, index) => {
              return (
                <ColorBox
                  colorPalette={colorPalette}
                  key={index}
                  color={color}
                  index={index}
                />
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default GeneratorView;
