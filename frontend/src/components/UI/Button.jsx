export default function Button({children, txtOnly, className, ...props}){
    let cssClass = txtOnly ? 'text-button' : 'button';
    cssClass += ' ' + className;
    return (
        <button className={cssClass} {...props}>{children}</button>
    )
}