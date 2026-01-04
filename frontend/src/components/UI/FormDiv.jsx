export default function FormDiv({ children, title,onSend}) {
  return (
    <div className="form-body shadow-2xl rounded-2xl bg-white lg:p-7 ">
      <form onSubmit={onSend}>
        <h2>{title}</h2>
        {children}
      </form>
    </div>
  );
}
