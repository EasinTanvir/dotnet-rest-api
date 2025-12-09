"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isLoggedIn } = useGlobalContext();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5236/api/application/my-applications/${user.id}`
        );

        setApplications(res.data);
      } catch (err) {
        console.error("Error loading applications:", err);
      }
    };

    fetchApplications();
  }, [user, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Please login to view your profile.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>

      <h2 className="text-xl font-semibold mb-4">Jobs You Applied To</h2>

      {applications.length === 0 && (
        <p className="text-gray-600">You haven't applied to any jobs yet.</p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="p-5 bg-white rounded-lg shadow border">
            <p className="text-gray-700">
              <strong>Job ID:</strong> {app.jobId}
            </p>

            <p className="text-gray-700">
              <strong>Status:</strong> {app.status}
            </p>

            <Link
              href={`/job/${app.jobId}`}
              className="text-blue-600 font-medium hover:underline mt-2 block"
            >
              View Job →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
