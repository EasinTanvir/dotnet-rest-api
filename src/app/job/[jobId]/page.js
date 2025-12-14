import ApplyButton from "@/components/ApplyButton";
import JobCard from "@/components/JobCard";

export default async function JobDetailsPage({ params }) {
  const { jobId } = await params;

  const API = `http://localhost:5236/api/job/${jobId}`;

  const res = await fetch(API, { cache: "no-store" });

  if (!res.ok) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold text-red-500">Job Not Found</h1>
      </div>
    );
  }

  const job = await res.json();
  console.log("job", job);
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <JobCard job={job} />

      {/* Apply Button Component */}
      <div className="mt-8">
        <ApplyButton jobId={jobId} userId={job?.userId} />
      </div>
    </div>
  );
}
