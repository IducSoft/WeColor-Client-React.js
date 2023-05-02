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
        <div className="title">
          <h1>My Palettes</h1>
          <button>Favorites</button>
          <div className="grid-container"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;