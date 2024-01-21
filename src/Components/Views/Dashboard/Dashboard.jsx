import React, { useEffect, useState, useLayoutEffect } from "react";

//Redux
import {
  loginFailure,
  loginSuccess,
  loginStart,
  registeredSuccess,
  registeredFailure,
} from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Components
import BasicSpeedDial from "../../../utils/BasicSpeedDial";
import BasicBreadcrumbs from "../../../utils/BasicBreadcrumbs";
import BasicTabs from "../../../utils/BasicTabs";
import Tabs from "../../../utils/Tabs"

//axios
import axios from "axios"

//Css
import "./Dashboard-styles.css"

const url = import.meta.env.VITE_PROD_URL;

const colorPaletteElement = ()=>{
  return(
    <div className="color-palette"></div>
  )
}


const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { registered } = useSelector((state) => state.user);
  const { darkmode } = useSelector((state) => state.darkmode);
  const [favsPalettes, setFavsPalettes] = useState([])
  const [savedPalettes, setSavedPalettes] = useState([])
  const userId = currentUser._id;

  useEffect(() => {
    if (registered) {
      toast.success("Logged succesfully!", {
        duration: 5000,
        style: {
          background: darkmode ? "#333" : "#fff",
          color: darkmode ? "#fff" : "black",
        },
      });
    }

    return;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(registeredFailure());
    }, 5000);
  }, [registered]);

  useLayoutEffect(() => {
    const getFavs = async ()=>{
  
      let headerList = {
        "Accept":"*/*",
        "Content-Type":"application/json"
      }
    
      let content = {
          "user":{
            "id":`${userId}`
          }
      }
    
      let options ={
        url: `${url}/users/get/favorites/${userId}`,
        method:"GET",
        headers:headerList,
        data:content
      }
    
      console.log(userId)
    
      
      try {
        console.log("hello")
        console.log(options)
        const favs = await axios.request(options,
        {
          withCredentials:true,
          credentials:"include",
        },
        )
   
        setFavsPalettes(favs.data)
        console.log(favs.data)
      } catch (error) {
        console.log(error)
      }
     }

     const getSaved = async ()=>{
  
      let headerList = {
        "Accept":"*/*",
        "Content-Type":"application/json"
      }
    
      let content = {
          "user":{
            "id":`${userId}`
          }
      }
    
      let options ={
        url: `${url}/users/get/saved/${userId}`,
        method:"GET",
        headers:headerList,
        data:content
      }
    
      console.log(userId)
    
      
      try {
        console.log("hello")
        console.log(options)
        const saved = await axios.request(options,
        {
          withCredentials:true,
          credentials:"include",
        },
        )
    
        console.log(saved)
      } catch (error) {
        console.log(error)
      }
     }
    
     getSaved()
     getFavs()
    
   }, [])
   
   

  return (
    <>
      <Toaster position="top-center" />
      <div className="dashboard-container">
        <div className="column-one">
          <BasicSpeedDial/>
        </div>
        <div className="column-two">
        <div className="title">
         <Tabs userId={userId} />
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;