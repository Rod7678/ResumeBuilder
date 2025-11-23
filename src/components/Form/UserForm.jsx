import Input from "./Input.jsx";
import "./Form.css"
import Button from "../UI/Button.jsx";

export default function UserForm(){
    return (
    <form action="">
        <h2>Fill the details</h2>
        <div className="control-row">
            <Input id="firstName" label="first name" type={Text} value="john"/>
            <Input id="lastName" label="last name" type={Text} value="cena"/>
        </div>
        <Input id="fatherName" label="father name" type={Text} value="mena"/>
        <Input id="email" label="Enter your email" type="email" value="mena"/>

        <p className="form-actions">
            <Button txtOnly={true}>Reset</Button>
            <Button >submit</Button>
        </p>
    </form>
    )
} 