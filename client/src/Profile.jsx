import React, { useState } from "react";
import TextForm from "./TextForm";
import NumberForm from "./NumberForm";
import { sexOptions, goalOptions, experienceOptions } from "./utils/options";
import SelectionForm from "./SelectionForm";
import cookie from "cookie";

function Profile() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  const [age, setAge] = useState(13);
  const [sex, setSex] = useState("");
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});


  async function createProfile(e) {
  e.preventDefault();

  // Check if any of the selection fields have their default empty string value
  let newErrors = {};

  // Add an error message if a selection field has no value
  if (!sex) newErrors.sex = 'Please select a sex.';
  if (!goal) newErrors.goal = 'Please select a goal.';
  if (!experience) newErrors.experience = 'Please select your experience level.';

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
      experience
    }),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookie.parse(document.cookie).csrftoken
    }
  });

  // Handle the response here...
}

  return (
    <>
      <div className="flex flex-col justify-center items-center m-20">
        <form
          onSubmit={createProfile}
          className="flex flex-col items-start w-1/2"
        >
          <h2 className="text-4xl font-light text-tertiary">
            Personal Information
          </h2>
          {NumberForm(
            age,
            "Age",
            "age",
            (e) => Number(setAge(e.target.value)),
            13,
            100
          )}
          {SelectionForm(
            sex,
            "Sex",
            "sex",
            (e) => setSex(e.target.value),
            sexOptions
          )}
          {errors.sex && <p className="text-red-500">{errors.sex}</p>}
          <h2 className="text-4xl font-light text-tertiary pt-12">
            Plan Preferences
          </h2>
          {SelectionForm(
            goal,
            "Goals",
            "goal",
            (e) => setGoal(e.target.value),
            goalOptions
          )}
          {errors.goal && <p className="text-red-500">{errors.goal}</p>}
          {SelectionForm(
            experience,
            "Experience",
            "experience",
            (e) => setExperience(e.target.value),
            experienceOptions
          )}
          {errors.experience && <p className="text-red-500">{errors.experience}</p>}
          <button
            type="submit"
            className="my-4 h-12 bg-secondary rounded-xl px-8 mt-8 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
