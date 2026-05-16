import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../../utils/http";
import { useUser } from "../../context/UserContext";
import { Mail, MapPin, Phone } from "lucide-react";

const ResumePreview = () => {
  const { data: resumeData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });
  const formatedLines = (description) => {
    const lines = description.split("\n");
    console.log(lines);

    for (let i = 0; i < lines.length; i++) {
      <ul>
        <li className="list-disc">{lines[i]}</li>
      </ul>;
    }
  };
  const { user, loading: isLoading, addedForms } = useUser();
  if (!user) return null;
  if (isLoading) return <p>Loading Resume Preview...</p>;
  const hasSection = (section) => addedForms?.includes(section);
  const professional = hasSection("Professional Experience")
    ? resumeData?.professional
    : null;
  const education = hasSection("Education") ? resumeData?.education : null;
  const projects = hasSection("Projects") ? resumeData?.projects : null;
  const languages = hasSection("languages") ? resumeData?.languages : null;
  
  const formatedDate = (date) => new Date(date).toLocaleDateString("en-IN");

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
      {education && (
        <div className="education">
          <h3 className="text-start font-semibold text-xl underline">
            Education
          </h3>
          {education.map((e) => (
            <div key={e.id}>
              <div className="flex flex-row justify-between py-2">
                <div className="text-start flex flex-col">
                  <p className="font-semibold capitalize">{e.degree}</p>
                  <p className="capitalize">{e.institute_name}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>{`${formatedDate(e.start_date)} - ${e.currently_working ? "pursuing" : formatedDate(e.end_date)}`}</p>
                  <p>{e.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                  <p>{`${formatedDate(p.joining_date)} - ${p.currently_working ? "Present" : formatedDate(p.leaving_date)}`}</p>
                  <p>{p.job_location}</p>
                </div>
              </div>
              {p.workings && <p>{p.workings}</p>}
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
            <div key={pr.id}>
              <div className="flex flex-row justify-between py-2">
                <div className="text-start flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <p className="font-semibold text-2xl text-zinc-900 flex flex-col gap-1">
                      <span>{pr.project_title}</span>
                      {pr.technologies && (
                        <span className="text-zinc-700 text-sm">{`Tech Stack : ${pr.technologies}`}</span>
                      )}
                    </p>
                    <p>
                      {pr.start_date && pr.end_date && (
                        <span className="text-zinc-500">{`${formatedDate(pr.start_date)} - ${formatedDate(pr.end_date)}`}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex">
                    <ul className="pl-5">
                      {pr.description &&
                        pr.description.split("\n").map((line, index) => (
                          <li key={index} className="list-disc">
                            {line}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="my-4"></hr>

      {languages && (
        <div className="languages">
          <h3 className="text-start text-underline font-semibold text-xl">
            Languages
          </h3>
          {languages.map((l) => (
            <p key={l.id} className="text-start">
              {l.name} - {l.proficiency}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
