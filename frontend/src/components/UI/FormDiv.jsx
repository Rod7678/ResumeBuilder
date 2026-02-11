export default function FormDiv({ children, title, onSend}) {
  return (
    <div className="relative rounded-2xl p-6 bg-white
            border border-slate-200
            shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
            transition-all duration-500 ease-out

            focus-within:border-blue-400
            focus-within:shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_25px_45px_-15px_rgba(59,130,246,0.4)]
            focus-within:-translate-y-0.5">
      <form onSubmit={onSend}>
        <h2 className="text-xl text-zinc-900 ">{title}</h2>
        {children}
      </form>
    </div>
  );
}
