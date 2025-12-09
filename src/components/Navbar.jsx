"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Check if user exists in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Brand Name */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/")}
      >
        JobPortal
      </div>

      {/* Right side menu */}
      <div className="flex items-center gap-6 text-lg">
        <button
          onClick={() => router.push("/")}
          className="hover:text-blue-600 transition"
        >
          Home
        </button>

        {!user && (
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

        {user && (
          <>
            <button
              onClick={() => router.push("/profile")}
              className="hover:text-blue-600 transition"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
