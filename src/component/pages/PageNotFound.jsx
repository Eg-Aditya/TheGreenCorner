import React from 'react'
import PNF1 from '../../assets/lightmode/pagenotfound.PNG';
import PNF2 from '../../assets/lightmode/404-Page.gif';

const PageNotFound = () => {
  return (
    <div className='w-[100%] h-[100vh] bg-[#ECECEC] text-white flex flex-col justify-center items-center'>
        <img src={PNF1} alt="" className='w-[50%] h-[50%]' />
        <img src={PNF2} alt="" className='w-[50%] h-[50%]'/>
    </div>
  )
}

export default PageNotFound