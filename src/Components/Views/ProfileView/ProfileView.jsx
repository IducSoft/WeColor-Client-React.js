import React from "react";
import profilePng from "../../../assets/usuario.png";
import lapiz from "../../../assets/lapiz.png";
import { useSelector } from "react-redux";


const ProfileView = () => {

  const {currentUser} = useSelector((state)=> state.user)
  console.log(currentUser)

  return (
    <>
      <section className="w-[100%] flex flex-col justify-center items-center mt-5">
        <div className="relative w-auto h-auto">
          <img src={profilePng} alt="profile" className="w-[250px] h-[250px]" />
          <button className="absolute top-0 right-0">
            <img src={lapiz} alt="lapiz" className="w-[40px] h-[40px] " />
          </button>
        </div>

        <h2 className="font-bold text-lg">{currentUser.name}</h2>
        <p className="mt-5 font-thin text-lg">{currentUser.email}</p>
      </section>
    </>
  );
};

export default ProfileView;
