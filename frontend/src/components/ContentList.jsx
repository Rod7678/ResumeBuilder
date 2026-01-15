import { useQuery } from "@tanstack/react-query";
import { fetchLatestUser, fetchUserDetail } from "../utils/http.js";
import SelectedContent from "./SelectedContent.jsx";

const ContentList = ({ onEdit, data }) => {
  console.log(data);
  // const userId = 1;
  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchLatestUser,
  });

  if (isPending) {
    return <p>Loading user data...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }
  let addedList = <SelectedContent data={data} onEdit={onEdit}/>;

  return (
    <>
      <div className="user-detail bg-black p-8 rounded-xl text-start">
        <div className="content-title flex justify-between">
          <h4>{userData.full_name}</h4>
          <button
            className="p-2 bg-gray-950 rounded-full h-fit w-fit m-0"
            onClick={() => onEdit("User")}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>

        <p>{userData.email}</p>
        <p>{userData.phone}</p>
        <p>{userData.location}</p>
        <p>{userData.pro_title}</p>
      </div>
      {addedList}
    </>
  );
};

export default ContentList;
