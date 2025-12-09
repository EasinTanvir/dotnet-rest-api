import ApplyButton from "@/components/ApplyButton";

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

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-4xl font-bold">{job.title}</h1>

      <p className="text-gray-600 mt-2">{job.description}</p>

      <div className="mt-6 space-y-2 text-gray-800">
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Salary:</strong> ${job.salary}
        </p>
        <p>
          <strong>Category:</strong> {job.category}
        </p>
        <p>
          <strong>Job Type:</strong> {job.jobType}
        </p>
        <p>
          <strong>Required Skills:</strong> {job.requiredSkills}
        </p>
      </div>

      {/* Apply Button Component */}
      <div className="mt-8">
        <ApplyButton jobId={jobId} />
      </div>
    </div>
  );
}
