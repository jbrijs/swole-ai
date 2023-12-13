import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Plan from "./Plan";
import cookie from "cookie";
import NavButtons from "./NavButtons";

function Home() {
  const [userName, setUserName] = useState("User!");
  const [userPlan, setUserPlan] = useState(null);
  const [editable, setEditable] = useState(false);
  const [numWeeks, setNumWeeks] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
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
    setUserPlan(body.plan);
    setNumWeeks(body.plan.weeks.length);
  }

  async function deletePlan() {
    const res = await fetch("/api/delete_plan", {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
      },
    });

  }

  const handleCreateNewPlan = () => {
    if (userPlan) {
      const confirm = window.confirm(
        "Are you sure? Doing so will delete your current plan."
      );
      if (confirm) {
        deletePlan();
      }
    } else navigate("/plan_info");
  };

  async function editPlan() {
    const res = await fetch("/api/edit_plan", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
      },
      body: JSON.stringify(userPlan),
    });
    setEditable(false);
  }

  const handleExerciseChange = (weekIndex, dayIndex, exerciseIndex, event) => {
    const { name, value } = event.target;
    setUserPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan };
      const updatedWeeks = [...updatedPlan.weeks];
      const updatedWeek = { ...updatedWeeks[weekIndex] };
      const updatedDays = [...updatedWeek.days];
      const updatedDay = { ...updatedDays[dayIndex] };
      const updatedExercises = [...updatedDay.exercises];
      const updatedExercise = { ...updatedExercises[exerciseIndex] };

      updatedExercise[name] = value;

      updatedExercises[exerciseIndex] = updatedExercise;
      updatedDay.exercises = updatedExercises;
      updatedDays[dayIndex] = updatedDay;
      updatedWeek.days = updatedDays;
      updatedWeeks[weekIndex] = updatedWeek;
      updatedPlan.weeks = updatedWeeks;

      return updatedPlan;
    });
  };

  const handleDeleteButton = () => {
    const confirm = window.confirm(
      "Are you sure? Doing so will delete your current plan."
    );
    if (confirm) {
      deletePlan();
      setUserPlan(null)
    }
  };

  useEffect(() => {
    getUserName();
    getPlan();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-5xl text-white my-20">
        Welcome to SwoleAI, {userName + "!"}
      </h1>
      <div className="flex flex-row items-center justify-center gap-3 mb-20"></div>
      <div className="w-3/4">
        <div className="flex flex-row items-center">
          <div
            className={`flex gap-6 w-full ${userPlan ? "" : "justify-center"}`}
          >
            {userPlan && <div>
            {editable ? (
              <button
                className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
                onClick={editPlan}
              >
                Save Plan
              </button>
            ) : (
              <button
                className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
                onClick={() => setEditable(true)}
              >
                Edit plan
              </button>
            )}
            </div>}
            
            <button
              className="flex items-center bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
              onClick={handleCreateNewPlan}
            >
              Create a new plan
            </button>
            {userPlan && (
              <button
                className="flex items-center bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
                onClick={handleDeleteButton}
              >
                Delete Plan
              </button>
            )}
          </div>

          {userPlan && (
            <NavButtons
              numWeeks={numWeeks}
              currentWeek={currentWeek}
              setCurrentWeek={setCurrentWeek}
            />
          )}
        </div>

        {userPlan && (
          <Plan
            userPlan={userPlan}
            editable={editable}
            handleExerciseChange={handleExerciseChange}
            currentWeek={currentWeek}
          ></Plan>
        )}
      </div>
    </div>
  );
}

export default Home;
