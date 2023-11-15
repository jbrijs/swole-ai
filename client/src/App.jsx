import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
    <nav className="flex flex-row justify-end items-center h-16 shadow-lg top-0 left-0">
      <button className="text-xl text-white font-light pr-10 hover:underline underline-offset-4 decoration-1 decoration-accent" onClick={logout}>Logout</button>
    </nav>
      <h1 className="text-5xl text-white my-20">Welcome to SwoleAI, User!</h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <button className="bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition">
          Go to plan
        </button>
        <button className="bg-primary h-12 px-3 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition">
          Create a new plan
        </button>
      </div>
    </>
  );
}

export default App;
