"use client";

import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "@/hooks/useGlobalContext";

export default function ApplyButton({ jobId }) {
  const { user, isLoggedIn } = useGlobalContext();
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    if (!isLoggedIn) {
      setMessage("You must be logged in to apply.");
      return;
    }

    try {
      const payload = {
        jobId: Number(jobId),
        userId: user.id,
      };

      await axios.post("http://localhost:5236/api/application/apply", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Successfully applied for this job!");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to apply. Maybe already applied?"
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleApply}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
      >
        Apply Now
      </button>

      {message && <p className="mt-3 text-green-600 font-medium">{message}</p>}
    </div>
  );
}
