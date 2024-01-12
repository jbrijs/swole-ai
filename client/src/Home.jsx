import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Plan from "./Plan";
import cookie from "cookie";
import NavButtons from "./NavButtons";
import ErrorMessage from "./ErrorMessage";
import PuffLoader from "react-spinners/PuffLoader";


function Home() {
  const [userName, setUserName] = useState("User!");
  const [userPlan, setUserPlan] = useState(null);
  const [editable, setEditable] = useState(false);
  const [numWeeks, setNumWeeks] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    }
    navigate("/plan_info");
  };

  async function generatePlan() {
    setLoading(true);
    const res = await fetch("/api/generate_plan", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
      },
    });
    const body = await res.json();
    setLoading(false);
    console.log(body);
    setUserPlan(body.plan);
    setNumWeeks(body.plan.weeks.length);
  }

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
    if (res.ok) {
      setEditable(false);
    } else {
      const errorMessage = await res.json();
      setErrorMessage(errorMessage.error);
    }
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
      setUserPlan(null);
    }
  };

  useEffect(() => {
    getUserName();
    getPlan();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-5xl text-text font-light my-20">
        Welcome to SwoleAI, {userName + "!"}
      </h1>
      <div className="flex flex-row items-center justify-center gap-3 mb-20"></div>
      <div className="w-3/4">
        {loading ? (
          <div className="flex items-center justify-center">
            <PuffLoader
            color="#F26419"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center">
              <div
                className={`flex gap-6 w-full ${
                  userPlan ? "" : "justify-center"
                }`}
              >
                {userPlan && (
                  <div>
                    {editable ? (
                      <button
                        className="h-12 bg-secondary rounded-xl px-4 text-white hover:bg-tertiary transition ease-in duration-200"
                        onClick={editPlan}
                      >
                        Save Plan
                      </button>
                    ) : (
                      <button
                        className="h-12 bg-secondary rounded-xl px-4 text-white hover:bg-tertiary transition ease-in duration-200"
                        onClick={() => setEditable(true)}
                      >
                        Edit plan
                      </button>
                    )}
                  </div>
                )}

                <button
                  className="h-12 bg-secondary rounded-xl px-4 text-white hover:bg-tertiary transition ease-in duration-200"
                  onClick={handleCreateNewPlan}
                >
                  Manually create a plan
                </button>
                <button
                  className="h-12 bg-secondary rounded-xl px-4 text-white hover:bg-tertiary transition ease-in duration-200"
                  onClick={generatePlan}
                >
                  Generate a plan using AI
                </button>
                {userPlan && (
                  <button
                    className="h-12 bg-secondary rounded-xl px-4 text-white hover:bg-tertiary transition ease-in duration-200"
                    onClick={deletePlan}
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
            <div className="h-4 mt-8">
              {editable && errorMessage && (
                <ErrorMessage message={errorMessage} />
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
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
