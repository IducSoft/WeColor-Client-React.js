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
import BasicSpeedDial from "../../../utils/BasicSpeedDial"

//Css
import "./Dashboard-styles.css"

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
          <h1>My Palettes</h1>
          <h3>Favorites</h3>
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
             <div className="color-palette"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;