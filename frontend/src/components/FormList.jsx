const FORMS = [
  {
    title: "User",
    description:
      "A place to highlight your professional experience - including internships.",
    icon: "fa-solid fa-user",
  },
  {
    title: "Professional Experience",
    description:
      "A place to highlight your professional experience - including internships.",
    icon: "fa-solid fa-briefcase",
  },
  {
    title: "Education",
    description:
      "Show off your primary education, college degrees & exchange semesters.",
    icon: "fa-solid fa-graduation-cap",
  },
  {
    title: "Languages",
    description:
      "You speak more than one language? Make sure to list them here.",
    icon: "fa-solid fa-earth-americas",
  },
  {
    title: "Projects",
    description:
      "Worked on a particular challenging project in the past? Mention it here.",
    icon: "fa-solid fa-folder-open",
  },
  {
    title: "Certificates",
    description:
      "Drivers licenses and other industry-specific certificates you have belong here.",
    icon: "fa-solid fa-file-certificate",
  },
];

const FormList = ({ onSelect }) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold">
          Add Content
        </h2>
        <button>
          <i className="fa-solid fa-xmark text-black"></i>
        </button>
      </div>
      <ul className="grid-rows-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FORMS.map((form) => (
          <li
            key={form.title}
            className="relative cursor-pointer rounded-lg bg-gray-100 px-4 py-5 transition-all hover:scale-[1.02] hover:opacity-90"
          >
            <button onClick={() => onSelect(form.title)}>
              <div className="grid grid-cols-[min-content_auto] items-center gap-2 text-black">
                <i className={`${form.icon} align-middle`}></i>
                <h4 className="text-lg font-bold leading-none text-start">
                  {form.title}
                </h4>
              </div>
              <p className="mt-1 text-[15px] text-gray-500 text-start">
                {form.description}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FormList;
