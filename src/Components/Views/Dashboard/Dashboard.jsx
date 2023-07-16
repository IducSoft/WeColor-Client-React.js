import React, { useEffect, useState } from "react";

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

//Css
import "./Dashboard-styles.css"

const colorPaletteElement = ()=>{
  return(
    <div className="color-palette"></div>
  )
}


const Dashboard = () => {
  const dispatch = useDispatch();
  const { registered } = useSelector((state) => state.user);
  const { darkmode } = useSelector((state) => state.darkmode);

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

  return (
    <>
      <Toaster position="top-center" />
      <div className="dashboard-container">
        <div className="column-one">
          <BasicSpeedDial/>
        </div>
        <div className="column-two">
        <div className="title">
         <Tabs/>
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;