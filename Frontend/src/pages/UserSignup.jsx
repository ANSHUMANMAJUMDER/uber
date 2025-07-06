import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg4 from '../assets/bg-4.jpg';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    setUserData(data);
  };

  // 👇 Log userData when it changes
  useEffect(() => {
    if (userData) {
      console.log('User Data:', userData);
    }
  }, [userData]);

  return (
    <div
      className="relative h-full w-full"
      style={{
        backgroundImage: `url(${bg4})`,
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
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        <form onSubmit={submitHandler}>
          <h3 className="text-2xl mb-2 text-black font-medium">First Name</h3>
          <input
            type="text"
            placeholder="Enter your first name"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <h3 className="text-2xl mb-2 text-black font-medium">Last Name</h3>
          <input
            type="text"
            placeholder="Enter your last name"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">What's your mail</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 text-black font-medium">Enter password</h3>
          <input
            type="password"
            placeholder="Password"
            className="bg-white mb-5 rounded px-4 py-2 border border-gray-400 w-full text-base placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded font-semibold text-base shadow hover:bg-gray-900 transition"
          >
            Register
          </button>
        </form>

        <hr className="my-6 border-t border-gray-400" />
        <div>
          <p className="text-black mb-4 text-center">Are you a Captain?</p>
          <Link
            to={'/captain-login'}
            className="text-white font-semibold text-center bg-black w-full py-2 rounded shadow hover:bg-gray-900 transition block text-base"
          >
            Captain Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
