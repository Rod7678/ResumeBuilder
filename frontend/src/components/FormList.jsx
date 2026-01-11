const FORMS = [
  {
    title: "Professional Experience",
    description: "A place to highlight your professional experience - including internships.",
    icon: "fa-solid fa-briefcase",
  },
  {
    title: "Education",
    description: "Show off your primary education, college degrees & exchange semesters.",
    icon: "fa-solid fa-graduation-cap",
  },
  {
    title: "Languages",
    description: "You speak more than one language? Make sure to list them here.",
    icon: "fa-solid fa-earth-americas",
  },
  {
    title: "Projects",
    description: "Worked on a particular challenging project in the past? Mention it here.",
    icon: "fa-solid fa-folder-open",
  },
  {
    title: "Certificates",
    description: "Drivers licenses and other industry-specific certificates you have belong here.",
    icon: "fa-solid fa-file-certificate",
  },
];

const FormList = ({onSelect}) => {
  return (<ul>
    {FORMS.map((form) => <li key={form.title}>
      <button onClick={()=> onSelect(form.title)}>
        <div className="form-title flex">
          <i className={form.icon}></i>
          <h4>{form.title}</h4>
        </div>
        <p>{form.description}</p>
      </button>
    </li>)}
  </ul>)
};

export default FormList;
