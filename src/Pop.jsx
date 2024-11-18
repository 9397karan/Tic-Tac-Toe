import React from 'react'

export const Pop = ({winner,restart}) => {
    
  return (
    <div className='pop z-20 transition-all flex flex-col items-center gap-4 h-80 absolute w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 justify-center bottom-80 mx-auto'>
        <h1 className='text-black text-[50px] font-semibold bg-white p-3 rounded-xl shadow-xl'>Winner</h1>
        <h2 className='text-sky-500 text-[70px] font-extrabold'>{winner}</h2>
        <button onClick={restart} className='text-black text-[20px] font-semibold w-full bg-white p-3 rounded-xl shadow-xl'>Reset</button>
    </div>
  )
}
