import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../../utils/http";

const ResumePreview = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  if (isLoading) return <p>Loading Resume Preview...</p>;
  if (isError) return <p>{error.message}</p>;

  const { user, professional, education, projects } = data;

  return (
    <div className="resume-preview">
      <h2>{user.full_name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.location}</p>

      <h3>Professional Experience</h3>
      {professional.map((p) => (
        <div key={p.id}>
          <p>{p.jobrole}</p>
          <p>{p.joiningDate}</p>
        </div>
      ))}

      <h3>Education</h3>
      {education.map((e) => (
        <p key={e.id}>
          {e.degree} - {e.instituteName}
        </p>
      ))}

      <h3>Projects</h3>
      {projects.map((pr) => (
        <p key={pr.id}>{pr.project_title}</p>
      ))}
    </div>
  );
};

export default ResumePreview;
