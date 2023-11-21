import React, { useState } from "react";
import TextForm from "./TextForm";
import NumberForm from "./NumberForm";
import { sexOptions, goalOptions, experienceOptions } from "./utils/options";
import SelectionForm from "./SelectionForm";

function Profile() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(13)
  const [sex, setSex] = useState("")
  const [goal, setGoal] = useState("")
  const [experience, setExperience] = useState("")


  async function createProfile(e){
    e.preventDefault()
  }
  return (
    <>
  <div className="flex flex-col justify-center items-center m-20">
    <form onSubmit={createProfile} className="flex flex-col items-start w-1/2">
      <h2 className="text-4xl font-light text-tertiary">Personal Information</h2>
      {TextForm(firstName, "First Name", "first_name", e => setFirstName(e.target.value), "text")}
      {TextForm(lastName, "Last Name", "last_name", e => setLastName(e.target.value), "text")}
      {TextForm(email, "Email", "email", e => setEmail(e.target.value), "email")}
      {NumberForm(age, "Age", "age", e => Number(setAge(e.target.value)), 13, 100)}
      {SelectionForm(sex, "Sex", "sex", e => setSex(e.target.value), sexOptions)}
      <h2 className="text-4xl font-light text-tertiary pt-12">Plan Preferences</h2>
      {SelectionForm(goal, "Goals", "goal", e => setGoal(e.target.value), goalOptions)}
      {SelectionForm(experience, "Experience", "experience", e => setExperience(e.target.value), experienceOptions)}
      <button type="submit" className="my-4 h-12 bg-secondary rounded-xl px-8 mt-8 text-white">Submit</button>
    </form>
  </div>
</>

  );
}

export default Profile;
