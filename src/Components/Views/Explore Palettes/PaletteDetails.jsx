import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';

const PaletteDetails = () => {

  const {id} = useParams();
  const url = "https://wecolor-api-rest.onrender.com/api";
  console.log(id)


  const getPaletteById = async () => {
    try {
      const resultPalettesById = await axios.get(`${url}/palettes/${id}`);
      console.log(resultPalettesById.data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    getPaletteById();
  }, [])

  return (
    <div>
        Palette Details
    </div>
  )
}

export default PaletteDetails;