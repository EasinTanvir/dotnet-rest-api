import Link from "next/link";
import Image from "next/image";

export default function JobCard({ job }) {
  return (
    <Link
      href={`/job/${job.id}`}
      className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      {/* Placeholder Image */}
      <div className="relative h-40 w-full">
        <Image
          src="/job-placeholder.png"
          alt="Job placeholder"
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
          {job.title}
        </h2>

        <p className="text-gray-600 mt-1 line-clamp-2">{job.description}</p>

        <div className="mt-3 text-sm text-gray-700 space-y-1">
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

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {job.requiredSkills
            ?.split(",")
            .slice(0, 3)
            .map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
              >
                {skill.trim()}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
}
