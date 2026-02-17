import { useQuery } from "@tanstack/react-query";
import { fetchLatestUser, fetchUserDetail } from "../utils/http.js";
import SelectedContent from "./SelectedContent.jsx";
import { useUser } from "../context/UserContext.jsx";

const ContentList = ({ onEdit, data }) => {
  // console.log(data);
  // const userId = 1;
  // const {
  //   data: userData,
  //   isPending,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchLatestUser,
  // });
  const { user: userData, loading: isPending } = useUser();

  if (isPending) {
    return <p>Loading user data...</p>;
  } 

  // if (isError) {
  //   return <p>{error.message}</p>;
  // }
  let addedList = <SelectedContent data={data} onEdit={onEdit} />;

  return (
    <>
      <div className="user-detail bg-white p-8 rounded-xl text-start">
        <div className="content-title flex justify-between">
          <h4 className="text-zinc-950 font-bold text-2xl">
            {userData.full_name}
          </h4>
          <button
            className="bg-gray-950 rounded-full h-10 w-10 m-0"
            onClick={() => onEdit("User")}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>

        <p className="text-gray-700 pb-2">
          <i className="fa-regular fa-envelope pr-8 text-blue-400 text-xl align-middle"></i>
          {userData.email}
        </p>
        <p className="text-gray-700 pb-2">
          <i className="fa-solid fa-phone pr-8 text-blue-400 text-xl align-middle"></i>
          {userData.phone}
        </p>
        <p className="text-gray-700 pb-2">
          <i className="fa-solid fa-location-dot pr-8 text-blue-400 text-xl align-middle"></i>
          {userData.location}
        </p>
        <p className="text-gray-700 pb-2">
          <i className="fa-solid fa-briefcase pr-8 text-blue-400 text-xl align-middle"></i>
          {userData.pro_title}
        </p>
      </div>
      {addedList}
    </>
  );
};

export default ContentList;
