export default function Input({ id, label, type, ...props }) {
  let content;
  switch (type) {
    case "text":
    case "email":
    case "phone":
    case "date":
    case "radio":
      content = (
        <input
          id={id}
          {...props}
          className="p-7 bg-black rounded-md text-gray-200"
        />
      );
      break;
    case "textarea":
      content = (
        <textarea
          id={id}
          {...props}
          className="p-7 bg-black rounded-md text-gray-200"
        />
      );
      break;
    default:
      content = "input";
  }
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      {content}
    </div>
  );
}
