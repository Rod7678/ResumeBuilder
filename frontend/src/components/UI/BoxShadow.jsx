const BoxShadow = ({children, className}) => {
    let cssClass = "h-35 w-20 p-20 shadow-md hover:shadow-xl";
    cssClass += ' ' + className;
return (<div className={cssClass}>{children}</div>)
};
export default BoxShadow;