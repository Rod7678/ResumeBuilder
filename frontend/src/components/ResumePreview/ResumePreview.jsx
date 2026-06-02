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
  const languages = hasSection("Languages") ? resumeData?.languages : null;
  const skills = hasSection("Skills") ? resumeData?.skills : null;
  const certificate = hasSection("Certificate")
    ? resumeData?.certificate
    : null;

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
      {education && (
        <>
          <hr className="my-4"></hr>
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
        </>
      )}

      {professional && (
        <>
          <hr className="my-4"></hr>
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
        </>
      )}

      {projects && (
        <>
          <hr className="my-4"></hr>
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
        </>
      )}

      {languages && (
        <>
          <hr className="my-4"></hr>
          <div className="languages">
            <h3 className="text-start text-underline font-semibold text-xl">
              Languages
            </h3>
            {languages.map((l) => (
              <div key={l.id}>
                <div className="flex flex-row justify-between py-2">
                  <div className="text-start flex flex-col w-full">
                    <div className="flex justify-between w-full">
                      <p className="font-semibold text-2xl text-zinc-900 flex flex-col gap-1">
                        {l.language_name}
                      </p>
                      <p>{l.proficiency}</p>
                    </div>
                    <div className="flex">
                      <ul className="pl-5">
                        {l.description &&
                          l.description.split("/n").map((line, index) => (
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
        </>
      )}

      {skills && (
        <>
          <hr className="my-4"></hr>
          <div className="skills">
            <h3 className="text-start text-underline font-semibold text-xl">
              Skills
            </h3>
            {skills.map((s) => (
              <div key={s.id}>
                <div className="flex flex-row justify-between py-2">
                  <div className="text-start flex flex-col w-full">
                    <div className="flex justify-between w-full">
                      <p className="font-semibold text-2xl text-zinc-900 flex flex-col gap-1">
                        {s.skill_name}
                      </p>
                      <p>{s.proficiency}</p>
                    </div>
                    <div className="flex">
                      <ul className="pl-5">
                        {s.description &&
                          s.description.split("/n").map((line, index) => (
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
        </>
      )}

      {certificate && (
        <>
          <hr className="my-4"></hr>
          <div className="certificate">
            <h3 className="text-start text-underline font-semibold text-xl">
              Certificate
            </h3>
            {certificate.map((c) => (
              <div key={c.id}>
                <div className="flex flex-row justify-between py-2">
                  <div className="text-start w-full flex flex-col">
                    <div className="flex justify-between w-full">
                      <p className="font-semibold text-2xl text-zinc-900 flex flex-col gap-1">
                        
                        <span>{c.certificate_name}</span>
                        {c.issuing_organization && (
                          <span className="text-zinc-700 text-sm">{`Organization Name : ${c.issuing_organization}`}</span>
                        )}
                      </p>
                      <p>
                        {c.issue_date && c.expiration_date && (
                          <span className="text-zinc-500">{`${formatedDate(c.issue_date)} - ${formatedDate(pr.expiration_date)}`}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResumePreview;
