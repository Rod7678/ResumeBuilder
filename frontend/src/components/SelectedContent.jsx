const SELECTED_FORM = [
  {
    id: 1,
    Title: "Professional Experience",
  },
  {
    id: 2,
    Title: "Education",
  },
  {
    id: 3,
    Title: "Languages",
  },
  {
    id: 4,
    Title: "Projects",
  },
  {
    id: 3,
    Title: "Certificates",
  },
];
const SelectedContent = ({ data = [], onEdit }) => {
  const uniqueSections = [...new Set(data)];

  return (
    <ul>
      {uniqueSections.map((section) => {
        const type = SELECTED_FORM.find((t) => t.Title === section);
        if (!type) return null;
        return (
          <li key={type.id} className="py-4">
            <div className="user-detail bg-white p-8 rounded-xl text-start">
              <div className="content-title flex justify-between items-center">
                <h3 className="text-zinc-950 font-bold text-2xl">{type.Title}</h3>
                <button
                  className="bg-gray-950 rounded-full h-10 w-10 m-0"
                  onClick={() => onEdit(type.Title)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedContent;
