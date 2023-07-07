import React, { useState } from "react";
import profilePng from "../../../assets/usuario.png";
import lapiz from "../../../assets/lapiz.png";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import axios from "axios";

const ProfileView = () => {
  const url = "https://wecolor-api-rest.onrender.com/api";
  const {currentUser} = useSelector((state)=> state.user);
  
  const [isEdit, setIsEdit] = useState(false)
  //console.log(currentUser)

  return (
    <>
      <section className="w-[100%] flex flex-col justify-center items-center mt-5">
        <div className="relative w-auto h-auto">
          <img src={profilePng} alt="profile" className="w-[250px] h-[250px]" />
          <button className="absolute top-0 right-0" onClick={(e)=>{setIsEdit(!isEdit)}}>
            <img src={lapiz} alt="lapiz" className="w-[40px] h-[40px] " />
          </button>
        </div>
        <h2 className="font-bold text-lg">{currentUser.name}</h2>
        <p className="mt-5 font-thin text-lg">{currentUser.email}</p>
      </section>
      <div className="text-center mt-5">
        <Link to="/" class=" cursor-pointer bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          My Palettes
        </Link>
      </div>
      <hr className="mt-5"/>
      {
        isEdit === false ? (
            <div className="flex flex-col items-center justify-start px-4 py-6">
          <h2 className="text-center font-bold text-[1.5rem] mt-5">BIO</h2>
          <div className="mt-5">
            <span>OCCUPATION: </span>
            <span>aqui va la ocupación</span>
          </div>
          <div className="mt-5">
            <span>BIOGRAPHY: </span>
            <span>Aqui va la biografía</span>
          </div>
          <div className="mt-5">
            <span>Twitter: </span>
            <span>Aqui va el twitter</span>
          </div>
          <div className="mt-5">
            <span>Linkedin: </span>
            <span>Aqui va el Linkedin</span>
          </div>
          <div className="mt-5">
            <span>instagram: </span>
            <span>Aqui va el instagram</span>
          </div>
          <div className="mt-5">
            <span>Portfolio: </span>
            <span>Aqui va el portfolio</span>
          </div>
        </div>
        ) :(
          <UpdateProfile/>
        )
      }

    </>
  );
};

export default ProfileView;
