"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function ApplicantsList({ applicants, jobId }) {
  const router = useRouter();

  const updateStatus = async (applicationId, status) => {
    await axios.put(
      `http://localhost:5236/api/application/update-status/${applicationId}`,
      JSON.stringify(status),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    router.refresh(); // Refresh SSR data
  };

  if (applicants.length === 0) {
    return <p className="text-gray-600">No applicants yet.</p>;
  }

  return (
    <div className="space-y-4">
      {applicants.map((app, index) => (
        <div
          key={app.id}
          className="bg-white p-5 shadow rounded-lg border border-gray-200"
        >
          <h2 className="text-lg font-semibold">Applicant #{index + 1}</h2>

          <p className="text-gray-700">
            <strong>User ID:</strong> {app.userId}
          </p>

          <p className="text-gray-700">
            <strong>Status:</strong> {app.status}
          </p>
          {app.status === "Pending" && (
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => updateStatus(app.id, "Accepted")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(app.id, "Rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
