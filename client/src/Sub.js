import React from 'react';
import { useLocation } from 'react-router-dom';

const Sub = () => {

  const location = useLocation();
  const titleText = location.state.title || 'Default Prop Value'; 
  const subHeadingText = location.state.subHeading || 'Default Prop Value'; 


  return (
    <div className="bg-green-100 flex items-center justify-center h-screen ">
  <div className="bg-gradient-to-b from-green-300 to-white border-green-400 border-2 rounded-lg p-8 max-w-md w-[90%]">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">{titleText}</h1>
      <p className="text-lg mb-6">{subHeadingText}</p>
      <a href="/">
      <button className="bg-green-500 text-white w-[30%] font-semibold py-2 px-4 rounded hover:bg-green-600 transition">Home</button>
      </a>
    </div>
  </div>
</div>
  )
}

export default Sub;

