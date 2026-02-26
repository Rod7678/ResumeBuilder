import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../../utils/http";
import { useUser } from "../../context/UserContext";
import {Mail, MapPin, Phone} from "lucide-react"

const ResumePreview = () => {
  const { data: resumeData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  const { user, loading: isLoading, addedForms } = useUser();
  if (!user) return null;
  if (isLoading) return <p>Loading Resume Preview...</p>;
  console.log("added forms in preview: ", addedForms);
  const hasSection = (section) => addedForms?.includes(section);
  const professional = hasSection("Professional Experience") ? resumeData?.professional : null;
  const education = hasSection("Education") ? resumeData?.education : null;
  const projects = hasSection("Projects") ? resumeData?.projects : null;
  console.log(professional)
  return (
    <div className="resume-preview">
      <div className="user-detail flex flex-col text-center justify-center">
        <h2 className="text-3xl font-semibold capitalize pb-2">{user.fullName}</h2>
        <div className="flex flex-row w-full justify-center max-w-7xl gap-4">
          <p className="flex gap-1 items-center"><Mail size={20}/>{user.email}</p>
          <p className="flex gap-1 items-center"><Phone size={18}/>{user.phone}</p>
          <p className="flex gap-1 items-center"><MapPin size={18}/>{user.location}</p>
        </div>
      </div>
      <hr className="my-4"></hr>
      
      {professional && (
        <div className="professional-experience">
          <h3>Professional Experience</h3>
          {professional.map((p) => (
            <div key={p.id}>
              <p>{p.jobrole}</p>
              <p>{p.joiningDate}</p>
            </div>
          ))}
        </div>
      )}

      {education && (
        <div className="education">
          <h3>Education</h3>
          {education.map((e) => (
            <p key={e.id}>
              {e.degree} - {e.instituteName}
            </p>
          ))}
        </div>
      )}

      {projects && (
        <div className="projects">
          <h3>Projects</h3>
          {projects.map((pr) => (
            <p key={pr.id}>{pr.project_title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
