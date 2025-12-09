"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { useRouter } from "next/navigation";
import api from "@/api";
import Link from "next/link";

export default function MyJobs() {
  const { user, isLoggedIn } = useGlobalContext();
  const router = useRouter();

  if (!isLoggedIn) {
    if (typeof window !== "undefined") router.push("/login");
  }

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchJobs = async () => {
      const res = await api.get(`/job/user/${user.id}`);
      setJobs(res.data);
    };

    fetchJobs();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">My Job Posts</h1>

      {jobs.length === 0 && (
        <p className="text-gray-600">You haven't created any job posts yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="p-5 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600">{job.description}</p>

            <p className="mt-2 text-sm">
              <strong>Salary:</strong> {job.salary}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-sm">
              <strong>Category:</strong> {job.category}
            </p>
            <p className="text-sm">
              <strong>Job Type:</strong> {job.jobType}
            </p>
            <p className="text-sm mt-2">
              <strong>Skills:</strong> {job.requiredSkills}
            </p>

            {/* NEW: View Applicants Link */}
            <Link
              href={`/my-jobs/${job.id}`}
              className="text-blue-600 font-semibold hover:underline mt-3 block"
            >
              View Applicants →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
