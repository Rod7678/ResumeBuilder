import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../../utils/http";

const ResumePreview = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  if (!data) return null;
  if (isLoading) return <p>Loading Resume Preview...</p>;
  if (isError) return <p>{error.message}</p>;

  const { user, professional, education, projects } = data;

  return (
    <div className="resume-preview">
      <div className="user-detail flex flex-col text-center justify-center">
        <h2 className="text-2xl font-bold">{user.full_name}</h2>
        <div className="flex flex-row w-full justify-center max-w-7xl gap-4">
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.location}</p>
        </div>
      </div>

      <div className="professional-experience">
        <h3>Professional Experience</h3>
        {professional &&
          professional.map((p) => (
            <div key={p.id}>
              <p>{p.jobrole}</p>
              <p>{p.joiningDate}</p>
            </div>
          ))}
      </div>

      <div className="education">
        <h3>Education</h3>
        {education &&
          education.map((e) => (
            <p key={e.id}>
              {e.degree} - {e.instituteName}
            </p>
          ))}
      </div>

      <div className="projects">
        <h3>Projects</h3>
        {projects &&
          projects.map((pr) => <p key={pr.id}>{pr.project_title}</p>)}
      </div>
    </div>
  );
};

export default ResumePreview;
