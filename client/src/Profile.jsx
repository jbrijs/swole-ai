import React, { useEffect, useState } from "react";
import NumberForm from "./NumberForm";
import { sexOptions, goalOptions, experienceOptions } from "./utils/options";
import SelectionForm from "./SelectionForm";
import cookie from "cookie";
import Infobox from "./Infobox";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [age, setAge] = useState(13);
  const [sex, setSex] = useState("");
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function getProfile() {
    const res = await fetch("/get_profile", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    const profile = body.profile;
    console.log(body.profile.age);
    setAge(profile.age);
    setSex(profile.sex);
    setExperience(profile.experience);
    setGoal(profile.goal);
  }

  async function createProfile(e) {
    e.preventDefault();

    let newErrors = {};

    if (!sex) newErrors.sex = "Please select a sex.";
    if (!goal) newErrors.goal = "Please select a goal.";
    if (!experience)
      newErrors.experience = "Please select your experience level.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await fetch("/profile/", {
      method: "post",
      credentials: "same-origin",
      body: JSON.stringify({
        age,
        sex,
        goal,
        experience,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
      },
    });
    navigate("/");
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center mx-10 sm:mx-0 sm:my-8">
      <h2 className="text-4xl font-light text-text my-10 ">
            Personal Information
          </h2>
        <form
          onSubmit={createProfile}
          className="bg-slate-50 shadow-xl rounded-xl p-4 flex flex-col sm:items-start w-full mx-10 sm:w-1/2"
        >
          
          <NumberForm
            name={"age"}
            value={age}
            label={"Age"}
            onChange={(e) => {
              const newValue = e.target.value;
              setAge(newValue === "" ? "" : Number(newValue));
            }}
            min={13}
            max={100}
          />
          <SelectionForm
            value={sex}
            label={"Sex"}
            name={"sex"}
            onChange={(e) => setSex(e.target.value)}
            options={sexOptions}
          />
          {errors.sex && <p className="text-red-500">{errors.sex}</p>}
          <SelectionForm
            value={goal}
            label={"Goal"}
            name={"goal"}
            onChange={(e) => setGoal(e.target.value)}
            options={goalOptions}
          />
          {errors.goal && <p className="text-red-500">{errors.goal}</p>}
          <SelectionForm
            value={experience}
            label={"Experience"}
            name={"experience"}
            onChange={(e) => setExperience(e.target.value)}
            options={experienceOptions}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience}</p>
          )}

          <button
            type="submit"
            className="my-4 h-12 w-full bg-button rounded-xl px-8 mt-8 text-white hover:bg-button_hover shadow-xl transition ease-in duration-150"
          >
            Save
          </button>
         
        </form>
        <Infobox />
      </div>
    </>
  );
}

export default Profile;
