import { useState } from "react";

//Components

//Hooks
import  useEsMobil  from "./../Hooks/useMobile";



function Tabs() {
  const [toggleState, setToggleState] = useState(1);
  const [driver, setDriver] = useState(1);

  const isMobile = useEsMobil();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const toggleDriver = (index) => {
    setDriver(index);
  };

  return (
      <div className="tabs-container">
          <div className="flex items-center justify-between">
            <div className="flex  w-full items-center justify-between">
              <button
                onClick={() => toggleDriver(1)}
                style={{
                  borderTopLeftRadius: "16px",
                  borderBottomLeftRadius: "16px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  fontSize: isMobile ? "12px" : "18px",
                }}
                className={
                  driver === 1
                    ? "tab-btn p-2 w-3/6 active-btn"
                    : "tab-btn p-2 w-3/6"
                }
              >
                Saved
              </button>
              <button
                onClick={() => toggleDriver(2)}
                style={{
                  borderBottomRightRadius: "16px",
                  borderTopRightRadius: "16px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  fontSize: isMobile ? "12px" : "18px",
                }}
                className={
                  driver === 2
                    ? "tab-btn p-2 w-3/6 active-btn"
                    : "tab-btn p-2 w-3/6"
                }
              >
                Favourites
              </button>
            </div>
          </div>
          <div className="grid-container">
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>       
         <div className="color-palette"></div>
          </div>
        </div>
  );
}

export default Tabs;
