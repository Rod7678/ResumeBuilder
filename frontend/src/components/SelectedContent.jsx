const SelectedContent = ({data}) => {
   const selectedType = data; 
  return (
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
    </div>
  );
};

export default SelectedContent;
