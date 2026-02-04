export default function Button({children, txtOnly, className, ...props}){
    let cssClass = txtOnly ? 'text-button' : 'w-full h-11 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-transform active:scale-95 font-medium';
    cssClass += ' ' + className;
    return (
        <button className={cssClass} {...props}>{children}</button>
    )
}