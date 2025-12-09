"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_BASE = "http://localhost:5236/api/job/all";

export default function HomeJobList({ initialData }) {
  const [jobs, setJobs] = useState(initialData.jobs || []);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");

  const pageSize = 6;

  const fetchJobs = async () => {
    const url =
      `${API_BASE}?page=${page}&pageSize=${pageSize}` +
      `&search=${search}` +
      `&category=${category}` +
      `&jobType=${jobType}`;

    const res = await axios.get(url);
    const data = res.data;

    setJobs(data.jobs || []);
    setTotalPages(data.totalPages || 1);
  };

  useEffect(() => {
    fetchJobs();
  }, [page, search, category, jobType]);

  return (
    <>
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 flex flex-col md:flex-row gap-4 md:items-center">
        {/* Search */}
        <input
          placeholder="Search jobs..."
          className="px-4 py-2 border rounded-lg flex-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
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

        {/* Job Type Filter */}
        <select
          className="px-4 py-2 border rounded-lg"
          value={jobType}
          onChange={(e) => {
            setJobType(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
        </select>
      </div>

      {/* Job Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 && (
          <p className="text-gray-600 text-center col-span-full">
            No jobs found.
          </p>
        )}

        {jobs.map((job) => (
          <Link
            href={`/job/${job.id}`}
            key={job.id}
            className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition block"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600 mt-1 line-clamp-2">{job.description}</p>

            <div className="mt-2 text-sm text-gray-700">
              <p>
                <strong>Category:</strong> {job.category}
              </p>
              <p>
                <strong>Type:</strong> {job.jobType}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Salary:</strong> ${job.salary}
              </p>
            </div>

            <p className="mt-3 text-xs text-blue-600">
              Skills: {job.requiredSkills}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
