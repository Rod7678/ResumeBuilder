const BoxShadow = ({children, className}) => {
    let cssClass = "shadow-md hover:shadow-xl";
    cssClass += ' ' + className;
return (<div className={cssClass}>{children}</div>)
};
export default BoxShadow;