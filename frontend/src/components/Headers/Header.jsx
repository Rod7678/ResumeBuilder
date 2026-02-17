import siteLogo from "../../assets/Logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../ResumePdf";
import "./Header.css";
// import { useUser } from "../../context/UserContext";

export default function Header() {
  // const { user } = useUser();
  return (
    <header>
      <img src={siteLogo} alt="" />
      <PDFDownloadLink
        // document={<ResumePDF user={user} />}
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
