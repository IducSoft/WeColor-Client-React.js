import { useState, useMemo, useEffect } from "react";

//Components

//Hooks
import  useEsMobil  from "./../Hooks/useMobile";
import axios from "axios";

const url = import.meta.env.VITE_PROD_URL;


function Tabs({userId}) {
  const [toggleState, setToggleState] = useState(1);
  const [driver, setDriver] = useState(1);
  const [favsPalettes, setFavsPalettes] = useState([])
  const [savedPalettes, setSavedPalettes] = useState([])

  const isMobile = useEsMobil();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const toggleDriver = (index) => {
    setDriver(index);
  };

  /**
   * 
 
  useEffect(() => {
   const getFavs = async ()=>{
  
    let headerList = {
      "Accept":"",
      "Content-Type":"application/json"
    }
  
    let user = {
        "id":`${userId}`
    }
    
  
    let options ={
      url: `${url}/users/get/favorites`,
      method:"GET",
      headers:headerList,
      user:user
    }
  
    console.log(userId)
  
    
    try {
      console.log("hello")
      const favs = await axios.request(options,
      {
        withCredentials:true,
        credentials:"include",
      },
      )
  
      console.log(favs)
    } catch (error) {
      console.log(error)
    }
   }
  
   getFavs()
  }, []) 
  
  */



  return (
      <div className="tabs-container">
          <div className="flex items-center justify-center">
            <div className="flex  w-3/5 items-center justify-between">
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
            {
              driver === 1 ? (
               <>
                   <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>       
         <div className="color-palette"></div>
               </>
              ):(
                <>
                    <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>
         <div className="color-palette"></div>       
         <div className="color-palette"></div>
                </>  
              )
            }
          </div>
        </div>
  );
}

export default Tabs;
