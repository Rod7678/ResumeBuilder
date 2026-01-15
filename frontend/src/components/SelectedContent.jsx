const SELECTED_FORM = [
  {
    id: 1,
    Title: "Professional Experience",
    fn: "fetchProfExp",
  },
  {
    id: 2,
    Title: "Education",
    fn: "fetchEdu",
  },
  {
    id: 3,
    Title: "Languages",
    fn: "fetchLang",
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
            <div className="user-detail bg-black p-8 rounded-xl text-start">
              <div className="content-title flex justify-between items-center">
                <h3 className="font-bold text-xl">{type.Title}</h3>
                <button
                  className="p-2 bg-gray-950 rounded-full h-fit w-fit m-0"
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
