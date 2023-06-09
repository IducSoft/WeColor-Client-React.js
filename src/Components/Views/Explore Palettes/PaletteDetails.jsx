import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import bueno from "../../../assets/bueno.png";
import favorito from "../../../assets/favorito.png";
import paletaDeColor from "../../../assets/paleta-de-color.png";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { CircularProgress, Switch } from '@mui/material';
import {FiCopy} from "react-icons/fi";

ChartJS.register(ArcElement, Tooltip, Legend);

const PaletteDetails = () => {

  const {id} = useParams();
  const currenUserId = useSelector((state)=>state.user.currentUser._id)
  const url = "https://wecolor-api-rest.onrender.com/api";
  console.log(id, currenUserId)

  const [dataPalette, setDataPalette] =  useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [rbgOrhex, setRgbOrhex] = useState(true);

  const likePalette = async ()=>{

    try {
      const response = await axios.put(`${url}/users/like/${id}`, {
        withCredentials:true,
        credentials:"include",
        "user":{
          "id":`${currenUserId}`
        }
      });
      Swal.fire(
        'Good job!',
        `${response.data.message}`,
        'success'
      )
      getPaletteById();
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const addPaletteToFavorite = async () =>{
    try {
      const response = await axios.put(`${url}/users/favorites/${id}`, {
        withCredentials:true,
        credentials:"include",
        "user":{
          "id":`${currenUserId}`
        } 
      });
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const getPaletteById = async () => {
    try {
      const resultPalettesById = await axios.get(`${url}/palettes/${id}`);
      console.log(resultPalettesById.data)
      setDataPalette(resultPalettesById.data)
      setPieChartData(()=>{
        function setBackGroundColor (){
          let arrayResult = [];
          for (let index = 0; index < resultPalettesById.data.colors.length; index++) {
            const element = resultPalettesById.data.colors[index];
            arrayResult.push(element.hexPalette);
          }
          return arrayResult;
        }

        const data = {
          labels: [...setBackGroundColor()],
          datasets: [
            {
              label: '# of Votes',
              data: [1, 1, 1, 1, 1],
              backgroundColor: [
              ...setBackGroundColor()
              ],
                borderColor: [
                ...setBackGroundColor()
              ],
              borderWidth: 1,
            },
              ],
            };
          return data;
      })

    } catch (error) {
      console.log(error)
    }
  };

  const handleCopy =(textToCopy)=> {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        Swal.fire(`${textToCopy} coppied to clipboard`)
      })
      .catch(err => {
        alert('Failed to copy text')
      });
  }

  useEffect(() => {

    getPaletteById();
  },[]);

  return (
    <div>
      {
        dataPalette !== null ? (
          <div className='p-3'>
            <h2 className='text-center text-[3rem] mt-4'>
              {
                dataPalette.title
              }
            </h2>
            
            {
              pieChartData !== null && (
                <div className="flex justify-center items-center w-full h-[30rem] mt-4">
                <Pie data={pieChartData} />
                </div>
              )
            }
            

            <div className='flex justify-center items-center mt-8'>
              <div className='w-[4rem] mx-3 flex items-center justify-center'>
                <button onClick={()=>likePalette()}>
                  <img src={bueno} alt='like' />
                  <p className='mx-4 mt-2'>
                    {dataPalette.likesNumber}
                  </p>
                </button>
                
              </div>
              <div className='w-[4rem] mx-3'>
                <button onClick={()=>addPaletteToFavorite()}>
                  <img src={favorito} alt='favorito' />
                </button>
                
              </div>
              <div className='w-[4rem] mx-3'>
                <button>
                  <img src={paletaDeColor} alt='paleta de color' />
                </button>
                
              </div>
            </div>
            
            <div className='flex justify-around items-center w-[300px] mx-auto md:w-[600px] my-8'>
              {
                dataPalette.tags.map((tag, key)=>{
                  return(
                    <div className='mx-1 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900' key={key}>
                      {tag}
                    </div>
                  )
                })
              }
            </div>
              
            <div>
              <h2 className='text-center font-bold text-[1.5rem]'>
                {dataPalette.desc}
              </h2>
            </div>
            <div className='flex items-center justify-center my-5'>
            <span className='font-bold mx-4'>Rbg</span>
            <Switch
              checked={rbgOrhex}
              onChange={()=>setRgbOrhex(!rbgOrhex)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <span className='font-bold mx-4'>Hex</span>
          </div>
          </div>
          
        ):(
          <div className='w-full h-screen flex justify-center items-center'>

            <CircularProgress />
          </div>
        )
      }
      
      {
        (rbgOrhex === true && dataPalette !== null) && (
          <div className='flex flex-col w-full mx-auto items-center justify-center'>
            {
              dataPalette.colors.map((color, index) =>{

                return(
                  <div className='flex items-center justify-center my-3'key={index}>
                    <div className='w-[3.5rem] h-[3.5rem] mx-4' style={{backgroundColor:`${color.hexPalette}`}}>
                      
                    </div>
                    <p className='mx-4'>
                      {color.hexPalette}
                    </p>
                    <button className='mx-4' onClick={(e) => handleCopy(color.hexPalette)}>
                      <FiCopy/>
                    </button>
                  </div>
                )
              })
            }
          </div>
        )
      }

      {
        (rbgOrhex === false && dataPalette !== null) && (
          <div className='flex flex-col w-full mx-auto items-center justify-center'>
            {
              dataPalette.colors.map((color, index) =>{

                return(
                  <div className='flex items-center justify-center my-3 w-full'key={index}>
                    <div className='w-[3.5rem] h-[3.5rem] mx-4' style={{backgroundColor:`${color.hexPalette}`}}>
                      
                    </div>
                    <p className='mx-4'>
                      { `rgb(${color.rgb.red}, ${color.rgb.green}, ${color.rgb.blue})`}
                    </p>
                    <button className='mx-4' onClick={(e) => handleCopy(`rgb(${color.rgb.red}, ${color.rgb.green}, ${color.rgb.blue})`)}>
                      <FiCopy/>
                    </button>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default PaletteDetails;