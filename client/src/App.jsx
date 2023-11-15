import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <nav className="flex flex-row justify-end items-center h-16 shadow-lg top-0 left-0 gap-10">
        <Link className="text-xl text-white font-light hover:underline underline-offset-4 decoration-1 decoration-accent" to="/profile">Profile</Link>
        <button
          className="text-xl text-white font-light pr-10 hover:underline underline-offset-4 decoration-1 decoration-accent"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
