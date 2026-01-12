import { useQuery } from "@tanstack/react-query";
import Button from "./UI/Button";
import { fetchUserDetail } from "../utils/http";

const ContentList = ({ onEdit }) => {
  const userID = 1;

  const { data: userData, isPending, isError, error } = useQuery({
    queryKey: ["users", userID],
    queryFn: fetchUserDetail
  });

  if (isPending) {
    return <p>Loading user data...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }
  let addedList;
  
  return (
    <div className="user-detail p-10 text-start">
      <div className="content-title flex">
        <h4>{userData.full_name}</h4>
        <Button onClick={onEdit}>Edit</Button>
      </div>

      <p>{userData.email}</p>
      <p>{userData.phone}</p>
      <p>{userData.location}</p>
      <p>{userData.pro_title}</p>
    </div>
  );
  {addedList}
};

export default ContentList;
