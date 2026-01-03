export default function ProfessionForm() {
  return (
    <>
      <div className="form-body">
        <form onSubmit={handleSubmit}>
          <h2>Edit personal details</h2>
          <Input id="fullname" label="Full name" type="text" />
          <Input id="proftitle" label="Professional title" type="text" />
          <Input id="email" label="Enter your email" type="email" />
          <Input
            id="phone"
            label="Enter your phone"
            type="phone"
            minLength={10}
            maxLength={10}
          />
          <Input id="location" label="Location" type="text" />

          <p className="form-actions">
            <Button txtOnly={true}>Reset</Button>
            <Button>Next</Button>
          </p>
        </form>
      </div>
    </>
  );
}
