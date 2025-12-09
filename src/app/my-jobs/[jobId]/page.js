import ApplicantsList from "@/components/ApplicantsList";

export default async function ApplicantsPage({ params }) {
  const { jobId } = await params;

  const API = `http://localhost:5236/api/application/applicants/${jobId}`;

  const res = await fetch(API, { cache: "no-store" });
  const applicants = await res.json();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Applicants for Job #{jobId}</h1>

      <ApplicantsList applicants={applicants} jobId={jobId} />
    </div>
  );
}
