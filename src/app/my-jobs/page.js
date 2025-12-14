"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { useRouter } from "next/navigation";
import api from "@/api";
import Link from "next/link";
import EmployerJobCard from "@/components/EmployerJobCard";

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <EmployerJobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
