import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Plan from "./Plan";

function Home() {
  const [userName, setUserName] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [editable, setEditable] = useState(false)

  async function getUserName() {
    const res = await fetch("/api/get_name", {
      credentials: "same-origin",
    });
    const body = await res.json();
    setUserName(body.name);
  }

  async function getPlan() {
    const res = await fetch("/api/get_plan", {
      credentials: "same-origin",
    });
    const body = await res.json();
    setUserPlan(body);
  }

  useEffect(() => {
    getUserName();
    getPlan();
  }, []);

  console.log(editable)

  return (
    <>
        <h1 className="text-5xl text-white my-20">
          Welcome to SwoleAI, {userName + "!" || "User!"}
        </h1>
        <div className="flex flex-row items-center justify-center gap-3 mb-20">
          <button className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
          onClick={()=> setEditable(true)}>
            Edit plan
          </button>
          <Link
            className="flex items-center bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
            to="/plan_info"
          >
            Create a new plan
          </Link>
          
        </div>
        {userPlan && <Plan userPlan={userPlan} editable={editable}></Plan>}

    </>
  );
}

export default Home;
