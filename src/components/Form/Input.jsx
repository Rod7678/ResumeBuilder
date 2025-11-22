export default function Input({id, label, ...props}){
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input type={id} name={id} required {...props} />
        </p>
    )
}