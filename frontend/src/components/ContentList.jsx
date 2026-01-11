import Button from "./UI/Button";

const ContentList = ({data}) =>{
    return (
        <>
        <div className="user-detail p-10 text-start">
            <div className="content-title flex">
                <h4>Rohit Ghadge</h4>
                <Button>Edit</Button>
            </div>
            <p>email</p>
            <p>Phone</p>
            <p>address..</p>
        </div>
        </>
    )
}

export default ContentList;