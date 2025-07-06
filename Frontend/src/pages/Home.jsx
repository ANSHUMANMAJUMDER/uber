import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bg.jpg";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-36"
        />
      </header>

      {/* Footer Card */}
      <footer className="bg-white mt-auto p-4">
        <h2 className="text-2xl font-bold mb-2">
          Get Started with Uber
        </h2>
        <Link
          to="/login"
          className="flex items-center justify-center w-full mt-2 py-3 bg-black text-white font-bold rounded"
        >
          Continue
        </Link>
      </footer>
    </div>
  );
};

export default Home;
