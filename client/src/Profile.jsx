import React, { useState } from "react";
import NumberForm from "./NumberForm";
import { sexOptions, goalOptions, experienceOptions } from "./utils/options";
import SelectionForm from "./SelectionForm";
import cookie from "cookie";
import Infobox from "./Infobox";
import {useNavigate} from "react-router-dom"

function Profile() {
  const [age, setAge] = useState(13);
  const [sex, setSex] = useState("");
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  

  async function createProfile(e) {
    e.preventDefault();

    // Check if any of the selection fields have their default empty string value
    let newErrors = {};

    // Add an error message if a selection field has no value
    if (!sex) newErrors.sex = "Please select a sex.";
    if (!goal) newErrors.goal = "Please select a goal.";
    if (!experience)
      newErrors.experience = "Please select your experience level.";

    // If there are any errors, set the errors state and stop the function
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, proceed with the fetch request
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
    navigate("/")
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-20">
        <form
          onSubmit={createProfile}
          className="flex flex-col items-start w-1/2"
        >
          <h2 className="text-4xl font-light text-text my-10">
            Personal Information
          </h2>
          <NumberForm
            name={"sex"}
            value={age}
            label={"Age"}
            onChange={(e) => setAge(Number(e.target.value))}
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
            className="my-4 h-12 bg-secondary rounded-xl px-8 mt-8 text-white"
          >
            Save
          </button>
        </form>
        {Infobox()}
      </div>
    </>
  );
}

export default Profile;
