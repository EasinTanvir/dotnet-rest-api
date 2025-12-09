"use client";

import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/hooks/useGlobalContext";

export default function Navbar() {
  const router = useRouter();
  const { user, isLoggedIn, logoutUser } = useGlobalContext();

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Brand */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/")}
      >
        JobPortal
      </div>

      <div className="flex items-center gap-6 text-lg">
        <button
          onClick={() => router.push("/")}
          className="hover:text-blue-600 transition"
        >
          Home
        </button>

        {!isLoggedIn && (
          <>
            <button
              onClick={() => router.push("/login")}
              className="hover:text-blue-600 transition"
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              className="hover:text-blue-600 transition"
            >
              Register
            </button>
          </>
        )}

        {isLoggedIn && (
          <>
            <button
              onClick={() => router.push("/profile")}
              className="hover:text-blue-600 transition"
            >
              Profile
            </button>{" "}
            <button
              onClick={() => router.push("/my-jobs")}
              className="hover:text-blue-600 transition"
            >
              My Jobs
            </button>{" "}
            <button
              onClick={() => router.push("/create-job")}
              className="hover:text-blue-600 transition"
            >
              Create Job
            </button>
            <button
              onClick={() => logoutUser()}
              className="text-red-600 hover:text-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
