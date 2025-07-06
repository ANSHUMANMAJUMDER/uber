import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg5 from '../assets/bg-5.jpg';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [captainData, setCaptainData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();

    const captainData = {
      name: {
        firstName,
        lastName
      },
      email,
      password,
      vehicleNumber,
      vehicleType,
      capacity
    };

    console.log(captainData);
  };

  return (
    <div
      className="relative h-full w-full"
      style={{
        backgroundImage: `url(${bg5})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative p-7 z-10">
        <div className="flex justify-center items-center mb-10">
          <img
            className="w-24 object-contain drop-shadow"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Uber_App_Icon.svg/2048px-Uber_App_Icon.svg.png"
            alt="Uber Driver Logo"
          />
        </div>

        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2 text-black font-medium">First Name</h3>
          <input
            type="text"
            placeholder="Enter your first name"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">Last Name</h3>
          <input
            type="text"
            placeholder="Enter your last name"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">Email</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">Password</h3>
          <input
            type="password"
            placeholder="Password"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">Vehicle Number</h3>
          <input
            type="text"
            placeholder="Enter vehicle number"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">Vehicle Type</h3>
          <select
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base shadow-sm focus:ring-2 focus:ring-black"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="" disabled>Select vehicle type</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
          </select>

          <h3 className="text-xl mb-2 text-black font-medium">Capacity</h3>
          <input
            type="number"
            placeholder="Enter capacity"
            min="1"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />

          <button className="bg-black text-white w-full py-2 rounded font-semibold text-base shadow hover:bg-gray-900 transition">
            Sign Up
          </button>
        </form>

        <hr className="my-6 border-t border-gray-400" />

        <div className="flex flex-col items-center mt-5">
          <p className="text-black mb-4">Already have an account?</p>
          <Link
            to={'/captain-login'}
            className="flex items-center justify-center bg-black text-white w-full py-2 rounded font-semibold text-base shadow hover:bg-gray-900 transition"
          >
            Login as Captain
          </Link>
        </div>

        <hr className="my-6 border-t border-gray-400" />

        <div>
          <p className="text-black mb-4 text-center">Wanna login as user?</p>
          <Link
            to={'/login'}
            className="text-white font-semibold text-center bg-black w-full py-2 rounded shadow hover:bg-gray-900 transition block text-base"
          >
            Login as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
