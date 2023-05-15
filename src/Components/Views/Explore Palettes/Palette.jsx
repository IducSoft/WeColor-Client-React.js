import React from 'react'

const Palette = ({palette}) => {
    console.log(palette.colors)
  return (
    <div className="col-span-4 md:col-span-1 text-center rounded" >
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
    </div>
  )
}

export default Palette