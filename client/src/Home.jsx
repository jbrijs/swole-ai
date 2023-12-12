import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Plan from "./Plan";

function Home() {
  const [userName, setUserName] = useState("User!");
  const [userPlan, setUserPlan] = useState(null);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();

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

  async function deletePlan() {
    const res = await fetch("/api/delete_plan", {
      credentials: "same-origin",
    });
  }

  const handleCreateNewPlan = () => {
    const confirm = window.confirm("Are you sure? Doing so will delete your current plan.");
    if (confirm) {
      navigate('/plan_info');
    }
  };

  useEffect(() => {
    getUserName();
    getPlan();
  }, []);

  console.log(editable);

  return (
    <>
      <h1 className="text-5xl text-white my-20">
        Welcome to SwoleAI, {userName + "!"}
      </h1>
      <div className="flex flex-row items-center justify-center gap-3 mb-20">
        <button
          className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
          onClick={() => setEditable(true)}
        >
          Edit plan
        </button>
        <button
          className="flex items-center bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
          onClick={handleCreateNewPlan}
        >
          Create a new plan
        </button>
      </div>
      {userPlan && <Plan userPlan={userPlan} editable={editable}></Plan>}
    </>
  );
}

export default Home;
