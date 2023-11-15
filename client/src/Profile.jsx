import React from "react";

function Profile() {
  return (
    <>
  <div className="flex flex-col justify-center items-center m-20">
    <form action="/" method="POST" className="flex flex-col items-start w-1/2">
      <h2 className="text-4xl font-light text-tertiary">Personal Information</h2>
      <label className="text-2xl text-white font-light pb-1 pt-4" htmlFor="first_name">First Name</label>
      <input className="p-1 rounded-xl bg-primary w-full pl-2" type="text" id="first_name" name="first_name" />

      <label className="text-2xl text-white font-light pb-1 pt-4" htmlFor="last_name">Last Name</label>
      <input className="p-1 rounded-xl bg-primary w-full pl-2" type="text" id="last_name" name="last_name" />

      <label className="text-2xl text-white font-light pb-1 pt-4" htmlFor="email">Email</label>
      <input className="p-1 rounded-xl bg-primary w-full pl-2" type="email" id="email" name="email" />

      <label className="text-2xl text-white font-light pb-1 pt-4" htmlFor="age">Age</label>
      <input className="p-1 rounded-xl bg-primary w-full pl-2" type="number" id="age" name="age" min="13" max="100"/>

      <label className="text-2xl text-white font-light pb-1 pt-4" htmlFor="sex">Sex</label>
      <select className="h-8 rounded-xl bg-primary w-1/2 pl-2" id="sex" name="sex">
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="U">Other/Choose not to say</option>
      </select>

      <h2 className="text-4xl font-light text-tertiary pt-12">Plan Preferences</h2>
      <label className="text-2xl text-white font-light pb-1 pt-4" htmlFor="goals">Goals</label>
      <select className="h-8 rounded-xl bg-primary w-1/2 pl-2" id="goals" name="goals">
        <option value="S">Strength</option>
        <option value="F">Fat Loss</option>
        <option value="M">Muscle Gain</option>
      </select>

      <label className="text-2xl text-white font-light pb-1 pt-4" htmlFor="experience">Experience</label>
      <select className="h-8 rounded-xl bg-primary w-1/2 pl-2" id="experience" name="experience">
        <option value="N">Novice</option>
        <option value="B">Beginner</option>
        <option value="I">Intermediate</option>
        <option value="A">Advanced</option>
      </select>

      <button type="submit" className="my-4 h-12 bg-secondary rounded-xl px-8 mt-8 text-white">Submit</button>
    </form>
  </div>
</>

  );
}

export default Profile;
