import FormDiv from "../UI/FormDiv"
import Input from "../UI/Input"

const Skills  = () => {
    return (
        <>
        <FormDiv title={"Add Your skills"} onSend={}>
            <Input placeholder="Enter your skill" />
        </FormDiv>
        </>
        )
}