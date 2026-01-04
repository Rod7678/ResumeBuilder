import siteLogo from "../../assets/Logo.png";
import Button from "../UI/Button";
import "./Header.css";

// async function fetched() {
//   const response = await fetch("http://localhost:3000");
//   if (!response.ok) {
//     new Response({ message: "error to fetch" }, { status: 400 });
//   }

//   console.log(response.json());
// }
export default function Header() {
  // fetched();
  return (
    <header>
      <img src={siteLogo} alt="" />
      <div className="getStarted">
        <Button className="get-started">Get Started</Button>
      </div>
    </header>
  );
}
