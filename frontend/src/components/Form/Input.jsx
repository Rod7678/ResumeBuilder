export default function Input({ id, label, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} className="p-7 bg-black rounded-md text-gray-200"/>
    </div>
  );
}
