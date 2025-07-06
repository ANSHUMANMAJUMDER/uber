import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg3 from '../assets/bg-3.jpg';

const CaptainLogin = () => {

    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});   
    const submitHandler = (e)=>{
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setCaptainData({
        email:email,
        password:password
    })
    setEmail('');
    setPassword('');

    console.log(captainData);
    }
  return (
    <div
      className="relative h-full w-full"
      style={{
        backgroundImage: `url(${bg3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Softer, neutral overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative p-7 z-10">
        <div className="flex justify-center items-center mb-10">
       <img
  className="w-24 object-contain drop-shadow"
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Uber_App_Icon.svg/2048px-Uber_App_Icon.svg.png"
  alt="Uber Driver Logo"
/>

        </div>

        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2 text-black font-medium">What's your mail</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black" value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">Enter password</h3>
          <input
            type="password"
            placeholder="Password"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black" value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button className="bg-black text-white w-full py-2 rounded font-semibold text-base shadow hover:bg-gray-900 transition">
            Login
          </button>
        </form>

        <hr className="my-6 border-t border-gray-400" />

        <div className="flex flex-col items-center mt-5">
          <p className="text-black mb-4">Wanna be a Captain ?</p>
          <Link
            to={'/captain-signup'}
            className="flex items-center justify-center bg-black text-white w-full py-2 rounded font-semibold text-base shadow hover:bg-gray-900 transition"
          >
            Sign Up as Captain
          </Link>
        </div>
         <hr className="my-6 border-t border-gray-400" />
         <div>
            <p className="text-black mb-4 text-center">Wanna login as user</p>
            <Link to={'/signup'} className="text-white font-semibold text-center bg-black w-full py-2 rounded shadow hover:bg-gray-900 transition block text-base">
              Sign In as User</Link>
         </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
