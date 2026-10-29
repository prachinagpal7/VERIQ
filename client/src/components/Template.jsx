import React from 'react'
import {useNavigate} from 'react-router-dom';  

const template = () => {
  const navigate = useNavigate();
  return (
    <div className="lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-zinc-800">
      <div className="h-36 rounded-3xl bg-gradient-to-br from-yellow-500/20 via-zinc-900 to-black border border-yellow-500/20 flex items-center justify-center">
        <h1 className="text-6xl font-black text-yellow-400 cursor-pointer" onClick={() => navigate('/')}>
          VERIQ
        </h1>
      </div>
      <h2 className="mt-8 text-4xl font-bold text-white">
        Crack Interviews.
      </h2>
      <p className="text-zinc-400 mt-3 leading-7"> 
        Practice AI interviews, solve coding questions,
        and track your placement journey.
      </p>
      <div className="mt-8 space-y-4">
        <div>✓ AI Mock Interviews</div>
        <div>✓ Coding Problems</div>
        <div>✓ Company Specific Questions</div>
        <div>✓ Analytics Dashboard</div>
      </div>
      <p className="mt-10 italic text-yellow-400">
        Code. Prepare. Get Hired.
      </p>
    </div>
  );
};

export default template
