import React from 'react'
import { Link } from 'react-router-dom'

const Palette = ({palette}) => {
    console.log(palette)
    return (
        <div className="col-span-4 md:col-span-1 text-center rounded border-y-stone-950" >
            <Link to={`/paletteDetail/${palette._id}`}>
                <div className='grid grid-cols-5'>
                    {
                        palette.colors.map((color, index) =>{
                            return(
                                <div key={index} className="bg-gray-200  p-1">
                                    <div className="flex items-center justify-center">
                                        <div className="w-[5.75rem] h-[150px]" style={{backgroundColor:`${color.hexPalette}`}}></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <h2 className='w-full px-3 py-2 bg-gray-200 text-black'> {palette.title}</h2>
            </Link>
        </div>
    );
}

export default Palette