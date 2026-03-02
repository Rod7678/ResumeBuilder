import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../../utils/http";
import { useUser } from "../../context/UserContext";
import { Mail, MapPin, Phone } from "lucide-react";

const ResumePreview = () => {
  const { data: resumeData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  const { user, loading: isLoading, addedForms } = useUser();
  if (!user) return null;
  if (isLoading) return <p>Loading Resume Preview...</p>;
  const hasSection = (section) => addedForms?.includes(section);
  const professional = hasSection("Professional Experience")
    ? resumeData?.professional
    : null;
  const education = hasSection("Education") ? resumeData?.education : null;
  const projects = hasSection("Projects") ? resumeData?.projects : null;
  return (
    <div className="resume-preview">
      <div className="user-detail flex flex-col text-center justify-center">
        <h2 className="text-3xl font-semibold capitalize pb-2">
          {user.fullName}
        </h2>
        <div className="flex flex-row w-full justify-center max-w-7xl gap-4">
          <p className="flex gap-1 items-center">
            <Mail size={20} />
            {user.email}
          </p>
          <p className="flex gap-1 items-center">
            <Phone size={18} />
            {user.phone}
          </p>
          <p className="flex gap-1 items-center">
            <MapPin size={18} />
            {user.location}
          </p>
        </div>
      </div>
      <hr className="my-4"></hr>

      {professional && (
        <div className="professional-experience">
          <h3 className="text-start font-semibold text-xl underline">
            Professional Experience
          </h3>
          {professional.map((p) => (
            <div key={p.id}>
              <div className="flex flex-row justify-between py-2">
                <div className="text-start flex flex-col">
                  <p className="font-semibold">{p.job_role}</p>
                  <p>{p.company_name}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>{`${p.joining_date} - ${p.currently_working ? "Present" : p.leaving_date}`}</p>
                  <p>{p.job_location}</p>
                </div>
              </div>
              {p.workings && <p>{p.workings}</p>}
            </div>
          ))}
        </div>
      )}

      <hr className="my-4"></hr>

      {education && (
        <div className="education">
          <h3 className="text-start font-semibold text-xl underline">
            Education
          </h3>
          {education.map((e) => (
            <div key={e.id}>
              <div className="flex flex-row justify-between py-2">
                <div className="text-start flex flex-col">
                  <p className="font-semibold">{e.degree}</p>
                  <p>{e.institute_name}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>{`${e.start_date} - ${e.currently_working ? "pursuing" : e.end_date}`}</p>
                  <p>{e.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="my-4"></hr>

      {projects && (
        <div className="projects">
          <h3 className="text-start font-semibold text-xl underline">
            Projects
          </h3>
          {projects.map((pr) => (
            <p key={pr.id}>{pr.project_title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
