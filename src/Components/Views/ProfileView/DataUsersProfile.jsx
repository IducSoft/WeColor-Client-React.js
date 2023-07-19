import React,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const DataUsersProfile = () => {

    const dispatch = useDispatch();
    const profileDataUser = useSelector(state => state.profileDataUser);
    const userId = useSelector(state => state.user);
    console.log(profileDataUser)
    const url = "https://wecolor-api-rest.onrender.com/api";
    
    const getProfileDataUpdated = async () => {
        
        try{
            const response = await axios.get(`${url}/api/users/find/${userId._id}`);
            console.log(response.data);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(profileDataUser.isUpdated === true){
            getProfileDataUpdated();
        }
    },[])

    return (
        <>
            {
                profileDataUser.isUpdated === true ? (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-start px-4 py-6">
                        <h2 className="text-center font-bold text-[1.5rem] mt-5">BIO</h2>
                        <div className="mt-5">
                            <span>OCCUPATION: </span>
                            <span>{profileDataUser.userData.occupation}</span>
                        </div>
                        <div className="mt-5">
                            <span>BIOGRAPHY: </span>
                            <span>{profileDataUser.userData.biography}</span>
                        </div>
                        <div className="mt-5">
                            <span>Twitter: </span>
                            <span>{profileDataUser.userData.twitter}</span>
                        </div>
                        <div className="mt-5">
                            <span>Linkedin: </span>
                            <span>{profileDataUser.userData.linkedin}</span>
                        </div>
                        <div className="mt-5">
                            <span>instagram: </span>
                            <span>{profileDataUser.userData.instagram}</span>
                        </div>
                        <div className="mt-5">
                            <span>Portfolio: </span>
                            <span>{profileDataUser.userData.portfolio}</span>
                        </div>
                    </div>
                )
            }
        </>
    
    )
}

export default DataUsersProfile;