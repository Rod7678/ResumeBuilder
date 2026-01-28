import siteLogo from "../../assets/Logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import "./Header.css";

// async function fetched() {
//   const response = await fetch("http://localhost:3000");
//   if (!response.ok) {
//     new Response({ message: "error to fetch" }, { status: 400 });
//   }

//   console.log(response.json());
// }
export default function Header({ resume }) {
  // fetched();
  return (
    <header>
      <img src={siteLogo} alt="" />
      <PDFDownloadLink
        document={<ResumePDF resume={resume} />}
        fileName="resume.pdf"
      >
        {({ loading }) => (
          <button className="btn-primary">
            {loading ? "Preparing..." : "Download Resume"}
          </button>
        )}
      </PDFDownloadLink>
    </header>
  );
}
