"use client";

import { useState } from "react";

import { useGlobalContext } from "@/hooks/useGlobalContext";
import { useRouter } from "next/navigation";
import api from "@/api";

export default function CreateJob() {
  const { user, isLoggedIn } = useGlobalContext();
  const router = useRouter();

  // redirect if not logged in
  if (!isLoggedIn) {
    if (typeof window !== "undefined") router.push("/login");
  }

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    category: "",
    jobType: "",
    requiredSkills: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        salary: Number(form.salary),
        userId: user.id, // 🔥 logged-in user's ID
      };

      await api.post("/job/create", payload);

      setMessage("Job created successfully!");
      setForm({
        title: "",
        description: "",
        salary: "",
        location: "",
        category: "",
        jobType: "",
        requiredSkills: "",
      });

      router.push("/my-jobs");
    } catch (err) {
      setMessage("Error creating job.");
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Create Job</h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          placeholder="Job Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        {/* CATEGORY */}
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>

        {/* JOB TYPE */}
        <select
          value={form.jobType}
          onChange={(e) => setForm({ ...form, jobType: e.target.value })}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
        </select>

        {/* SKILLS */}
        <input
          type="text"
          placeholder="Required Skills (comma-separated)"
          value={form.requiredSkills}
          onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
