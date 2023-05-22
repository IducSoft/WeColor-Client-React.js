import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import bueno from "../../../assets/bueno.png";
import favorito from "../../../assets/favorito.png";
import paletaDeColor from "../../../assets/paleta-de-color.png";


ChartJS.register(ArcElement, Tooltip, Legend);

const PaletteDetails = () => {

  const {id} = useParams();
  const url = "https://wecolor-api-rest.onrender.com/api";
  console.log(id)

  const [dataPalette, setDataPalette] =  useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  


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

  useEffect(() => {

    getPaletteById();
  },[]);

  return (
    <div>
      {
        dataPalette !== null && (
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
                <img src={bueno} alt='like' />
                <p className='mx-4'>
                  {dataPalette.likesNumber}
                </p>
              </div>
              <div className='w-[4rem] mx-3'>
                <img src={favorito} alt='favorito' />
              </div>
              <div className='w-[4rem] mx-3'>
                <img src={paletaDeColor} alt='paleta de color' />
              </div>
            </div>
            
            <div className='flex justify-around items-center w-[300px] mx-auto md:w-[600px] my-8'>
              {
                dataPalette.tags.map((tag, key)=>{
                  return(
                    <div className='bg-purple' key={key}>
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

          </div>
        )
      }
      
    </div>
  )
}

export default PaletteDetails;