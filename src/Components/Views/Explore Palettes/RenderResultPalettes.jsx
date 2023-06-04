import React from 'react'
import { useSelector } from 'react-redux';
import Palette from './Palette';

const RenderResultPalettes = () => {
  const {typeSearch, resultPalettesAll} = useSelector((state)=>state.explorePalettes);
  console.log(resultPalettesAll)
  return (
    <>
    <div className='w-full mx-auto text-center mb-9 mt-9'>{typeSearch}</div>
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 py-3">
      {
        resultPalettesAll.map((palette, index)=>{
          return(
            <Palette key={index} palette={palette} />
          )
        })
      }
    </div>
    </>
  )
}


export default RenderResultPalettes;