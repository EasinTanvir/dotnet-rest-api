"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Link from "next/link";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

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
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Please login to view your profile
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600 mt-1">Applied Jobs Overview</p>
        </div>
      </div>

      {/* Applications */}
      <h2 className="text-xl font-semibold mb-4">Jobs You Applied To</h2>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-600">
          You haven’t applied to any jobs yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-6 border"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Job ID #{app.jobId}
                </span>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    statusStyles[app.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <Link
                href={`/job/${app.jobId}`}
                className="inline-flex items-center text-blue-600 font-medium hover:underline"
              >
                View Job Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
