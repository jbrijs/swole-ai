import React from "react";

function Home() {
  return (
    <>
      <h1 className="text-5xl text-white my-20">Welcome to SwoleAI, User!</h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <button className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition">
          Go to plan
        </button>
        <button className="bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition">
          Create a new plan
        </button>
      </div>
    </>
  );
}

export default Home;
