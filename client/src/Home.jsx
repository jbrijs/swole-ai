import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Plan from "./Plan";
import cookie from "cookie";
import NavButtons from "./NavButtons";
import ErrorMessage from "./ErrorMessage";
import PuffLoader from "react-spinners/PuffLoader";
import ProceedModal from "./ProceedModal";
import ProfileModal from "./ProfileModal";
import PlanInfoModal from "./PlanInfoModal";

function Home() {
  const [userName, setUserName] = useState("User");
  const [sex, setSex] = useState(null);
  const [age, setAge] = useState(null);
  const [goal, setGoal] = useState(null);
  const [experience, setExperience] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [editable, setEditable] = useState(false);
  const [numWeeks, setNumWeeks] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proceedPopUp, setProceedPopUp] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [planInfoPopUp, setPlanInfoPopUp] = useState(false);
  const navigate = useNavigate();

  async function getUserInfo() {
    const res = await fetch("/api/get_user_info", {
      credentials: "same-origin",
    });
    const body = await res.json();
    console.log(body);
    setUserName(body.name);
    setSex(body.sex);
    setAge(body.age);
    setGoal(body.goal);
    setExperience(body.experience);
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
        navigate("/plan_info");
      }
    } else {
      navigate("/plan_info");
    }
  };

  const handleGeneratePlan = () => {
    if (age === null || sex === null || goal === null || experience === null) {
      setProfilePopUp(true);
    } else {
      setProceedPopUp(true);
    }
  };

  async function generatePlan() {
    let shouldGenerate = true;

    if (userPlan) {
      const confirm = window.confirm(
        "Are you sure? Doing so will delete your current plan."
      );
      shouldGenerate = confirm;
      if (confirm) {
        await deletePlan(); // Await the completion of deletePlan
      }
    }

    if (shouldGenerate) {
      setLoading(true);
      try {
        const res = await fetch("/api/generate_plan", {
          method: "GET",
          credentials: "same-origin",
          headers: {
            "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
          },
        });
        if (res.ok) {
          const body = await res.json();
          setUserPlan(body.plan);
          setNumWeeks(body.plan.weeks.length);
        } else {
          // Handle non-200 responses
          console.error("Failed to generate plan:", res.status);
        }
      } catch (error) {
        console.error("Error generating plan:", error);
        // Handle fetch errors (e.g., network issues)
      } finally {
        setLoading(false);
      }
    }
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
    } else {
      return;
    }
  };

  useEffect(() => {
    getUserInfo();
    getPlan();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-text lg:font-light mt-10 mb-10 sm:mt-20 sm:mb-20 md:mb-30">
        Welcome to SwoleAI, {userName + "!"}
      </h1>
      <div className="w-11/12 md:w-3/4 xl:w-2/3">
        {loading ? (
          <div className="flex items-center justify-center">
            <PuffLoader color="#F26419" />
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center ">
              <div
                className={`flex gap-6 w-full ${
                  userPlan ? "" : "justify-center"
                }`}
              >
                {userPlan && (
                  <div className="flex gap-3 sm:gap-6 w-full items-center">
                    {editable ? (
                      <button
                        className="h-12 sm:h-14 text-xs sm:text-lg xl:text-xl bg-button rounded-xl  px-2 sm:px-4 md:px-6 xl:px-8 text-white shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
                        onClick={editPlan}
                      >
                        Save Plan
                      </button>
                    ) : (
                      <button
                        className="h-12 sm:h-14 text-xs sm:text-lg xl:text-xl bg-button rounded-xl  px-2 sm:px-4 md:px-6 xl:px-8 text-white shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
                        onClick={() => setEditable(true)}
                      >
                        Edit plan
                      </button>
                    )}
                    <button
                      className="h-12 sm:h-14 text-xs sm:text-lg xl:text-xl bg-button rounded-xl  px-2 sm:px-4 md:px-6 xl:px-8 text-white shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
                      onClick={handleDeleteButton}
                    >
                      Delete Plan
                    </button>
                  </div>
                )}

                {!userPlan && (
                  <div className="flex items-center justify-center w-full gap-4">
                    <button
                      className="h-14 text-sm sm:text-lg px-2 sm:px-4 bg-button rounded-xl text-white shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
                      onClick={handleCreateNewPlan}
                    >
                      Manually create plan
                    </button>
                    <button
                      className="h-14 text-sm sm:text-lg px-2 sm:px-4 bg-button rounded-xl text-white shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
                      onClick={handleGeneratePlan}
                    >
                      Generate plan using AI
                    </button>
                  </div>
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
      <div>
        {proceedPopUp && (
          <ProceedModal
            sex={sex}
            age={age}
            goal={goal}
            experience={experience}
            hidden={!proceedPopUp}
            onHide={() => setProceedPopUp(false)}
            onContinue={() => {
              setProceedPopUp(false);
              setPlanInfoPopUp(true);
            }}
          />
        )}
        {profilePopUp && (
          <ProfileModal
            hidden={!profilePopUp}
            onHide={() => setProfilePopUp(false)}
          />
        )}
        {planInfoPopUp && (
          <PlanInfoModal
            hidden={!planInfoPopUp}
            onHide={() => setPlanInfoPopUp(false)}
            onContinue={() => {
              generatePlan();
              console.log("I was called to generate a plan");
              setPlanInfoPopUp(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
