import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
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
      <nav className="bg-primary flex flex-row justify-end items-center h-16 shadow-lg top-0 left-0 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <Link
          className="text-base sm:text-lg md:text-xl text-white font-light hover:underline underline-offset-4 decoration-1 decoration-accent"
          to="/"
        >
         Home
        </Link>
        <Link
          className="text-base sm:text-lg md:text-xl text-white font-light hover:underline underline-offset-4 decoration-1 decoration-accent"
          to="/profile"
        >
          Profile
        </Link>
        <button
          className="text-base sm:text-lg md:text-xl text-white font-light pr-4 sm:pr-6 md:pr-10 hover:underline underline-offset-4 decoration-1 decoration-accent"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
}

export default App;
