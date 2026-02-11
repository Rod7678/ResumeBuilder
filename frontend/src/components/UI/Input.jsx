export default function Input({ id, label, type, ...props }) {
  let content;
  switch (type) {
    case "text":
    case "email":
    case "phone":
    case "date":
    case "radio":
    case "url":
      content = (
        <input
          id={id}
          {...props}
          type={type}
          className="flex h-9 w-full rounded-md border text-zinc-600 font-semibold placeholder-zinc-400 border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      );
      break;
    case "textarea":
      content = (
        <textarea
          id={id}
          type={type}
          {...props}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      );
      break;
    default:
      content = (
        <input
          id={id}
          {...props}
          type={type}
          className="p-7 bg-black rounded-md text-gray-200"
        />
      );
  }
  return (
    <div className="control">
      <label htmlFor={id} className="text-zinc-700 text-[16px] text-start font-medium py-2">{label}</label>
      {content}
    </div>
  );
}
