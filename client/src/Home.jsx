import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1 className="text-5xl text-white my-20">Welcome to SwoleAI, User!</h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <button className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition">
          Go to plan
        </button>
        <Link className="flex items-center bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition" to="/plan_info">
          Create a new plan
        </Link>
      </div>
    </>
  );
}

export default Home;
