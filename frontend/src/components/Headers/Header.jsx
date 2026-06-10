import siteLogo from "../../assets/Logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../ResumePdf";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../UI/Button";

// import { useUser } from "../../context/UserContext";

export default function Header() {
  // const { user } = useUser();
  
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('//resumeCreate')
  };

  return (
    <header className="flex justify-between">
      <Link to="/"><img src={siteLogo} alt="Resume Builder" /></Link>
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
      {location.pathname =='/' && <button className="btn-ful flex-end w-fit py-4 px-6 font-semibold rounded-xl" onClick={handleClick}>Get Started</button>}
    </header>
  );
}
