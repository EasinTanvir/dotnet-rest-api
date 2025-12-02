"use client";

import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5236/api/job/all";

export default function JobList({ initialData }) {
  const [jobs, setJobs] = useState(initialData.jobs || []);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const pageSize = 6;

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const url =
        `${API_BASE}?page=${page}&pageSize=${pageSize}` +
        `&search=${search}&category=${category}`;

      const res = await fetch(url);
      const data = await res.json();

      setJobs(data.jobs || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log("Error fetching jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, search, category]);

  return (
    <>
      {/* Search + Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Bar */}
          <input
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:flex-1 px-4 py-2 border rounded-lg"
          />

          {/* Category Filter */}
          <select
            className="px-4 py-2 border rounded-lg"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            <option value="remote">Remote</option>
            <option value="onsite">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Job List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 && (
          <p className="text-gray-600 text-center col-span-full">
            No jobs found.
          </p>
        )}

        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.description}</p>

            <div className="text-sm text-gray-700 mb-1">
              <strong>Category:</strong> {job.category}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Job Type:</strong> {job.jobType}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Salary:</strong> ${job.salary}
            </div>

            <div className="mt-3">
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs">
                {job.requiredSkills}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-lg font-semibold">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
