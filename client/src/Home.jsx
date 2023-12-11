import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [userName, setUserName] = useState(null);
  const [userPlan, setUserPlan] = useState(null)

  async function getUserName(){
    const res = await fetch("/api/get_name", {
      credentials: "same-origin",
    });
    const body = await res.json();
    setUserName(body.name)
  }

  async function getPlan(){
    const res = await fetch("/api/get_plan", {
      credentials: "same-origin",
    });
    const body = await res.json();
    setUserPlan(body.plan)
  }

  useEffect(()=> {
    getUserName();
    getPlan();
  }, [])

  return (
    <>
      {userPlan && <p>I have a plan</p>}
      <h1 className="text-5xl text-white my-20">
        Welcome to SwoleAI, {userName + "!" || "User!"}
      </h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <button className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition">
          Go to plan
        </button>
        <Link
          className="flex items-center bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
          to="/plan_info"
        >
          Create a new plan
        </Link>
      </div>
    </>
  );
}

export default Home;
