import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../../utils/http";
import { useUser } from "../../context/UserContext";
import {Mail, MapPin, Phone} from "lucide-react"

const ResumePreview = () => {
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["latestResume"],
  //   queryFn: fetchLatestResume,
  // });

  const { user, loading: isLoading } = useUser();
  if (!user) return null;
  if (isLoading) return <p>Loading Resume Preview...</p>;

  return (
    <div className="resume-preview">
      <div className="user-detail flex flex-col text-center justify-center">
        <h2 className="text-3xl font-semibold capitalize pb-2">{user.full_name}</h2>
        <div className="flex flex-row w-full justify-center max-w-7xl gap-4">
          <p className="flex gap-1 items-center"><Mail size={20}/>{user.email}</p>
          <p className="flex gap-1 items-center"><Phone size={18}/>{user.phone}</p>
          <p className="flex gap-1 items-center"><MapPin size={18}/>{user.location}</p>
        </div>
      </div>

      
      {/* {professional && (
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
      )} */}
    </div>
  );
};

export default ResumePreview;
