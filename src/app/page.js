import JobList from "@/components/JobList";

async function fetchJobs() {
  const API = "http://localhost:5236/api/job/all?page=1&pageSize=6";

  try {
    const res = await fetch(API, { cache: "no-store" }); // SSR fetch
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return { jobs: [], totalPages: 1 };
  }
}

export default async function HomePage() {
  const initialData = await fetchJobs();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <JobList initialData={initialData} />
      </div>
    </div>
  );
}
