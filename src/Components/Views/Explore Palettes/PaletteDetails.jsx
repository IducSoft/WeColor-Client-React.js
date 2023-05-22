import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import "./PaletteDetails.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PaletteDetails = () => {

  const {id} = useParams();
  const url = "https://wecolor-api-rest.up.railway.app/api";
  console.log(id)


  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#8b74ae',
          '#f7e2a4',
          '#a465b9',
          '#8b3cf8',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const getPaletteById = async () => {
    try {
      const resultPalettesById = await axios.get(`${url}/palettes/${id}`);
      console.log(resultPalettesById.data)
    } catch (error) {
      console.log(error)
    }
  };

  

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Pie data={data} />;
      </div>
    </div>
  )
}

export default PaletteDetails;