import Link from "next/link";

export default function EmployerJobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          {job.title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>

        {/* Job Meta */}
        <div className="mt-4 space-y-1 text-sm text-gray-700">
          <p>
            <strong>Salary:</strong> ${job.salary}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Category:</strong> {job.category}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p className="mt-2">
            <strong>Skills:</strong>{" "}
            <span className="text-gray-600">{job.requiredSkills}</span>
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6">
        <Link
          href={`/my-jobs/${job.id}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          View Applicants
        </Link>
      </div>
    </div>
  );
}
